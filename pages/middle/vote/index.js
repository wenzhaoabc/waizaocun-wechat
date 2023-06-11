// pages/middle/vote/index.js
const api = require('../../../api/sites')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // * 正在进行
    inProcess: {},
    votesOn: [],

    // * 全部
    allVotes: {},
    votesAll: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { data: dataOn } = (await api.getInProcessVote(1)).data;
    const { data: dataAll } = (await api.getAllVotes(1)).data;

    const votesOn = dataOn.sites.map(s => {
      return dataOn.votes.filter(vv => vv.siteId === s.siteId)
    })

    const votesAll = dataAll.sites.map(s => {
      return dataAll.votes.filter(vv => vv.siteId === s.siteId)
    })

    this.setData({
      inProcess: dataOn,
      allVotes: dataAll,
      votesOn, votesAll
    })
  },

  async setVote(event) {
    const { value } = event.detail;
    const { data } = (await api.voteDesign(value)).data
    if (data) {
      wx.showToast({
        icon: 'success',
        title: '已成功投票',
      })
      await this.getPageData()
    }
    console.log(data);
    console.log(value);
  },

  async getPageData() {
    const { data: dataOn } = (await api.getInProcessVote(1)).data;
    const { data: dataAll } = (await api.getAllVotes(1)).data;

    const votesOn = dataOn.sites.map(s => {
      return dataOn.votes.filter(vv => vv.siteId === s.siteId)
    })

    this.setData({
      inProcess: dataOn,
      allVotes: dataAll,
      votesOn
    })
  },

  // * 切换标签页
  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {
    console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },

  onStickyScroll(event) {
    console.log(event.detail);
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