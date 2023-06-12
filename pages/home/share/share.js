// pages/share/share.js
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
    //   share:[
    //       {IMG:['https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg'],
    //       CONTENT:'参观外灶村乡村建设成果展示。 美丽乡村建设成果展示。',
    //       userimg:'https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg',
    //       username:'张三',
    //       is_love:false,
    //       love_num:20,
    //       place:'上海',
    //       time:'9-4',
    //       comment_amount:2,
    //       comment:[
    //           {img:'https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg',
    //            name:'李四',
    //            content:'不错',
    //            time:'9-7',
    //            place:'上海',
    //            is_love:true,},
    //           {
    //            img:'https://s2.loli.net/2022/10/01/B94FhqQpkfdoWbi.jpg',
    //            name:'王五',
    //            content:'很好看',
    //            time:'9-8',
    //            place:'上海',
    //            is_love:false,
    //           }]
    //   },
    //   ],
    share:[],
    length:0,
    show:false,
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      const share=JSON.parse(options.share)
      console.log(share)
      var new_share=this.data.share
      new_share.push(share)
      this.setData({
          share:new_share
      })
    },
    tosquare(e){
        wx.switchTab({
            url: '../../home/square/square'
          })
    },
    love(e){
        var share1=[]
        share1= this.data.share
        console.log("index:"+e.currentTarget.dataset.index)
        if(!share1[e.currentTarget.dataset.index].isLove){
          share1[e.currentTarget.dataset.index].isLove=false
          share1[e.currentTarget.dataset.index].loveNum=share1[e.currentTarget.dataset.index].loveNum-1
        wx.request({
          url:app.globalData.path+'share/love', 
          header: { 'Content-Type': 'application/json;charset=utf-8' },
          data: {
              wechatid:wx.getStorageSync('openid'),
              shareId:share1[e.currentTarget.dataset.index].shareId
          },
           method: 'POST',        
           success: function (res) {
                console.log("点赞");
                console.log(res.data);                
           }
        })
        }else{
          share1[e.currentTarget.dataset.index].is_love=true
          share1[e.currentTarget.dataset.index].love_num=share1[e.currentTarget.dataset.index].love_num+1
        wx.request({
            url:app.globalData.path+'share/dislove', 
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: {
                wechatid:wx.getStorageSync('openid'),
                shareId:share1[e.currentTarget.dataset.index].shareId
            },
             method: 'POST',        
             success: function (res) {
                  console.log("取消点赞");
                  console.log(res.data);                
             }
          })
        }
        this.onShow()
    },
    return(e){
      wx.navigateBack({
        delta: 1 //返回上一级页面
      })
    },
    share_time(e){
      wx.navigateTo({
        url: '../add_share/add_share',
      })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
  
    },
    lookMore(e){
      app.globalData.currentShareId=this.data.share[e.currentTarget.dataset.index].shareId
      console.log(app.globalData.currentShareId)
      wx.navigateTo({
        url: '../look_share/look_share'
      })  
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      var that=this
      if(wx.getStorageSync('openid')=='visit'){
        this.setData({
          show:false
        })
      }else{
        this.setData({
          show:true
        })
      }
      wx.request({
        url:app.globalData.path+'share/getShares', 
        header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data: {
            wechatid:wx.getStorageSync('openid')
        },
         method: 'POST',        
         success: function (res) {
              console.log("getShare成功");
              console.log(res.data.data); 
              that.setData({
                share:res.data.data,
                length:res.data.data.length
              })                 
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