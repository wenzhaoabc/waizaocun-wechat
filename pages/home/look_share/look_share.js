// pages/look_share/look_share.js
var app=getApp()
var QQMapWX = require('../../../qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

    /**
     * 页面的初始数据
     */
    data: {
     share:{},
     img:[],
     content:'',
     location:'',
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
    // var timestamp = Date.parse(new Date());
    // var date = new Date(timestamp);
    // //获取年份  
    // var Y =date.getFullYear();
    // //获取月份  
    // var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    // //获取当日日期 
    // var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    // console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' ); 
            
    // var new_share=this.data.share
    // var new_comment={}
    // new_comment={
    //     content:inputValue,
    //     img:wx.getStorageSync('avatarUrl'),
    //     is_love:false,
    //     name:wx.getStorageSync('nickName'),
    //     place:'上海',
    //     time:M+'-'+D
    // }
    // new_share.comment.push(new_comment)
    // new_share.comment_amount=new_share.comment_amount+1
    // this.setData({
    //   share:new_share
    // })

    var that=this
    //请求添加评论信息
    wx.request({
      url:app.globalData.path+'share/addComment', 
      header: { 'Content-Type': 'application/json;charset=utf-8' },
      data: {
        shareId:that.data.share.shareId,
        content:that.data.content,
        place:that.data.location,
        publisherId:wx.getStorageSync('openid'),
        publisherType:"村民"//待修改
      },
       method: 'POST',        
       success: function (res) {
          console.log(data); 
          console.log("添加评论");
          console.log(res.data); 
            // wx.showModal({
            //   content:"发布成功",
            //   showCancel: false,
            //   confirmText: '确定',
            // })               
       }
    })

    this.setData({
      content:'',
      inputVal:''
    })

    this.onShow()
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