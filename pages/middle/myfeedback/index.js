// pages/middle/myfeedback/index.js
const api = require('../../../api/sitefeedback')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackSite: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { data: sites } = await api.getMyFeedback();
    console.log(sites);
    if (sites.code == 200) {
      this.setData({
        feedbackSite: sites.data
      })
    }
  },

  handleFeedbackDetail(e) {
    console.log(e);
    const { siteindex } = e.target.dataset;
    const feedback = this.data.feedbackSite[siteindex];
    wx.navigateTo({
      url: '../feedbackdetail/index',
      success: (res) => {
        res.eventChannel.emit('sendData', { data: feedback })
      }
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