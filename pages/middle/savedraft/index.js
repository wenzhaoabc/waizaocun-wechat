// pages/savedraft/savedraft.js
const app = getApp()
const http = require('../../../api/sites')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: '',
        cacheUrl: "",
        imgUrl: "",
        siteInfo: {}
    },

    textareaBInput(res) {
        this.setData({
            text: res.detail.value
        })
        console.log(res.detail.value);
    },

    /**
     * 提交我的设计
     */
    async handleSubmitMyDesign() {
        let data = {
            siteId: this.data.siteInfo.siteId ?? 28,
            imgPath: this.data.imgUrl,
            text: this.data.text,
            createTime: new Date().toISOString()
        }
        const res = await http.addMySiteDesign(data)
        console.log("res = ", res);
        wx.navigateTo({
            url: '../share/index',
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // this.setData({
        //     selectedTypes: app.globalData.selectedTypes,
        //     // imgurl:options.imgurl,
        //     selectedSite: app.globalData.selectedSite,
        //     imgurl: this.data.siteReformedUrl[app.globalData.selectedSite.id]
        // });
        // console.log(this.data.imgurl);

        const eventChannel = this.getOpenerEventChannel();
        // 接收数据
        eventChannel.on("data", (data) => {
            const { cacheUrl, imgUrl, siteInfo } = data
            console.log(data);
            this.setData({
                cacheUrl, imgUrl, siteInfo
            })
        })

    },
    downloadImg() {
        wx.getSetting({
            success: (res) => {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success: (res) => {
                            wx.saveImageToPhotosAlbum({
                                filePath: this.data.cacheUrl,
                                success: () => {
                                    wx.showToast({
                                        title: '保存成功',
                                        icon: 'success'
                                    })
                                }
                            })
                        }
                    })
                } else {
                    wx.saveImageToPhotosAlbum({
                        filePath: this.data.cacheUrl,
                        success: () => {
                            wx.showToast({
                                title: '保存成功',
                                icon: 'success'
                            })
                        }
                    })
                }
            }
        })
    },

    onShareAppMessage(obj) {
        return {
            imageUrl: this.data.imgUrl,
        }
    },

    onShareTimeline() {
        return {
            title: "社区改造",
            imageUrl: this.data.imgUrl
        }
    },

})