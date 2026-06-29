import axios from 'axios'

export interface JSONSchema {
  location: Location
  current: Current
  forecast: Forecast
}

export interface Current {
  last_updated_epoch?: number
  last_updated?: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: WindDir
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  time_epoch?: number
  time?: string
  snow_cm?: number
}

export interface Condition {
  text: Text
  icon: Icon
  code: number
}

export enum Icon {
  CDNWeatherapiCOMWeather64X64Day113PNG = '//cdn.weatherapi.com/weather/64x64/day/113.png',
  CDNWeatherapiCOMWeather64X64Day119PNG = '//cdn.weatherapi.com/weather/64x64/day/119.png',
  CDNWeatherapiCOMWeather64X64Night113PNG = '//cdn.weatherapi.com/weather/64x64/night/113.png',
}

export enum Text {
  Clear = 'Clear',
  Cloudy = 'Cloudy',
  Sunny = 'Sunny',
}

export enum WindDir {
  E = 'E',
  Ene = 'ENE',
}

export interface Forecast {
  forecastday: Forecastday[]
}

export interface Forecastday {
  date: Date
  date_epoch: number
  day: Day
  astro: Astro
  hour: Current[]
}

export interface Astro {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: number
  is_moon_up: number
  is_sun_up: number
}

export interface Day {
  maxtemp_c: number
  maxtemp_f: number
  mintemp_c: number
  mintemp_f: number
  avgtemp_c: number
  avgtemp_f: number
  maxwind_mph: number
  maxwind_kph: number
  totalprecip_mm: number
  totalprecip_in: number
  totalsnow_cm: number
  avgvis_km: number
  avgvis_miles: number
  avghumidity: number
  daily_will_it_rain: number
  daily_chance_of_rain: number
  daily_will_it_snow: number
  daily_chance_of_snow: number
  condition: Condition
  uv: number
}

export interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export default async function geocoding(country: string | null, callback: Function) {
  if (!country) return callback(new Error('Please provide the name of the country'), null)

  const API_KEY = process.env.WEATHER_API_KEY
  const api = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(country)}`

  try {
    const { data } = await axios(api)
    const { name, country, lat, lon } = data.location
    const { maxtemp_c: temp_c, maxtemp_f: temp_f } = data.forecast.forecastday[0].day

    if (data.error) return callback(new Error(data.error.message), null)

    return callback(null, { name, country, lat, lon, temp_c, temp_f })
  } catch (error: any) {
    if (error instanceof Error) {
      callback(error, null)
    } else {
      callback(new Error('An unexpected error occurred'), null)
    }
  }
}
