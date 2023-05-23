// pages/arpage/index.js
const app = getApp()
const http = require('../../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 300,
    height: 300,
    renderWidth: 300,
    renderHeight: 300,
    selectedModel: null,

    modelurl: '',
    siteInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const info = wx.getSystemInfoSync();
    const width = info.windowWidth;
    const height = info.windowHeight;
    const dpi = info.pixelRatio;
    const { CustomBar } = app.globalData;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("sendData", (data) => {
      console.log(data);
      this.setData({
        width,
        height: height - CustomBar - 80,
        renderWidth: width * dpi,
        renderHeight: (height - CustomBar - 80) * dpi,
        modelurl: data.model,
        siteInfo: data.siteInfo
      })
    })
  },

  // 创作完成
  handleComplete() {
    const baseURL = http.baseURL;
    const child = this.selectComponent("#main-frame");
    // console.log("子组件this", child);
    child.scene.share.captureToLocalPath(
      { fileType: "jpg", quality: 1 },
      (cacheUrl) => {
        console.log("创作完成，数据 - data", cacheUrl);
        wx.showLoading({
          title: '保存中...',
        });
        wx.uploadFile({
          filePath: cacheUrl,
          name: 'file',
          url: baseURL + '/file/upload-single',
          success: (res) => {
            wx.hideLoading()
            const resData = JSON.parse(res.data);
            const imgUrl = resData.data.fileUrl;

            wx.navigateTo({
              url: '../savedraft/index',
              success: (res) => {
                res.eventChannel.emit("data", {
                  cacheUrl: cacheUrl,
                  siteInfo: this.data.siteInfo,
                  imgUrl: imgUrl
                })
              }
            })
          }
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