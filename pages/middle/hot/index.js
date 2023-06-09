// pages/middle/hot/index.js
const api = require('../../../api/sites')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sites: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { data: siteList } = await api.getSitesByCId(1);
    console.log(siteList);
    this.setData({
      sites:siteList.data
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
    console.log("下拉");
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