const express = require('express')
const { exec } = require('child_process')
const fs = require('fs')
const app = express()
const puppeteer = require('puppeteer')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  return next()
})

async function getScreenShot(url, filename, mode, w, h) {
  const options = { ignoreDefaultArgs: ['--enable-automation'] }
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h })
  await page.goto(url, { waitUntil: 'networkidle2' })

  // if (mode == 'landscape')
  //   await page.evaluate(() => {
  //     document.body.style.transform = 'rotate(-90deg)'
  //   })

  await page.screenshot({ path: `images/${filename}.png` })
  await browser.close()
}

app.get('/api', async (client_req, client_res) => {
  let url = client_req.query.q
  const origin = url.split('/')[2]

  const mode = client_req.query.mode

  let w = parseInt(client_req.query.width)
  let h = parseInt(client_req.query.height)

  w = !w | (w > 5000) ? 1920 : w
  h = !h | (h > 5000) ? 1080 : h

  const filename = `${origin}${w}x${h}`

  if (
    url.match(
      /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/gim
    )
  ) {
    if (!url.match(/^(https?:\/\/)/g)) {
      url = 'https://' + url
    }
  } else {
    url = 'https://example.com'
  }

  getScreenShot(url, filename, mode, w, h)
    .then(() => {
      client_res.writeHead(200, { 'content-type': 'image/png' })

      setTimeout(() => {
        exec(`rm ./images/${filename}.png`)
      }, 1000)

      fs.createReadStream(`images/${filename}.png`).pipe(client_res)
    })
    .catch(e => {
      console.log(e)
      client_res.sendStatus(404)
    })
})

app.listen(5000, () => console.log('listening on port 5000.'))
