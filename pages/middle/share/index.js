// pages/design_submit/design_submit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recommendSitesList:[],
        recommendSitesAmount:0,
        recommendSites:{
            userId:'UWZ2104',
            count:10,
            amount:30,
            nextList:'/recommend/UWZ2104/20',
            list:
            [
            {id:'SA0091',title:'书院',publisher:'杨庄社区',imgurl:'https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg'},
            {id:'SA0091',title:'田野',publisher:'外灶社区',imgurl:'https://s2.loli.net/2022/11/05/xmRNkPV2pI9a1Dt.png'},
            {id:'SA0091',title:'溪流',publisher:'三灶村',imgurl:'https://s2.loli.net/2022/11/05/3ZS9HhMDxPuUb5f.png'},
            {id:'SA0091',title:'河谷',publisher:'丰司乡',imgurl:'https://s2.loli.net/2022/11/05/4Ca2AuxgYJjf5Vn.png'},
            {id:'SA0091',title:'墙角',publisher:'小岗村',imgurl:'https://s2.loli.net/2022/11/05/5ci1KETHrGOvzsg.png'},
            {id:'SA0091',title:'长亭',publisher:'凤阳县',imgurl:'https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg'},
            {id:'SA0091',title:'水榭',publisher:'塔寨村',imgurl:'https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg'},
            {id:'SA0091',title:'门洞',publisher:'杨庄社区',imgurl:'https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg'},
            {id:'SA0091',title:'高台',publisher:'杨庄社区',imgurl:'https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg'},
            {id:'SA0091',title:'阑干',publisher:'杨庄社区',imgurl:'https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg'},
        ],
        
        }
    },
    shareDesign(){
        console.log("点击分享");
        wx.navigateTo({
          url: '../index/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            recommendSitesList:this.data.recommendSitesList.concat(this.data.recommendSites.list),
            recommendSitesAmount:this.data.recommendSites.amount
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        let tempthis = this
        if(this.data.recommendSitesList.length<this.data.recommendSitesAmount){
            this.setData({
                recommendSitesList:this.data.recommendSitesList.concat(this.data.recommendSites.list)
            })
        }else{
            wx.showToast({
                title: "到底了", // 提示的内容
                icon: 'none', // 图标，默认success
                // image: "", // 自定义图标的本地路径，image 的优先级高于 icon
                // duration: 3000, // 提示的延迟时间，默认1500
                mask: true, // 是否显示透明蒙层，防止触摸穿透
                success: function () {
                    console.log("接口调用成功的回调函数");
                },
                fail: function () {
                    console.log("接口调用失败的回调函数");
                },
                complete: function () {
                    // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
                }
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    
})