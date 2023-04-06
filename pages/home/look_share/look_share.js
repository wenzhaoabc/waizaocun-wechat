// pages/look_share/look_share.js
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
    //   img:['https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg',
    // 'https://tse1-mm.cn.bing.net/th/id/R-C.e67a6f92cc770d67bb61b87947f67d5e?rik=7fmOVwkQaNDQbQ&riu=http%3a%2f%2fwww.nianyunzm.com%2fwp-content%2fuploads%2f2021%2f06%2f175.jpg&ehk=4daIM6W8BcABT%2fwnwE%2fVpPcpwlJcPsCoUG0xbYPPvck%3d&risl=&pid=ImgRaw&r=0'],
     share:{},
     img:[],
     content:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // const index=JSON.parse(options.index)
        // console.log(index)
        // this.setData({
        //     share:app.globalData.share[index],
        //     img:app.globalData.share[index].img
        // })
        // console.log(this.data.share)

    },
    //发送
 send: function() {
    const inputValue = this.data.inputVal.trim(); //去掉输入内容的空格
    if (!inputValue) {
      wx.showToast({
        title: '发送内容为空！',
        icon: 'none'
      })
    } else {
      wx.hideToast();
      this.setData({
        content:inputValue
    })
    }
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' ); 
            
            var new_share=this.data.share
            var new_comment={}
            new_comment={
                content:inputValue,
                img:wx.getStorageSync('avatarUrl'),
                is_love:false,
                name:wx.getStorageSync('nickName'),
                place:'上海',
                time:M+'-'+D
            }
            new_share.comment.push(new_comment)
            new_share.comment_amount=new_share.comment_amount+1
            this.setData({
                share:new_share
            })
            this.setData({
                content:''
            })
    
  },

    InputBlur(e){
       
    },
    love(e){
        var share1={}
        share1= this.data.share
        console.log("shareId:"+share1.shareId)
        if(!share1.isLove){
        //   share1[e.currentTarget.dataset.index].isLove=false
        //   share1[e.currentTarget.dataset.index].loveNum=share1[e.currentTarget.dataset.index].loveNum-1
        wx.request({
          url:app.globalData.path+'share/love', 
          header: { 'Content-Type': 'application/json;charset=utf-8' },
          data: {
              wechatid:wx.getStorageSync('openid'),
              shareId:share1.shareId
          },
           method: 'POST',        
           success: function (res) {
                console.log("点赞");
                console.log(res.data);                
           }
        })
        }else{
        //   share1[e.currentTarget.dataset.index].is_love=true
        //   share1[e.currentTarget.dataset.index].love_num=share1[e.currentTarget.dataset.index].love_num+1
        wx.request({
            url:app.globalData.path+'share/dislove', 
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: {
                wechatid:wx.getStorageSync('openid'),
                shareId:share1.shareId
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
     //获取输入内容
  getInputVal: function(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
    comment_love(e){
        var comment=this.data.share.comment
        if(!comment[e.currentTarget.dataset.index].isLove){
            wx.request({
              url:app.globalData.path+'share/love', 
              header: { 'Content-Type': 'application/json;charset=utf-8' },
              data: {
                  wechatid:wx.getStorageSync('openid'),
                  shareId:comment[e.currentTarget.dataset.index].shareId
              },
               method: 'POST',        
               success: function (res) {
                    console.log("点赞");
                    console.log(res.data);                
               }
            })
            }else{
            wx.request({
                url:app.globalData.path+'share/dislove', 
                header: { 'Content-Type': 'application/json;charset=utf-8' },
                data: {
                    wechatid:wx.getStorageSync('openid'),
                    shareId:comment[e.currentTarget.dataset.index].shareId
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
    getcurrent(e){
      this.setData({currentswiper:e.detail.current})
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
        url:app.globalData.path+'share/getShare', 
        header: { 'Content-Type': 'application/json;charset=utf-8' },
        data: {
            wechatid:wx.getStorageSync('openid'),
            shareId:app.globalData.currentShareId
        },
         method: 'POST',        
         success: function (res) {
              console.log("getShareInfo成功");
              console.log(res.data.data); 
              that.setData({
                  share:res.data.data,
                  img:res.data.data.img
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