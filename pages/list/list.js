// pages/list/list.js
Page({
  data: {
    daily: '',
  },
  onLoad() {
    this.getNow()
  },
  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNow(callback) {
    wx.request({
      url: 'https://api.seniverse.com/v3/weather/daily.json?key=dkq4nrn0wfjexgjw',
      data: {
        location: 'xuzhou'
      },
      success: res => {
        let Fweather = res.data.results[0].daily
        for (let i = 0; i < 3; i += 1) {
          Fweather[i].pathDay = '/images/' + Fweather[i].code_day + '.png'
          Fweather[i].pathNight = '/images/' + Fweather[i].code_night + '.png'
        }
        this.setData({
          daily: Fweather.slice(1)
        })
        console.log(Fweather)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
})