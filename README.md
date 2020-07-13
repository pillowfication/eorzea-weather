# eorzea-weather

Weather forecast for Eorzea. Forked from https://github.com/flowercartelet/eorzea-weather.

## Usage

```js
import EorzeaWeather from '@pillowfication/eorzea-weather'

const eorzeaWeather = new EorzeaWeather({ locale: 'en' })
eorzeaWeather.getWeather(EorzeaWeather.ZONE_EUREKA_ANEMOS, Date.now()) // false
```

**Differences**

 - Functions take numerical dates (e.g. `Date.now()`) instead of Date objects.
 - Regions have been added.
 - `EorzeaWeather` constructor no longer takes a `zoneId`. The `zoneId` must be provided in `getWeather()` calls.
 - `_getWeather()` added that returns a `weatherId` instead of the translated weather string.
