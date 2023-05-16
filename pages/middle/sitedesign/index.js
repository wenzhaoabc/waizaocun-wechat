// pages/middle/sitedesign/index.js
const api = require('../../../api/sites')
const app = getApp();
import { _throttle } from '../../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeImgProp: {
      mode: "scaleToFill"
    },
    // 系统常量
    SCREEN_WIDTH: 0,
    IMG_WIDTH: 0,
    IMG_HEIGHE: 0,
    CENTER_X: 0,
    CENTER_Y: 0,

    // 最底部切换按钮
    bIndex: 1,
    // 设计元素与子元素切换
    bshowType: true,


    bgImg: "",
    // 当前所有的设计元素类型
    designType: [],
    // 当前设计类型的子元素
    designItem: [],

    // 添加的图层
    maskList: [],
    // 当前正在编辑的图层
    editMask: {},
    // 当前正在编辑的图层ID
    editingMaskId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      bgImg: "https://s2.loli.net/2023/05/15/dy3BcA8JZpsbavO.png"
    })
    const { CustomBar, ScreenWidth } = app.globalData;
    wx.getImageInfo({
      src: this.data.bgImg,
      success: res => {
        console.log(res.width, res.height);
        const iw = ScreenWidth * 0.95;
        const ih = res.height / res.width * ScreenWidth * 0.95;
        this.setData({
          IMG_WIDTH: iw,
          IMG_HEIGHE: ih,
          CENTER_X: ScreenWidth / 2,
          CENTER_Y: CustomBar + 45 + ih / 2,
          SCREEN_WIDTH: ScreenWidth
        });
        console.log(this.data);
        this.setData({
          editMask: this.getNewMask()
        })
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady() {
    const { data } = await api.getDesignItemApi();
    console.log(data);
    this.setData({
      designType: data.data
    })
    console.log(this.data.designType);
  },

  /**
   * 点击保存按钮
   */
  handleClickSaveBtn() {
    console.log("点击保存按钮");
  },

  /**
   * 切换三个组件选择标签
   */
  handleClickSelction(event) {
    console.log("切换最底部选项", event);
    const { index } = event.target.dataset;
    console.log("index = ", index);
    this.setData({
      bIndex: Number(index)
    })
  },

  /**
   * 点击某设计类型
   */
  handleClickType(event) {
    const { type: typeId } = event.target.dataset;
    const Type = this.data.designType.find(t => t.typeId == typeId)
    console.log(Type);
    this.setData({
      designItem: Type.items,
      bshowType: false
    })
    console.log("点击某设计类型", event);
  },

  /**
   * 返回显示设计元素类型
   */
  handleRollback() {
    this.setData({
      bshowType: true
    })
  },



  /**
   * 正在编辑的图层
   */
  getNewMask() {
    return { // 贴图层
      id: '',
      editing: false,
      url: '',
      scale: {
        width: 1,
        height: 1,
      }, // 缩放比例
      rotate: 0, // 旋转角度
      alpha: 1,
      size: {
        width: 100,
        height: 100,
      },
      center: { // 贴图层中心点坐标
        x: this.data.CENTER_X,
        y: this.data.IMG_HEIGHE / 2
      },
      leftTopPoint: {
        x: this.data.CENTER_X - 100 / 2,
        y: this.data.CENTER_Y - 100 / 2
      },
      start: {
        x: null,
        y: null,
      },
      rotateCenter: {
        x: this.data.CENTER_X + 100 / 2,
        y: this.data.IMG_HEIGHE / 2 - 100 / 2
      },
      shrinkCenter: {
        x: this.data.CENTER_X + 100 / 2,
        y: this.data.IMG_HEIGHE / 2 + 100 / 2
      }
    } // 正在编辑的贴纸
  },

  /**
   * 添加一张新的设计元素 item
   * 点击某一设计元素，添加编辑图层
   */
  handleClickItem(event) {
    const { item: itemId } = event.target.dataset;
    const currentItem = this.data.designItem.find(t => t.itemId == itemId);
    console.log({ currentItem });
    wx.getImageInfo({
      src: currentItem.imgPath,
      success: r => {
        console.log("点击设计元素 - ", r);
        const editMask = this.getNewMask();
        editMask.url = r.path;
        editMask.id = new Date().getTime();
        editMask.editing = true;
        let newMaskList = this.data.maskList;
        newMaskList.map(i => i.editing = false);
        newMaskList.push(editMask)
        this.setData({
          maskList: newMaskList,
          editMask: editMask,
          editingMaskId: editMask.id
        })
      },
      fail: e => {
        wx.showToast({
          title: '添加失败',
          icon: 'error'
        })
      }
    })
  },

  /**
   * 滑块数值改变，用于调节图片透明度
   */
  handleSliderChange(e) {
    const { value } = e.detail;
    const index = this.data.maskList.findIndex(i => i.id === this.data.editingMaskId)
    this.setData({
      "editMask.alpha": value,
      [`maskList[${index}].alpha`]: value
    });
    console.log(this.data);
  },

  /**
   * 触摸底图结束，所有贴图图层置为非编辑状态
   */
  touchEndAll(e) {

  },

  /**
   * 开始触摸底图，所有图层置为非编辑状态
   */
  touchBimgStart() {
    this.setData({
      'editMask.editing': false
    })
    const newMaskList = this.data.maskList.map(m => { m.editing = false; return m })
    this.setData({
      maskList: newMaskList
    })
  },

  /**
   * 触摸并移动
   */
  touchMove(event) {
    console.log("触摸并移动", event);
    if (event.target.id !== "bimg") {
      e.preventDefault();
    }
    _throttle(this.touchMoveAll(event), 500)
  },

  /**
   * 图形变换
   */
  touchMoveAll(event) {

  },

})