import express from 'express'
import geoip from 'geoip-lite'
import path from 'path'

import forecast from './forecast'

const app = express()
const port = process.env.PORT || 3000
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

app.set('view engine', 'html')
app.engine('html', require('hbs').__express)

app.get('/', async (req: any, res: any) => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress
  const geo = geoip.lookup(ip || '')
  const countryQuery = req.query.country || geo?.country || 'Egypt'
  await forecast(
    countryQuery,
    (
      error: Error,
      data: {
        name: string
        country: string
        lat: number
        lon: number
        temp_c: number
        temp_f: number
      },
    ) => {
      if (error) {
        return res.render('error', { error: error.message })
      }
      const { name, country, lat, lon, temp_c, temp_f } = data
      res.render('index', { name, country, lat, lon, temp_c, temp_f })
    },
  )
})

app.listen(port, () => {
  console.log('server is running and listening on port: ' + port)
})
