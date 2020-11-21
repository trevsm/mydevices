const express = require('express')
const util = require('util')
const path = require('path')
const exec = util.promisify(require('child_process').exec)
const fetch = require('node-fetch')
const fs = require('fs')
const app = express()
const puppeteer = require('puppeteer')

const port = process.env.PORT || 80;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  return next()
})

async function goodUrl(url) {
  return await fetch(url)
    .then(d => d.status)
    .catch(e => false)
}

async function getScreenShot(url, filename, mode, w, h) {
  const options = { ignoreDefaultArgs: ['--enable-automation'] }
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h })
  await page.goto(url, { waitUntil: 'networkidle2' })
  await page.screenshot({ path: `images/${filename}.png` })

  if (mode == 'landscape') {
    await exec(`mogrify -rotate -90 ./images/${filename}.png`).catch(e =>
      console.log(e)
    )
  }

  await browser.close()
  return mode
}

app.get('/api', async (client_req, client_res) => {
  let url = client_req.query.q
  const origin = url.split('/')[2]

  const mode = client_req.query.mode

  let w = parseInt(client_req.query.width)
  let h = parseInt(client_req.query.height)

  w = !w | (w > 5000) ? 1920 : w
  h = !h | (h > 5000) ? 1080 : h

  const filename = `${origin}${w}x${h}_${mode}`

  if (
    url.match(
      /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/gim
    )
  ) {
    if (!url.match(/^(https?:\/\/)/g)) {
      url = 'http://' + url
    }
  } else {
    url = 'https://example.com'
  }

  if (!(await goodUrl(url)))
    url = `https://via.placeholder.com/${w}x${h}.png?text=Oops,+404`

  getScreenShot(url, filename, mode, w, h)
    .then(mode => {
      console.log(mode)
      client_res.writeHead(200, { 'content-type': 'image/png' })

      setTimeout(() => {
        exec(`rm ./images/${filename}.png`)
      }, 500)

      fs.createReadStream(`images/${filename}.png`).pipe(client_res)
    })
    .catch(e => {
      console.log(e)
      client_res.sendStatus(404)
    })
})

app.use(express.static(path.join(__dirname, '../Client/build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/build', 'index.html'))
})

app.listen(port, () => console.log('listening on port ' + port))
