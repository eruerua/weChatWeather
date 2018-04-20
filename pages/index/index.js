Page({
  data:{
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground:'',
    daily:'',
    todayTemp: "",
    todayDate: ""
  },
  onLoad(){
   this.getNow()
  },
  onPullDownRefresh(){
    this.getNow(()=>{
      wx.stopPullDownRefresh()
    })
  },
  getNow(callback){
    wx.request({
      url: 'https://api.seniverse.com/v3/weather/now.json?key=dkq4nrn0wfjexgjw',
      data: {
        location: 'xuzhou'
      },
      success: res => {
        let weather = res.data.results[0].now
        let text = weather.text
        let temp = weather.temperature
        let code = weather.code
        this.setData({
          nowTemp: temp + '°',
          nowWeather: text,
          nowWeatherBackground: '/images/' + code + '.png'
        })
       
        console.log(weather,text, temp)
      },
      complete:()=>{
        callback && callback()
      }
    })
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
          daily:Fweather
        })
        this.setToday(Fweather[0])
        console.log(Fweather)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setToday(result) {
    let date = new Date()
    this.setData({
      todayTemp: `${result.high}° - ${result.low}°`,
      todayDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 今天`
    })
  },

  onTapDayWeather(){
    wx.showToast({
      title: 'hello',
    })
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }
  
})