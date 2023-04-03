// pages/savedraft/savedraft.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // modal:false
        selectedTypes: [],
        text: '',
        imgurl: '',
        selectedSite: {},

        siteReformedUrl: [
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D8%E6%84%8F%E5%90%91%E5%9B%BE3.png',
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D8%E6%84%8F%E5%90%91%E5%9B%BE3.png',
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D8%E6%84%8F%E5%90%91%E5%9B%BE3.png',
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D8%E6%84%8F%E5%90%91%E5%9B%BE3.png',
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D2%20%E5%A2%99%E7%BB%98%E6%84%8F%E5%90%91%E5%9B%BE.jpg',
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D3%20%E5%B0%8F%E7%A9%BA%E9%97%B4%E6%84%8F%E5%90%91%E5%9B%BE%20.jpg',
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D4%20%E5%81%9C%E8%BD%A6%E5%9C%BA%E6%84%8F%E5%90%91%E5%9B%BE.jpg',
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D5%20%E7%A8%BB%E7%94%B0%E6%84%8F%E5%90%91%E5%9B%BE.png',
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D6%E6%84%8F%E5%90%91%E5%9B%BE.png',
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D8%E6%84%8F%E5%90%91%E5%9B%BE1.png',
            'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%84%8F%E5%90%91%E5%9B%BE/%E7%82%B9%E4%BD%8D7%E6%84%8F%E5%90%91%E5%9B%BE2.png',
        ]
    },

    exeSave() {
        // 演示
        wx.navigateTo({
            url: '../share/index',
        })
        return

        wx.request({
            url: 'upload/design',
            method: 'POST',
            data: {
                openId: app.globalData.openId,
                selectedTypes: this.data.selectedTypes,
                text: this.data.text
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                wx.navigateTo({
                    url: '../design_submit/design_submit',
                })
            },
            fail(err) {
                wx.showToast({
                    title: '上传失败',
                    icon: 'none',
                    mask: false
                })
                console.log(err);
            }
        })
    },
    // hideModal(){
    //     this.setData({
    //         modal:false
    //     })
    // },
    textareaBInput(res) {
        this.setData({
            text: res.detail.value
        })
        console.log(res.detail.value);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            selectedTypes: app.globalData.selectedTypes,
            // imgurl:options.imgurl,
            selectedSite: app.globalData.selectedSite,
            imgurl: this.data.siteReformedUrl[app.globalData.selectedSite.id]
        });
        console.log(this.data.imgurl);

    },
    downloadImg() {
        wx.downloadFile({
            url: this.data.imgurl,
            success(res) {
                if (res.statusCode == 200) {
                    let img = res.tempFilePath
                    wx.saveImageToPhotosAlbum({
                        filePath: img,
                        success(res) {
                            wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                            });
                        },
                        fail(res) {
                            wx.showToast({
                                title: '保存失败',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                }
            }
        })
    }

})