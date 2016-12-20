import event from '../../utils/event'

Page({
  data: {
    inputValue: ''
  },
  bindSearchInput:function(e){
     this.setData({
       inputValue:e.detail.value
     })
  },
  save() {
    wx.setStorageSync('domain', this.data.inputValue)
    event.exec('update')
    wx.navigateBack()
  },
  onLoad: function () {
    console.log('onLoad')
    const domain = wx.getStorageSync('domain') || ''
    console.log('d:', domain)
    this.setData({
      inputValue: domain
    })
  }
})
