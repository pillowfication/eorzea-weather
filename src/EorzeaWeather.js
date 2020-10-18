import calculateForecastTarget from './utils/calculate-forecast-target'
import * as REGIONS from './consts/regions'
import * as ZONES from './consts/zones'
import * as chances from './chances'
import * as locales from './locales/index'

const DEFAULT_LOCALE = 'en'

function toUpperSnake (str) {
  return str.replace(/[A-Z]/g, (w) => `_${w}`).toUpperCase()
}

export default class EorzeaWeather {
  constructor ({ locale = DEFAULT_LOCALE } = {}) {
    this.locale = locale
  }

  getWeather (zoneId, date = Date.now()) {
    EorzeaWeather.validateZone(zoneId)
    const weatherId = this._getWeather(zoneId, date)
    return this.translateWeather(weatherId)
  }

  _getWeather (zoneId, date = Date.now()) {
    const weatherChance = calculateForecastTarget(date)
    for (const { c: chance, w: weather } of chances[zoneId]) {
      if (chance > weatherChance) {
        return weather
      }
    }
  }

  getWeatherChance (date = Date.now()) {
    return calculateForecastTarget(date)
  }

  translateWeather (weatherId) {
    return locales[this.locale][`weathers.${weatherId}`]
  }

  translateRegion (regionId) {
    return locales[this.locale][`regions.${regionId}`]
  }

  translateZone (zoneId) {
    return locales[this.locale][`zones.${zoneId}`]
  }

  static validateRegion (regionId) {
    if (!regionId || !REGIONS[`REGION_${toUpperSnake(regionId)}`]) {
      throw new TypeError(`'${regionId}' is undefined region ID.`)
    }
  }

  static validateZone (zoneId) {
    if (!zoneId || !ZONES[`ZONE_${toUpperSnake(zoneId)}`]) {
      throw new TypeError(`'${zoneId}' is undefined zone ID.`)
    }
  }

  static translateWeather (weatherId, locale) {
    return locales[locale][`weathers.${weatherId}`]
  }

  static translateRegion (regionId, locale) {
    return locales[locale][`regions.${regionId}`]
  }

  static translateZone (zoneId, locale) {
    return locales[locale][`zones.${zoneId}`]
  }
}
