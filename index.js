const express = require('express')
const { exec } = require("child_process");
const fs = require('fs')
const path = require('path')
const app = express()
const puppeteer = require('puppeteer')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  return next()
})

const dir = path.join(__dirname, '/public')

app.use(express.static(dir))

app.get('/api', async (client_req, client_res) => {
  try {
    const url = client_req.query.q
    const origin = url.split("/")[2]
    let w = parseInt(client_req.query.width)
    let h = parseInt(client_req.query.height)
    w = !w | (w > 5000) ? 1920 : w
    h = !h | (h > 5000) ? 1080 : h

    const filename = `public/${origin}${w}x${h}.png`

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: w, height: h })
    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.screenshot({ path: filename })
    await browser.close()

    client_res.writeHead(200, { 'content-type': 'image/png' })

    setTimeout(()=>{
        exec("sh delpublic.sh")
    }, 5000)

    fs.createReadStream(filename).pipe(client_res)

  } catch (e) {
    client_res.sendStatus(404)
  }
})

app.get('/image.png', (client_req, client_res) => {
  client_res.sendStatus(403)
})

app.get('/', (client_req, client_res) => {
    client_res.send("images/index.html")
})

app.listen(3000, () => console.log('listening on port 3000.'))
