// pages/addsite/addsite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      disabled: false,
      modal: false,
      modal2: false,
      imgList: [],
      textareaValue: '',
  },

  textareaInput() {
      this.setData({
          textareaValue: e.detail.value
      })

  },

  ViewImage(e) {
      wx.previewImage({
          urls: this.data.imgList,
          current: e.currentTarget.dataset.url
      });
  },
  ChooseImage() {
      wx.chooseMedia({
          camera: 'back',
          count: 4,
          mediaType: ['image'],
          sizeType: ['original', 'compressed'],
          success: (res) => {
              console.log(res);
              if (res.tempFiles.length + this.data.imgList.length <= 4) {
                  let arr = []
                  res.tempFiles.forEach(e => {
                      arr.push(e.tempFilePath)
                  })
                  this.setData({
                      imgList: this.data.imgList.concat(arr)
                  })
              }
          },
          fail: (error) => {
              this.setData({
                  modal: true
              })
          }
      })
  },

  DelImg(e) {
      wx.showModal({
          title: '提示',
          content: '确定要删除这张图片？',
          cancelText: '取消',
          confirmText: '删除',
          success: res => {
              if (res.confirm) {
                  this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                  this.setData({
                      imgList: this.data.imgList
                  })
              }
          }
      })
  },

  hideModal() {
      this.setData({
          modal: false,
          modal2: false
      })
  },

  onSubmit() {
      this.setData({
          modal2: true
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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