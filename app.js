// app.js
App({
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
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
        });
        wx.showToast({
          title: '请重新登录',
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
    // 自定义数据
    path:'http://localhost:5000/',
    currentShareId:0
  }
})
