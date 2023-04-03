// pages/setting/setting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      font_size:["小","中","大"],
      bg_color:["黑","灰","白","蓝"],
      current_font_size:1,
      current_bg_color:2,
      nickName:''
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.setData({
        nickName:wx.getStorageSync('nickName')
      })
    },
    person(e){
      wx.switchTab({
        url: '../../pages/person/person'
      })
    },
    update_fontsize(e){
      this.setData({
        current_font_size: e.detail.value
      })
    },
    update_bgcolor(e){
      this.setData({
        current_bg_color: e.detail.value
      })
  
    },
    log_out(e){
      wx.setStorage({    //数据缓存方法
        key: 'nickName',   //关键字，本地缓存中指定的key
        data: '',    //缓存微信用户公开信息，
      })
      wx.setStorage({    //数据缓存方法
        key: 'avatarUrl',   //关键字，本地缓存中指定的key
        data: '',    //缓存微信用户公开信息，
      })
      this.setData({
        nickName:''
      })
      wx.showModal({
        content:"退出登录成功",
        showCancel: false,
        confirmText: '确定',
      })
      wx.switchTab({
        url: '../../pages/person/person'
      })
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