// pages/middle/feedbackdetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback: {
      "id": 6,
      "userId": 4,
      "title": "村口大榕树",
      "content": "大榕树年久命到，建议及时救护。",
      "siteLongitude": 121.448010,
      "siteLatitude": 37.463530,
      "createdTime": "2023-05-12 12:25:50",
      "imgList": [
        "https://waizao.oss-cn-shanghai.aliyuncs.com/file/2cee2b60131944678411d9724abb606a/llpPoe8qm3EYc0d0a0e28bf09ea721e36b4de36755ac.jpg",
        "https://waizao.oss-cn-shanghai.aliyuncs.com/file/8c458958261447ae83eeaa3ab4c139cf/KGHa0gOAxNFL9a4b66841f96b5e3e17d550d175f8946.jpg"
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('sendData', (data) => {
      // console.log(data.data);
      this.setData({
        feedback: data.data
      })
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