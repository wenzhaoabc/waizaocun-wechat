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
      key: 'token',
      success: (res) => {
        this.globalData.token = res.data
      },
      fail: (err) => {
        wx.showToast({
          title: '请重新登录',
        });
        wx.navigateTo({
          url: './pages/login/index',
        })
      }
    })


  },
  globalData: {
    userInfo: null,
    token: null,
    // 以下是使用colorUI自定义导航栏需要的数据
    StatusBar: null,
    Custom: null,
    CustomBar: null
  }
})
