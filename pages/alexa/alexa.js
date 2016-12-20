import api from '../../utils/api'
import event from '../../utils/event'
import { format } from '../../utils/util'

Page({
  data:{
   alexa: {}
  },
  update() {
    const domain = wx.getStorageSync('domain') || null
    if(!domain){
        wx.showModal({
          title: '提示',
          content: '请设置网站域名先！',
          showCancel: false,
          success: function(res) {
            wx.navigateTo({
              url: '../settings/settings' 
            })
          }
        })
        return
      }
    api.get('91cha/alexa', {
      host: domain
    }, (data) => {
      console.log('data:', data)
      const state = data.state
      if(state != 1){
        wx.showModal({
          title: '提示',
          content: data.msg,
          showCancel: false,
          success: function(res) {
            
          }
        })
      }else{
        data.data.traffic_rank = format(data.data.traffic_rank)
        data.data.pagerank = format(data.data.pagerank)
        data.data.daily_ip = format(data.data.daily_ip)
        data.data.daily_pv = format(data.data.daily_pv)
        data.data.backlinks = format(data.data.backlinks)
        data.data.traffic_data.map((e) => {
           e.traffic_rank = format(e.traffic_rank)
           e.reach_rank = format(e.reach_rank)
           e.pageviews_rank = format(e.pageviews_rank)
        })
        this.setData({
          alexa: data.data
        })
      }
    })
  },
  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.update()
    event.on('update', this.update)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})