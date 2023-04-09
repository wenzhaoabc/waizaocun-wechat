// pages/add_share/add_share.js
var app=getApp()
var QQMapWX = require('../../../qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      imgList:[],
      location:'',
      content:'',
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      var that=this
      qqmapsdk = new QQMapWX({
        key: 'X3BBZ-2DZKH-WFUDR-WEOLF-GOTOZ-O7F3A'
      });
      wx.getLocation({
        type: "wgs84",
        success(res) {
          let {latitude,longitude} = res
          // 调用腾讯地图api获取当前位置
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function (res) {
              console.log("地理位置"+res.result)
              that.setData({
                location:res.result.address
              })
            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
              console.log(res);
            }
          });
        }
      })
    },
    ChooseImage() {
      wx.chooseImage({
        count: 100, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          if (this.data.imgList.length != 0) {
            this.setData({
              imgList: this.data.imgList.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList: res.tempFilePaths
            })
          }
        }
      });
    },
    ViewImage(e) {
      wx.previewImage({
        urls: this.data.imgList,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg(e) {
      wx.showModal({
        title: '是否删除',
        content: '确定要删除这张图片吗',
        cancelText: '取消',
        confirmText: '确定',
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
    submit(e){
      var that=this

      //请求添加分享信息
      wx.request({
        url:app.globalData.path+'share/addShare', 
        header: { 'Content-Type': 'application/json;charset=utf-8' },
        data: {
          img:this.data.imgList,
          content:that.data.content,
          place:that.data.location,
          // publisherId:wx.getStorageSync('openid'),
          // publisherType:"村民"
          userName:wx.getStorageSync('openid'),
          userImg:"村民"
        },
         method: 'POST',        
         success: function (res) {
              console.log("添加分享信息");
              console.log(res.data); 
              wx.showModal({
                content:"发布成功",
                showCancel: false,
                confirmText: '确定',
              })               
         }
      })
      wx.navigateBack({
        delta: 1 //返回上一级页面
      })
    },
    cancel(e){
      wx.navigateBack({
        delta: 1 //返回上一级页面
      })
    },
    textareaAInput(e){
      this.setData({
        content:e.detail.value
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
      wx.getLocation({
          type: 'wgs84',
          success (res) {
            const latitude = res.latitude
            const longitude = res.longitude
            const speed = res.speed
            const accuracy = res.accuracy
          }
         })
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