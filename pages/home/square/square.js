// pages/square/square.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[],
    currentswiper:0,
    currentbgimg:"",
    question:false,
    question_type:["公共空间治理","村委会行政","土地权属","邻里问题","其他问题","XX问题"],
    current_question_type:0,
    question_content:"",
    color:"white"
  },
  notice(e){
    wx.navigateTo({
      url: '../../home/notice/notice'
    })
  },
  q_f(e){
    this.setData({
      question:true
    })
  },
  question_type_change(e){
    this.setData({
      current_question_type: e.detail.value
    })
  },
  yes(e){
    if(this.data.question_content==""||this.data.question_content==null){
        wx.showModal({
            content:"反馈内容不能为空",
            showCancel: false,
            confirmText: '确定',
        })
        return
    }
    var that=this
    console.log("wechatId:"+wx.getStorageSync('openid')+"\ntype:"+that.data.question_type[that.data.current_question_type]+"\ncontent:"+that.data.question_content)
    var userType=''
    if(wx.getStorageSync('openid')=='visit'){
      userType='游客'
    }else{
      userType='村民'
    }
    wx.request({
        url:app.globalData.path+'feedback/addFeedback', 
        header: { 'Content-Type': 'application/json;charset=utf-8' },
        data: {
            wechatId:wx.getStorageSync('openid'),
            type:that.data.question_type[that.data.current_question_type],
            content:that.data.question_content, 
            userType:userType         
        },
         method: 'POST',
         
         success: function (res) {
             if(res.data.code==500){
                wx.showModal({
                    content:"反馈失败，请重新尝试",
                    showCancel: false,
                    confirmText: '确定',
                  })
                 return
             }else{
              that.no();
              console.log("addFeedback成功");
              console.log(res.data); 
              wx.showModal({
                content:"反馈成功",
                showCancel: false,
                confirmText: '确定',
              })
             }               
         }
      })
    
  },
  no(e){
    this.setData({
      question:false,
      question_content:"",
      current_question_type:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('openid')==null||wx.getStorageSync('openid')==''){
      wx.setStorage({
        key: 'openid',
        data: 'visit'
      })
    }
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
    var that=this
    wx.request({
        url:app.globalData.path+'img/getImgs', 
        header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data: {
        },
         method: 'GET',
         
         success: function (res) {
              that.setData({
                  img:res.data.data.result,
                  currentbgimg:res.data.data.result[0]
              })
              console.log("getImgs成功");
              console.log(res.data);                
         }
      })
    this.setData({
      color:app.globalData.backgroundColor
    })
    console.log(this.data.color)
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

  },
  getcurrent(e){
    this.setData({currentswiper:e.detail.current})
  },
  get_name(e){
      this.setData({
          question_content:e.detail.value
      })
  }
})