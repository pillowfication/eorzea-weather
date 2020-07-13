// https://www.reddit.com/r/ffxiv/comments/33tqok/cloudy_with_a_chance_of_garlok_predicting_eorzean/
export default (lDate) => {
  const unixtime = Math.floor(lDate / 1000)
  const bell = unixtime / 175
  const increment = ((bell + 8) - (bell % 8)) % 24
  const totalDays = ((unixtime / 4200) << 32) >>> 0

  const calcBase = (totalDays * 0x64) + increment
  const step1 = ((calcBase << 0xB) ^ calcBase) >>> 0
  const step2 = ((step1 >>> 8) ^ step1) >>> 0

  return step2 % 0x64
}
