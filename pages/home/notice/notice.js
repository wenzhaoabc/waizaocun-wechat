// pages/notice/notice.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info_yes:false,
    notice:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  person(e){
    app.globalData.dot_amount=this.data.dot_amount
    wx.navigateBack({
      delta: 1 //返回上一级页面
    })
    
  },
  confirm_info(e){
    console.log('id:'+e.currentTarget.dataset.index)
    var new_notice=this.data.notice
    new_notice[e.currentTarget.dataset.index].state='1'
    var noticeId=new_notice[e.currentTarget.dataset.index].noticeId
    console.log(noticeId)
    wx.request({
        url:app.globalData.path+'notice/addUserNotice', 
        header: { 'Content-Type': 'application/json;charset=utf-8' },
        data: {
          wechatId:wx.getStorageSync('openid'),
          noticeId:noticeId
        },
         method: 'POST',
         
         success: function (res) {
              console.log(res)              
         }
      })
    this.onShow()

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
      var that=this
      console.log(app.globalData.path+'notice/getUser')
      wx.request({
      url:app.globalData.path+'notice/getUser', 
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: {
        wechatid:wx.getStorageSync('openid'),
        //notice_id:e.currentTarget.dataset.index+1
      },
       method: 'POST',
       
       success: function (res) {
            that.setData({
                notice:res.data.data
            })
            console.log("getAllNotice成功");
            console.log(res.data);                
       }
    })
      
    // var that=this
    // wx.request({
    //   url:'http://localhost:5555/Home/notice', 
    //   header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    //   data: {
    //     openid:wx.getStorageSync('openid'),
    //   },
    //    method: 'GET',
       
    //    success: function (res) {
    //         console.log("成功2");
    //         console.log(res.data.data); 
    //         that.setData({
    //           notice:res.data.data
    //         })                 
    //    }
    // })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})