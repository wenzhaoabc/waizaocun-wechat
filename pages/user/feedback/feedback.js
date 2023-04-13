// pages/feedback/feedback.js
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      my_feedback:[
          {
              name:'公共空间治理',
              lookorrun:false,
              feedback:[],
          },
          {
              name:'村委会行政',
              lookorrun:false,
              feedback:[]
          },
          {
              name:'土地权属',
              lookorrun:false,
              feedback:[]
          },
          {
              name:'邻里问题',
              lookorrun:false,
              feedback:[]
          },
          {
              name:'其他',
              lookorrun:false,
              feedback:[]
          }
      ],
     
      lookorun:"查看",
      feedback:"",
      
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
  
    },
    adviseget(e){
      if(this.data.feedback==""){
        wx.showModal({
          content:"反馈内容不能为空",
          showCancel: false,
          confirmText: '确定',
        })
        return;
      }
      wx.request({
        url:'http://localhost:5555/Home/get_feedback', 
        header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data: {
          openid:wx.getStorageSync('openid'),
          content:this.data.feedback
        },
         method: 'GET',
         
         success: function (res) {
              console.log("成功2");
              console.log(res.data.data);                
         }
      })
      wx.showModal({
          content:"提交成功"+this.data.feedback,
          showCancel: false,
          confirmText: '确定',
      })
      this.setData({
        feedback:""
      })
      this.onShow()
    },
    get_feedback(e){
      this.setData({
        feedback:e.detail.value
      })
    },
    close(e){
        var new_feedback=this.data.my_feedback
        new_feedback[e.currentTarget.dataset.index].lookorun=false
        this.setData({
            my_feedback:new_feedback
        })
    },
    open(e){
      var new_feedback=this.data.my_feedback
      console.log(e.currentTarget.dataset.index)
      new_feedback[e.currentTarget.dataset.index].lookorun=true
      console.log(app.globalData.path+'feedback/getInfo'+(e.currentTarget.dataset.index+1))
      wx.request({
        url:app.globalData.path+'feedback/getInfo'+(e.currentTarget.dataset.index+1), 
        header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data: {
            wechatid:wx.getStorageSync('openid')
        },
         method: 'POST',        
         success: function (res) {
              console.log("获得反馈成功");
              console.log(res.data.data); 
              new_feedback[e.currentTarget.dataset.index].feedback=res.data.data                 
         }
      })
      this.setData({
          my_feedback:new_feedback
      })

      //this.onShow()
  },
    showfeedback(){
        if(this.data.my_feed_public==false){
          this.setData({
              my_feed_public:true,
              lookorun:"收起",
          })
          }else{
              this.setData({
                  my_feed_public:false,
                  lookorun:"查看",
              })
          }
    },
    person(e){
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
      // var new_feedback=this.data.my_feedback
      // for(var i=1;i<=5;i++){
      //   wx.request({
      //     url:app.globalData.path+'feedback/getInfo'+i, 
      //     header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      //     data: {
      //         wechatid:wx.getStorageSync('openid')
      //     },
      //      method: 'POST',        
      //      success: function (res) {
      //           console.log("获得反馈成功");
      //           console.log(res.data.data); 
      //           new_feedback[i-1].feedback=res.data.data                 
      //      }
      //   })
      // }
      // this.setData({
      //   my_feedback:new_feedback
      // })
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