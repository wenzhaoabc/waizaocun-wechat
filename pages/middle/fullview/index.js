Page({
  data: {
    width: 300,
    height: 300,
    renderWidth: 300,
    renderHeight: 300,
    // url: "https://waizao.oss-cn-shanghai.aliyuncs.com/file/e518241a18fb46dc83ab0849b956befc/golf_course_sunrise_2k.png"
    url: "",
  },
  onLoad(option) {

    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendSiteId', (data) => {
      this.setData({
        url: data.data
      })
      console.log(data);
      console.log("接收上级页面传送数据 ： ", data);
    })

    const info = wx.getSystemInfoSync();
    const width = info.windowWidth;
    const height = info.windowHeight;
    const dpi = info.pixelRatio;
    this.setData({
      width, height,
      renderWidth: width * dpi,
      renderHeight: height * dpi
    });
  },

  handleClick() {
    wx.navigateBack();
  }
})