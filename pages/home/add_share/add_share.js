// pages/add_share/add_share.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      imgList:[],
      location:'上海市 嘉定区',
      content:'',
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
  
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
      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp);
      //获取年份  
      var Y =date.getFullYear();
      //获取月份  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //获取当日日期 
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
      console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' ); 
        var share={
            IMG:this.data.imgList,
            CONTENT:this.data.content,
            userimg:wx.getStorageSync('avatarUrl'),
            username:wx.getStorageSync('nickName'),
            is_love:false,
            love_num:0,
            place:'上海市嘉定区',
            time:M+'-'+D,
            comment_amount:0,
            comment:[]
        }
      // wx.request({
      //   url:'http://localhost:5555/Home/add_share', 
      //   header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      //   data: {
      //     openid:wx.getStorageSync('openid'),
      //     content:this.data.content,
      //     place:this.data.location,
      //     img:this.data.imgList[0],
      //   },
      //    method: 'GET',
         
      //    success: function (res) {
      //         console.log("成功2");
      //         console.log(res.data.data);                
      //    }
      // })
      wx.navigateTo({
          url: '../../home/share/share?share='+JSON.stringify(share)
        })
      wx.showModal({
        content:"发布成功",
        showCancel: false,
        confirmText: '确定',
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