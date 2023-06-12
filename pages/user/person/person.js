// pages/person/person.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl:'',
    dot_amount:0,
  },
  feedback(e){
    wx.navigateTo({
      url: '../../user/feedback/feedback'
    })
  },
  notice(e){
    wx.navigateTo({
      url: '../../home/notice/notice'
    })
  },
  setting(e){
    wx.navigateTo({
      url: '../../user/setting/setting'
    })
  },
  about(e){
    wx.navigateTo({
      url: '../../user/about/about'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('openid')==null||wx.getStorageSync('openid')==''){
      wx.setStorage({
        key: 'openid',
        data: 'visit'
      })
    }
    
    this.setData({
      nickName:wx.getStorageSync('nickName'),
      avatarUrl:wx.getStorageSync('avatarUrl')
    })
    var that=this
    // wx.request({
    //   url:'http://sqgwlszjdlytsl.com/task_bg_longgoalget.php', 
    //   header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    //   data: {
    //     openid:wx.getStorageSync('openid')
    //   },
    //    method: 'GET',
    //    success: function (res) {
    //         console.log("成功1");
    //         console.log(res.data);
    //         if(res.data!=null){
    //           that.setData({
    //             task_amount:parseInt(res.data[0].task_amount),
    //             task_total:parseInt(res.data[0].task_total),
    //             //task:task_sjk
    //         })
    //       }
    //     }
    // })
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
    this.setData({
      nickName:wx.getStorageSync('nickName'),
      avatarUrl:wx.getStorageSync('avatarUrl')
    })
    // var that=this
    // wx.request({
    //   url:'http://localhost:5555/Home/person', 
    //   header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    //   data: {
    //     openid:wx.getStorageSync('openid'),
    //   },
    //    method: 'GET',
       
    //    success: function (res) {
    //         console.log("成功2");
    //         console.log(res.data.data); 
    //         that.setData({
    //           dot_amount:res.data.data
    //         })                 
    //    }
    // })
    var amount=0
    // for(var i=0;i<app.globalData.notice.length;i++){
    //     if(app.globalData.notice[i].State=='0'){
    //         amount=amount+1
    //     }
    // }
    this.setData({
        dot_amount:amount
    })
    console.log(this.data.dot_amount)
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

  },
  login(){
    wx.navigateTo({
      url: '../../login/index'
    })
  }
})