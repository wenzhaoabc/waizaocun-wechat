// pages/middle/sitedesign/index.js
const api = require('../../../api/sites')
const app = getApp();
import http from '../../../utils/http';
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
    // 底图距屏幕上边的距离
    IMG_TOP: 0,
    // 底图的宽高
    IMG_WIDTH: 0,
    IMG_HEIGHE: 0,
    // 底图正中
    CENTER_X: 0,
    CENTER_Y: 0,

    // 最底部切换按钮
    bIndex: 1,
    // 设计元素与子元素切换
    bshowType: true,

    //底图
    bgImg: "",
    // 点位信息
    siteInfo: {},
    // 当前所有的设计元素类型
    designType: [],
    // 当前设计类型的子元素
    designItem: [],

    // 添加的图层
    maskList: [],
    // 当前正在编辑的图层
    editMask: {},
    // 当前正在编辑的图层ID
    editingMaskId: null,

    // AR模型
    arModelList: [],

    // 自定义图片
    fileList: [],
    imageProps: {
      // shape: 'circle',
      style: "padding:10rpx;",
      height: 20,
      width: 20
    },
    uploadImgConfig: {
      sizeType: ['compressed']
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // TODO
    // const eventChannel = this.getOpenerEventChannel();
    // eventChannel.on("data", (data) => {
    //   console.log("首页传送数据 - 点位信息", data);
    //   this.setData({
    //     bgImg: data.images[0].imgPath
    //   })
    // });

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
          IMG_TOP: CustomBar + 45,
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
    const { data: arList } = await api.getArModelApi();
    console.log(data);
    this.setData({
      designType: data.data,
      arModelList: arList.data
    })
    console.log(this.data.designType);
  },

  /**
   * 点击保存按钮
   */
  handleClickSaveBtn() {
    console.log("点击保存按钮");
    // this.saveToFile();
    this.saveReformImg();
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
      rotate: 0, // 旋转角度,单位角度
      alpha: 1,
      size: {
        width: 100,
        height: 100,
      },
      center: { // 贴图层中心点坐标
        x: this.data.CENTER_X,
        y: this.data.CENTER_Y
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
        y: this.data.CENTER_Y - 100 / 2
      },
      shrinkCenter: {
        x: this.data.CENTER_X + 100 / 2,
        y: this.data.CENTER_Y + 100 / 2
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
        editMask.id = String(new Date().getTime());
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
      "editMask.alpha": value / 100,
      [`maskList[${index}].alpha`]: value / 100
    });
    // const maskList = this.data.maskList.map(m => { if (m.id !== this.data.editMask.id) return m; })
    if (value == 0) {
      const newMaskList = this.data.maskList.filter(m => m.id !== this.data.editMask.id)   // if (maskList.length == 0)
      this.setData({
        editMask: this.getNewMask(),
        maskList: newMaskList ?? []
      })
      wx.showToast({
        title: '已清除',
        icon: 'success'
      })
    }
    console.log(this.data);
  },

  /**
   * 触摸底图结束，所有贴图图层置为非编辑状态
   */
  touchEndAll(e) {

  },

  /**
   * 开始触摸底图，所有图层置为非编辑状态
   * @param {TouchEvent} event 事件
   */
  touchBimgStart(event) {
    console.log(event.target.id);
    if (event.target.id === "bimg") {
      this.setData({
        'editMask.editing': false
      })
      const newMaskList = this.data.maskList.map(m => { m.editing = false; return m })
      this.setData({
        maskList: newMaskList
      })
    }
  },

  /**
   * 开始触摸可编辑图层
   * @param {TouchEvent} event 
   */
  touchStartAll(event) {
    console.log(typeof (event));
    if (event.target.id !== "bimg") {
      // event.preventDefault();
    }
    console.log(event.target);
    console.log(event);
    if (event.target.id.includes("mask")) {
      const id = event.target.id.substring(4)
      const index = this.data.maskList.findIndex(item => item.id === id)
      console.log(`id = ${id}, index = ${index}`);

      // this.editMask.editing = true;
      const { clientX, clientY } = event.touches[0];
      const newMaskList = this.data.maskList.map((m, i) => {
        if (i === index) {
          m.editing = true;
          m.start.x = clientX;
          m.start.y = clientY;
          this.setData({ editMask: m });
          console.log("m = ", m);
        }
        else { m.editing = false; }
        return m;
      })
      console.log("newMaskList = ", { newMaskList });
      this.setData({ maskList: newMaskList });
    }
  },

  /**
   * 触摸并移动
   */
  touchMove(event) {
    // console.log("触摸并移动", event);
    // console.log(event.touches);
    if (event.target.id === "bimg") {
      // event.preventDefault();
      return;
    }
    _throttle(this.touchMoveAll(event), 500)
  },

  /**
   * 图形变换
   * @param {TouchEvent} e
   */
  touchMoveAll: function (e) {
    // console.log("self - ", e);
    const { id: tId } = e.target;
    const { maskList } = this.data;
    let editMask = this.data.editMask;
    if (tId.includes("mask")) {
      // 触摸贴图图片
      const id = tId.substring(4);
      const index = maskList.findIndex(m => m.id == id);
      editMask = maskList[index];
      editMask.editing = true;
    }
    // 触摸点
    const { x: old_x, y: old_y } = editMask.start;
    const { clientX: current_x, clientY: current_y } = e.touches[0]

    // 移动距离
    const move_x = current_x - old_x;
    const move_y = current_y - old_y;

    // 原中心点
    const { x: old_center_x, y: old_center_y } = editMask.center;

    // 原伸缩点
    const { x: old_shrink_x, y: old_shrink_y } = editMask.shrinkCenter;
    // 新伸缩点
    const [new_shrink_x, new_shrink_y] = [old_shrink_x + move_x, old_shrink_y + move_y];

    // 原旋转点
    const { x: old_rotate_x, y: old_rotate_y } = editMask.rotateCenter;
    // 新旋转点
    const [new_rotate_x, new_rotate_y] = [old_rotate_x + move_x, old_rotate_y + move_y];

    // 原伸缩比例
    const { width: old_scale_width, height: old_scale_height } = editMask.scale;
    // 原旋转角度
    const old_rotate_deg = editMask.rotate;

    // console.log({ old_x, old_y, current_x, current_y, move_x, move_y });

    // 触摸贴图,整体移动
    if (tId.includes("mask")) {
      editMask.center.x = old_center_x + move_x;
      editMask.center.y = old_center_y + move_y;
      editMask.shrinkCenter.x = old_shrink_x + move_x;
      editMask.shrinkCenter.y = old_shrink_y + move_y;
      editMask.rotateCenter.x = old_rotate_x + move_x;
      editMask.rotateCenter.y = old_rotate_y + move_y;
      editMask.start.x = current_x;
      editMask.start.y = current_y;
      const id = tId.substring(4);
      const index = maskList.findIndex(m => m.id == id);
      this.setData({
        editMask: editMask,
        [`maskList[${index}]`]: editMask
      })
      return
    }
    // 触摸缩放点，实现缩放
    else if (tId.includes("shrink")) {

      // 原始宽高
      const old_width = editMask.size.width * 1.0;
      const old_height = editMask.size.height * 1.0;

      // 触摸点相对于中心点的角度,以贴图为坐标系，非世界坐标
      const current_shrink_center_deg = Math.atan2(current_y - old_center_y, current_x - old_center_x) / Math.PI * 180 - old_rotate_deg;
      // 斜边对角线长度的一半
      const xiebian = Math.sqrt(Math.pow(current_y - old_center_y, 2) + Math.pow(current_x - old_center_x, 2));
      // 新宽高的一半
      // console.log("弧度角度判断,sin(.5pi) = ", Math.sin(0.5 * Math.PI));
      const new_width_2 = xiebian * Math.cos(current_shrink_center_deg * (Math.PI / 180));
      const new_height_2 = xiebian * Math.sin(current_shrink_center_deg * (Math.PI / 180));

      editMask.scale.width = new_width_2 * 2.0 / old_width;
      editMask.scale.height = new_height_2 * 2.0 / old_height;
      // 变幻伸缩点
      editMask.shrinkCenter.x = current_x;
      editMask.shrinkCenter.y = current_y;
      // 变换旋转点
      editMask.rotateCenter.x = old_center_x + 50 * editMask.scale.width;
      editMask.rotateCenter.y = old_center_y + (-50) * editMask.scale.height;
      editMask.start.x = current_x
      editMask.start.y = current_y
      const id = editMask.id;
      const index = maskList.findIndex(m => m.id == id);
      this.setData({
        editMask: editMask,
        [`maskList[${index}]`]: editMask
      })
    }
    // 旋转操作
    else if (tId.includes("rotate")) {
      // 旋转点相对与中心点的角度
      // const old_rotate_center_deg = Math.atan2(old_rotate_y - old_center_y, old_rotate_x - old_center_x) / Math.PI * 180;
      const old_rotate_center_deg = -45;
      // 旋转点相对于中心点新的角度
      const new_rotate_center_deg = Math.atan2(current_y - old_center_y, current_x - old_center_x) / Math.PI * 180;
      // 旋转角
      const rotate_deg = new_rotate_center_deg - old_rotate_center_deg;
      // 对角线长的一半
      // console.log({ old_rotate_y, old_center_y, old_rotate_x, old_center_x });
      const xiebian_2 = Math.sqrt(Math.pow(old_rotate_y - old_center_y, 2) + Math.pow(old_rotate_x - old_center_x, 2));

      // console.log({ old_rotate_center_deg, new_rotate_center_deg, rotate_deg, xiebian_2 });

      editMask.rotate = rotate_deg;
      editMask.rotateCenter.y = old_center_y + xiebian_2 * Math.sin(new_rotate_center_deg / 180.0 * Math.PI)
      editMask.rotateCenter.x = old_center_x + xiebian_2 * Math.cos(new_rotate_center_deg / 180.0 * Math.PI)
      editMask.shrinkCenter.y = old_center_y + xiebian_2 * Math.sin((rotate_deg - old_rotate_center_deg) / 180.0 * Math.PI)
      editMask.shrinkCenter.x = old_center_x + xiebian_2 * Math.cos((rotate_deg - old_rotate_center_deg) / 180.0 * Math.PI)
      const id = editMask.id;
      const index = maskList.findIndex(m => m.id == id);
      this.setData({
        editMask: editMask,
        [`maskList[${index}]`]: editMask
      })
    }
    return;
  },

  /**
   * 保存图片
   */
  saveReformImg() {
    wx.createSelectorQuery()
      .select('#canvas-target')
      .fields({ node: true, size: true })
      .exec(res => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d')
        const dpr = wx.getWindowInfo().pixelRatio;
        canvas.width = this.data.IMG_WIDTH * dpr;
        canvas.height = this.data.IMG_HEIGHE * dpr;

        ctx.scale(dpr, dpr)
        // 底图
        let bgi = canvas.createImage();
        bgi.src = this.data.bgImg;
        bgi.onload = () => {
          ctx.drawImage(bgi, 0, 0, this.data.IMG_WIDTH, this.data.IMG_HEIGHE)
          this.drawImgToCanvas(canvas, ctx, 0);
        }
        return;
      })
  },

  /**
   * 绘制图片到canvas上 
   * @param {Canvas} canvas 
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Number} index 
   */
  drawImgToCanvas(canvas, ctx, index) {
    if (index == this.data.maskList.length) {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: this.data.IMG_WIDTH,
        height: this.data.IMG_HEIGHE,
        canvasId: "canvas-target",
        canvas: canvas,
        success: (res) => {
          const imagePath = res.tempFilePath;
          wx.uploadFile({
            filePath: imagePath,
            name: 'file',
            url: http.baseURL + '/file/upload-single',
            success: (res) => {
              const resData = JSON.parse(res.data);
              console.log(resData);
              // 跳转
              wx.navigateTo({
                url: '../savedraft/index',
                success: (res) => {
                  res.eventChannel.emit("data", {
                    cacheUrl: imagePath,
                    siteInfo: this.data.siteInfo,
                    imgUrl: resData.data.fileUrl
                  })
                }
              })
            }
          })


          // 在这里可以处理保存成功后的逻辑，比如展示保存的图片等
          console.log('保存成功，图片路径为：', imagePath);
        },
        fail: (res) => {
          console.error('保存失败：', res);
        }
      })
    } else {
      const mask = this.data.maskList[index]
      const mask_width = mask.size.width * mask.scale.width
      const mask_height = mask.size.height * mask.scale.height
      const mi = canvas.createImage();
      mi.src = mask.url;
      mi.onload = () => {
        console.log("图片加载");
        ctx.save();
        ctx.translate(mask.center.x, mask.center.y - this.data.IMG_TOP)
        ctx.rotate((mask.rotate * Math.PI) / 180);
        ctx.globalAlpha = mask.alpha;
        ctx.drawImage(mi, -mask_width / 2, -mask_height / 2, mask_width, mask_height)
        ctx.restore();
        this.drawImgToCanvas(canvas, ctx, index + 1)
      }
    }
  },

  /**
   * 查看AR模型
   */
  handleARModelClick(e) {
    const { id } = e.target.dataset
    const model = this.data.arModelList.find(m => Number(m.id) == Number(id));
    console.log(model);
    wx.navigateTo({
      url: '../arpage/index',
      success: (res) => {
        res.eventChannel.emit("sendData", { model, siteInfo: this.data.siteInfo })
      }
    })
    console.log("AR", id);
  },

  // * 添加自定义图片
  handleSelfAdd(e) {
    console.log(e);
    const { fileList } = this.data;
    const file = e.detail.files[0]
    this.setData({
      fileList: [...fileList, file]
    })
  },
  // * 移除自定义图片
  handleSelfRemove(e) {
    console.log("移除文件", e);
    const { index } = e.detail;
    const { fileList } = this.data;
    fileList.splice(index, 1);
    this.setData({
      fileList
    })
  },
  // * 添加自定义图片为可编辑提层
  handleSelfEdit(e) {
    console.log("点击图片", e);
    const file = e.detail.file;
    wx.getImageInfo({
      src: file.url,
      success: r => {
        const editMask = this.getNewMask();
        editMask.url = r.path;
        editMask.id = String(new Date().getTime());
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

})