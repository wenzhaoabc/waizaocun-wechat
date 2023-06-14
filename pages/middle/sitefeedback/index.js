// pages/middle/sitefeedback/index.js
// const api = require('../../../utils/http')
const api = require('../../../api/sitefeedback');
const http = require('../../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    lat: null,
    lng: null,
    fileList: [],
    imgList: [],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    imageProps: {
      // shape: 'circle',
      style: "padding:10rpx;",
      height: 20,
      width: 20
    },
    uploadImgConfig: {
      sizeType: ['compressed']
    },
    submitBtn: {
      text: '提交',
    },
    lat: 0,
    lon: 0,
    mapMarkers: [
      {
        id: 1,
        latitude: 121,
        longitude: 30
      }
    ]
  },

  handleAdd(e) {
    const { fileList } = this.data;
    const { files } = e.detail;

    // 方法1：选择完所有图片之后，统一上传，因此选择完就直接展示
    // this.setData({
    //   fileList: [...fileList, ...files], // 此时设置了 fileList 之后才会展示选择的图片
    // });

    // 方法2：每次选择图片都上传，展示每次上传图片的进度
    files.forEach(file => this.uploadFile(file))
    console.log(fileList, files);
  },
  uploadFile(file) {
    const { fileList, imgList } = this.data;

    this.setData({
      fileList: [...fileList, { ...file, status: 'loading' }],
    });

    console.log("fileList", this.data.fileList);
    const { length } = fileList;
    const baseURL = http.baseURL;

    const task = wx.uploadFile({
      url: baseURL + '/file/upload-single', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      // formData: { user: 'test' },
      success: (res) => {

        this.setData({
          [`fileList[${length}].status`]: 'done',
        });
        const resData = JSON.parse(res.data);
        if (resData.code == 200) {
          this.setData({
            imgList: [...imgList, resData.data.fileUrl]
          })
        }
        console.log(resData);

      }
    });
    task.onProgressUpdate((res) => {
      this.setData({
        [`fileList[${length}].percent`]: res.progress,
      });
    });
  },
  handleRemove(e) {
    const { index } = e.detail;
    const { fileList, imgList } = this.data;
    console.log(index, fileList);
    const url = imgList[index];

    // api.delete(url).then(res => {
    //   console.log("删除文件", res);
    // }).catch(err => {
    //   console.log("删除失败,", err);
    // })

    fileList.splice(index, 1);
    imgList.splice(index, 1);
    this.setData({
      fileList, imgList
    });
  },

  handleFeedSubmit() {
    console.log("反馈内容提交");
    const { title, content, imgList } = this.data;
    if (title.length == 0) {
      wx.showToast({
        title: '标题不可为空',
        icon: 'error'
      })
      return;
    }
    if (content.length == 0) {
      wx.showToast({
        title: '内容不可为空',
        icon: 'error'
      })
      return;
    }
    if (imgList.length == 0) {
      wx.showToast({
        title: '至少一张图片',
        icon: 'error'
      })
      return;
    }

    // const siteLatitude = res.latitude;
    // const siteLongitude = res.longitude;
    wx.getLocation({
      success: (res) => {
        const reqData = {
          title, content,
          siteLatitude: this.data.lat,
          siteLongitude: this.data.lon,
          imgList
        }
        api.submitFeedBack(reqData).then(() => {
          this.setData({
            "submitBtn.text": "已成功提交",
          })
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          }).catch(() => {
            wx.showToast({
              title: '提交失败',
              icon: 'error'
            })
          })
        })
      },
      fail: () => {
        wx.showToast({
          title: '获取位置失败',
          icon: 'error'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getLocation({
      success: res => {
        this.setData({
          lat: res.latitude,
          lon: res.longitude,
          mapMarkers: [{ id: 1, latitude: res.latitude, longitude: res.longitude, iconPath: '../../../images/middle/Marker1_Activated@3x.png' }]
        })
      }
    })
  },

  changeCurrentLoaction(e) {
    console.log(e);
    const { latitude, longitude } = e.detail;
    this.setData({
      lat: Number(latitude.toFixed(6)),
      lon: Number(longitude.toFixed(6)),
      mapMarkers: [{ id: 1, latitude: Number(latitude.toFixed(6)), longitude: Number(longitude.toFixed(6)), iconPath: '../../../images/middle/Marker1_Activated@3x.png' }]
    })
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