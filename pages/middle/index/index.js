const { getSitesByCId, getCommunityInfo } = require("../../../api/sites")

// pages/choosesite/choosesite.js
const app = getApp()
const CDN_PATH = 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images'
const ALL_SITE_MARK = {
  iconPath: '../../../images/middle/Marker1_Activated@3x.png',
  width: 34,
  height: 34,
  display: 'ALWAYS'
}

const ALL_SITE_CALL = {
  fontSize: 16,
  padding: 5,
  borderRadius: 6,
  display: 'ALWAYS',
  color: "#000",
  bgColor: '#ffffff'
}

const MAP_FORM = {
  rodmap: '../../../images/middle/roadmap.png',
  satellite: '../../../images/middle/satellite.png'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地图属性
    mapSettings: {
      skew: 0,
      rotate: 0,
      scale: 15,
      minScale: 10,
      maxScale: 20,
      showCompass: true,
      showLocation: false,
      showScale: false,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
      subkey: 'GOBBZ-XKZW3-QHK37-RDAMZ-KSNWJ-WDFVF',
      layerStyle: 2
    },
    // 社区地理围栏
    communityPolygon: {},
    // 点位标记
    siteMakers: [],
    // 点位详细信息
    sitesInfo: [],
    // 地图上下文
    mapCtx: null,

    // 社区信息
    communityInfo: {},

    imgs: {
      plus: `${CDN_PATH}/btn_plus@3x.png`,
      minus: `${CDN_PATH}/btn_minus@3x.png`
    },

    location: {
      latitude: 30.950340271946413,
      longitude: 121.86954617500307
    },
    mapFormIcon: MAP_FORM.satellite,
    // 轮播图图片列表
    swiperList: [],
    navigation: { type: '', showControls: true },

    // 搜索结果
    searchResSitesInfo: [],
    // 搜索内容
    searchValue: '',
    // 搜索按钮文字
    actionText: '',
    // 动画效果1上弹
    aniUp: {},
    bottomActionHeight: '30vh',
    // 右移划出动画
    aniRightOut: {},
    // 显示操作按钮
    showActionBtn: true,
    // 
    siteDetailHeight: '0vh',
    aniSiteDetail: {},

    currentSiteInfo: {},
    toSearch: false,
    toDetail: false,
  },

  onChangeMapForm() {
    console.log(1111);
    let tagv2 = this.data.mapSettings.enableSatellite;
    this.setData({
      mapSettings: {
        enableSatellite: !tagv2
      },
      mapFormIcon: tagv2 ? MAP_FORM.satellite : MAP_FORM.rodmap
    })
  },

  onMarkerTaped(e) {

    if (this.data.siteDetailHeight == '0vh') {
      let ani = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in',
      });
      ani.height('30vh').step()
      this.setData({
        aniSiteDetail: ani.export()
      })
      setTimeout(() => {
        this.setData({
          siteDetailHeight: '35vh'
        })
      }, 300)
      this.setData({
        toDetail: true
      })
    }

    let site = this.data.sitesInfo.find(s => s.siteId === e.markerId);
    this.mapCtx.moveToLocation({
      longitude: site.siteLongitude,
      latitude: site.siteLatitude,
      success: () => { console.log('success'); },
      fail: () => { console.log('fail'); },
    })
    this.setData({
      currentSiteInfo: site,
      toDetail: true
    })
    this.generateSwiperList();
  },

  /**
   * 地图回到原位置
   */
  gotoOriginPosition() {
    try {
      this.mapCtx.moveToLocation(this.data.location);
    } catch (error) {
      this.data.mapCtx.moveToLocation(this.data.location);
    }

  },


  /**
   * 点击地图
   * @param {*} e 
   */
  bindTapMap(e) {
    this.setData({
      searchValue: null,
      searchResSitesInfo: []
    })
    if (this.data.bottomActionHeight == '70vh') {
      // 搜索框动画
      let ani = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-in',
      });
      ani.height('30vh').step()
      this.setData({
        aniUp: ani.export()
      })
      setTimeout(() => {
        this.setData({
          bottomActionHeight: '30vh'
        })
      }, 500)
      this.setData({
        toSearch: false,
        showActionBtn: true
      })

      // 图标左移出现
      const rightAni = wx.createAnimation({
        duration: 500,  // 动画持续时间，单位毫秒
        timingFunction: 'ease',  // 动画的缓动函数
      })
      rightAni.opacity(1).step()
      this.setData({
        aniRightOut: rightAni.export()
      })
    }

    if (this.data.siteDetailHeight == '35vh') {
      let ani = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in',
      });
      ani.height('0').step()
      this.setData({
        aniSiteDetail: ani.export()
      })
      setTimeout(() => {
        this.setData({
          siteDetailHeight: '0vh'
        })
      }, 300)
    }

    console.log("tap map : ", e);
    this.setData({
      toDetail: false
    })
  },

  onStartDesign() {
    app.globalData.selectedSite = this.data.currentSiteInfo
    wx.navigateTo({
      url: '../reform/index',
    })
  },

  /**
   * 展示全景图页面
   */
  onShowSiteFullView() {
    const siteId = this.data.currentSiteInfo.siteId;
    const panoramaUrl = this.data.currentSiteInfo.panorama;
    if (panoramaUrl == undefined || panoramaUrl == null || panoramaUrl == "") {
      wx.showToast({
        title: '暂无全景图',
        icon: 'error',
      })
      return;
    }
    wx.navigateTo({
      url: '../fullview/index',
      success: function (res) {
        res.eventChannel.emit('sendSiteId', { data: panoramaUrl });
      }
    })
  },

  onFeedBack() {
    wx.navigateTo({
      url: '../addsite/index',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.setData({
    //   currentSiteInfo: this.data.sitesInfo[0]
    // })

    getSitesByCId(1).then((res) => {
      if (res.data.code != 200) {
        wx.showToast({
          title: res.data.msg,
          icon: 'error'
        })
      } else {
        let marks = this.generateSiteMarks(res.data.data)
        this.setData({
          sitesInfo: res.data.data,
          siteMakers: marks
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '网络错误',
        icon: 'error'
      })
    });


    // wx.getLocation({
    //     type: 'wgs84',
    //     isHighAccuracy: true,
    //     success: (res) => {
    //         this.setData({
    //             'location.latitude': res.latitude,
    //             'location.longitude': res.longitude
    //         })
    //     },
    //     fail: (err) => {
    //         console.log(err);
    //     }
    // })
  },

  /**
   * 页面加载完成
   */
  onReady() {
    this.mapCtx = wx.createMapContext('my-map');

    this.setData({
      mapCtx: this.mapCtx
    })
    getCommunityInfo(1).then(res => {
      if (res.data.code != 200) {
        console.log("网络请求错误");
      } else {
        let info = res.data.data
        let polygons = this.generatePolygons(info.area.coordinates)
        console.log(polygons);
        this.setData({
          communityInfo: res.data.data,
          communityPolygon: polygons
        })
      }
    }).catch(err => {
      console.log('网络错误,' + err);
    })
  },

  /**
   * 生成siteMarks
   * @param {Array} siteList 
   */
  generateSiteMarks(siteList) {
    let sitemarks = siteList.map(s => {
      return {
        id: s.siteId,
        latitude: s.siteLatitude,
        longitude: s.siteLongitude,
        ...ALL_SITE_MARK,
        callout: {
          content: s.title,
          ...ALL_SITE_CALL
        }
      }
    });
    return sitemarks;
  },

  /**
   * 生成地理围栏
   * @param {Array} arr 
   */
  generatePolygons(arr) {
    const polygons = [];
    if (arr == undefined || arr == null) {
      return polygons;
    }
    for (let index = 0; index < arr[0].length; index++) {
      const point = arr[0][index];
      polygons.push({ latitude: point[0], longitude: point[1] })
    }

    return [{
      strokeWidth: 2,
      dashArray: [10, 10],
      fillColor: "#AACCCC22",
      strokeColor: "#FFAACC",
      points: polygons
    }];
  },

  /**
   * 生成轮播图图片列表
   */
  generateSwiperList() {
    let imgs = this.data.currentSiteInfo.images
    if (imgs && imgs.length > 0) {
      let arr = imgs.map(i => {
        // return {
        //   value: encodeURI(i.imgPath),
        //   ariaLabel: i.imgDesc
        // }
        return encodeURI(i.imgPath)
      })
      this.setData({
        swiperList: arr
      })
    }
  },

  /**
   * 搜索
   * @param {*} e 
   */
  changeHandle(e) {
    const { value } = e.detail;
    this.setData({
      searchValue: value,
    });
    let searchRes = []
    if (value != '') {
      searchRes = this.data.sitesInfo.filter(s => s.title.indexOf(value) >= 0)
    }
    console.log({ searchRes });
    this.setData({
      searchResSitesInfo: searchRes
    })
  },

  /**
   * 点击搜索项事件
   */
  handleSearchedItemClick(data) {
    console.log("搜索项点击事件：", data);
    const siteId = (data.target.dataset.siteid);
    const site = this.data.sitesInfo.find(s => s.siteId == siteId);
    // console.log(this.data.sitesInfo);
    // console.log(site);
    // console.log(siteId);
    // TODO
    this.data.mapCtx.moveToLocation({
      latitude: site.siteLatitude,
      longitude: site.siteLongitude
    })
  },

  /**
   * 搜索框聚焦
   */
  focusHandle() {
    let ani = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
    });
    ani.height('70vh').step()
    this.setData({
      aniUp: ani.export()
    })
    setTimeout(() => {
      this.setData({
        bottomActionHeight: '70vh'
      })
    }, 500)

    // 图标右移消失动画
    const rightAni = wx.createAnimation({
      duration: 500,  // 动画持续时间，单位毫秒
      timingFunction: 'ease',  // 动画的缓动函数
    })
    rightAni.translateX('100%').opacity(0).step()
    this.setData({
      aniRightOut: rightAni.export()
    })

    setTimeout(() => {
      this.setData({
        toSearch: true,
        showActionBtn: false
      })
    }, 500)


    this.setData({
      actionText: '取消',
    });
  },

  blurHandle() {
    this.setData({
      actionText: '',
    });
  },

  actionHandle() {
    this.setData({
      searchValue: '',
      actionText: '',
    });
  },

  gotoSiteDetail(e) {
    let site = e.currentTarget.dataset.site
    this.setData({
      currentSiteInfo: site,
      toDetail: true,
      toSearch: false
    })
  },
  getInputVal(e) {
    this.setData({
      inputReviewValue: e.detail.value
    })
  },

  /**
   * 页面跳转，反馈新增页面
   */
  handleAddSite() {
    wx.navigateTo({
      url: '../sitefeedback/index',
    })
  },

  /**
   * 页面跳转，我的历史反馈
   */
  handleMyFeedbackHistory() {
    wx.navigateTo({
      url: '../myfeedback/index',
    })
  },

  // 点击村舍跳转到three.js的测试界面
  onRouteToThree() {
    wx.navigateTo({
      url: '/pages/threeTest/threeTest',
    })
  }
})