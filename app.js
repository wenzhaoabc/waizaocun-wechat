// app.js
App({
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        this.globalData.ScreenWidth = e.windowWidth;
      }
    })

    wx.getStorage({
      key: 'daoxiangli-token',
      success: (res) => {
        this.globalData.token = res.data
      },
      fail: (err) => {
        // wx.navigateToMiniProgram();
        wx.navigateTo({
          url: 'pages/login/index',
          // url: 'pages/middle/sitedesign/index'
          // url: 'pages/middle/savedraft/index'
          // url: 'pages/middle/sitefeedback/index'
          // url: 'pages/middle/myfeedback/index'
          // url:'pages/middle/feedbackdetail/index'
          // url: 'pages/middle/hot/index',
          success: (res) => {
            res.eventChannel.emit("data", {})
          }
        });
        wx.showToast({
          title: '请重新登录',
          icon: 'error'
        });
      }
    })
  },
  globalData: {
    userInfo: null,
    token: null,
    // 以下是使用colorUI自定义导航栏需要的数据
    StatusBar: null,
    Custom: null,
    CustomBar: null,
    backgroundColor: 'black',
    // 系统信息
    ScreenWidth: null,
    // 自定义数据
    path: 'http://daoxiangli.com:5000',
    currentShareId: 0
  }
})
