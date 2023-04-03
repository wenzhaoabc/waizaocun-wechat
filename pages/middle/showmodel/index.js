// pages/showmodel/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        width: 300,
        height: 300,
        renderWidth: 300,
        renderHeight: 300,
        modelURL:'',
        URL:{
            1001:'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221010145334_parent_directory_%E4%BC%91%E9%97%B2%E6%A4%8532.gltf',
            4005:'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221009162409_parent_directory_%E7%AB%99%E5%8F%B002.gltf'
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const info = wx.getSystemInfoSync();
        const width = info.windowWidth;
        const height = info.windowHeight;
        const dpi = info.pixelRatio;
        this.setData({
            width, height,
            renderWidth: width * dpi,
            renderHeight: height * dpi,
            modelURL:this.data.URL[options.typeid]
        });
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