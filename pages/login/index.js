const api = require("../../api/account");
import Message from 'tdesign-miniprogram/message/index';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneError: false,
    phoneNumber: '',
    verifyCode: '',
    codeError: false,
    codeText: '发送验证码',
  },

  onLogin() {
    let phone = this.data.phoneNumber;
    let verifyCode = this.data.verifyCode;
    if (phone.length != 11) {
      Message.warning({
        align: 'center',
        context: this,
        offset: [100, 32],
        content: '请输入完整的手机号',
      });
      return;
    }
    if (verifyCode.length != 6) {
      Message.warning({
        align: 'center',
        context: this,
        offset: [100, 32],
        content: '请输入完整的验证码',
      });
      return;
    }
    api.Login(phone, verifyCode)
      .then(res => {
        if (res.data.code == 200) {
          const { data } = res.data
          app.globalData.token = data.token;
          app.globalData.userInfo = data.userInfo;
          wx.setStorage({
            key: 'daoxiangli-token',
            data: data.token
          })
          console.log(data.userInfo)
          wx.setStorage({
            key: 'openid',
            data: data.userInfo.wechatId
          })
          wx.setStorage({
            key: 'nickName',
            data: data.userInfo.userName
          })
          wx.setStorage({
            key: 'avatarUrl',
            data: data.userInfo.avatar
          })
          wx.showToast({
            title: '登录成功',
          })
          wx.navigateBack();
        } else {
          Message.error({
            align: 'center',
            context: this,
            offset: [100, 32],
            content: res.data.msg,
          });
        }
      })
      .catch(err => {

      })
  },

  onPhoneInput(e) {
    console.log(e.detail.value);
    const { phoneError } = this.data;
    const isPhoneNumber = /^[1][3,4,5,7,8,9][0-9]{9}$/.test(e.detail.value);
    if (phoneError === isPhoneNumber) {
      this.setData({
        phoneError: !isPhoneNumber,
      });
    }
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  onVerifyCodeInput(e) {
    const { codeError } = this.data;
    const isNumber = /^\d+(\.\d+)?$/.test(e.detail.value);
    if (codeError === isNumber) {
      this.setData({
        codeError: !isNumber,
      });
    }
    this.setData({
      verifyCode: e.detail.value
    })
  },

  /**
   * 发送验证码
   */
  onSendVerifyCode() {
    console.log(this.data.phoneNumber);
    if (this.data.phoneNumber.length < 11) {
      Message.warning({
        align: 'center',
        context: this,
        offset: [100, 32],
        duration: 5000,
        content: '请输入完整的手机号',
      });
      return;
    }
    api.sendVerifyCode(this.data.phoneNumber)
      .then(() => {
        wx.showToast({
          title: '发送成功',
        })
        this.setData({
          codeText: '已发送'
        })
      }).catch((err) => {
        wx.showToast({
          title: '发送失败',
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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