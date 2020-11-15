const express = require('express')
const { exec } = require('child_process')
const fs = require('fs')
const app = express()
const puppeteer = require('puppeteer')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  return next()
})

async function getScreenShot(url, filename, w, h) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h})
  await page.goto(url, { waitUntil: 'networkidle2' })
  await page.screenshot({ path: `images/${filename}.png` })
  await browser.close()
}

app.get('/api', async (client_req, client_res) => {
  const url = client_req.query.q
  const origin = url.split('/')[2]

  let w = parseInt(client_req.query.width)
  let h = parseInt(client_req.query.height)

  w = !w | (w > 5000) ? 1920 : w
  h = !h | (h > 5000) ? 1080 : h

  const filename = `${origin}${w}x${h}`

  getScreenShot(url, filename, w, h)
    .then(() => {
      client_res.writeHead(200, { 'content-type': 'image/png' })

      setTimeout(() => {
        exec(`rm ./images/${filename}.png`)
      }, 1000)

      fs.createReadStream(`images/${filename}.png`).pipe(client_res)
    })
    .catch((e) => {
      console.log(e)
      client_res.sendStatus(404)
    })
})

app.listen(5000, () => console.log('listening on port 5000.'))
