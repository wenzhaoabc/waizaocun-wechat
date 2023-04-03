// pages/arpage/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        width: 300,
        height: 300,
        renderWidth: 300,
        renderHeight: 300,
        selectedModel:null,

        models:[
            {
                id:0,
                name:'休闲椅',
                url:'https://waizao.oss-cn-shanghai.aliyuncs.com/images/armodel/20221010142731_parent_directory_%E4%BC%91%E9%97%B2%E6%A4%8503.jpg',
                model:'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221010142738_parent_directory_%E4%BC%91%E9%97%B2%E6%A4%8503.gltf'
            },
            {
                id:1,
                name:'餐椅',
                url:'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221010150304_parent_directory_%E4%BC%91%E9%97%B2%E6%A4%8543.jpg',
                model:'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221010150313_parent_directory_%E4%BC%91%E9%97%B2%E6%A4%8543.gltf'
            },
            {
                id:2,
                name:'雕塑',
                url:'https://waizao.oss-cn-shanghai.aliyuncs.com/images/armodel/20221019094647_parent_directory_%E9%9B%95%E5%A1%9102.jpg',
                model:'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221019094637_parent_directory_%E9%9B%95%E5%A1%9102.gltf'
            },
            {
                id:3,
                name:'雕塑',
                url:'https://waizao.oss-cn-shanghai.aliyuncs.com/images/armodel/20221019105550_parent_directory_%E9%9B%95%E5%A1%9147.jpg',
                model:'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221019105545_parent_directory_%E9%9B%95%E5%A1%9147.gltf',
            }
        ],
        modelurl:'',
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
            renderHeight: height * dpi
        });
        console.log(options);
        let model = this.data.models.find(e=>e.id===Number(options.modelid))
        console.log({model});
        this.setData({
            modelurl:model.model
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