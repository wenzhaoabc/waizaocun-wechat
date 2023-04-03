// pages/reform/reform.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectedString: '',
        showTypes: false,
        showOriginScene: false,
        siteinfo: {},
        currentElement: {},
        currentModule: {},
        currentModuleIndex: 0,
        currentType: null,
        selectedTypes: [],

        elements: [{
            title: "座椅",
            icon: 'btn',
            types: [{
                id: 1001,
                title: '座椅一',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/20221010145334.png',
                profile: null
            },
            {
                id: 1002,
                title: '座椅二',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%BA%A7%E6%A4%85%20%282%29.png',
                profile: null
            },
            {
                id: 1003,
                title: '座椅三',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%BA%A7%E6%A4%85%20%283%29.png',
                profile: null
            },
            {
                id: 1004,
                title: '座椅四',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%BA%A7%E6%A4%85%20%284%29.png',
                profile: null
            },
            {
                id: 1004,
                title: '座椅五',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%BA%A7%E6%A4%85%20%285%29.png',
                profile: null
            },
            {
                id: 1004,
                title: '座椅六',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%BA%A7%E6%A4%85%20%286%29.png',
                profile: null
            },
            {
                id: 1004,
                title: '座椅七',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%BA%A7%E6%A4%85%20%287%29.png',
                profile: null
            },
            {
                id: 1004,
                title: '座椅八',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%BA%A7%E6%A4%85%20%288%29.png',
                profile: null
            },
            ],
        },
        {
            title: "墙绘",
            icon: 'square',
            types: [{
                id: 2001,
                title: '墙绘一',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%A2%99%E7%BB%98%20%281%29.jpg',
                profile: null
            },
            {
                id: 2002,
                title: '墙绘二',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/%E5%A2%99%E7%BB%98%20%2818%29.png',
                profile: null
            },
            {
                id: 2003,
                title: '墙绘三',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%A2%99%E7%BB%98%20%283%29.jpg',
                profile: null
            },
            {
                id: 2004,
                title: '墙绘四',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%A2%99%E7%BB%98%20%284%29.jpg',
                profile: null
            },
            {
                id: 2004,
                title: '墙绘五',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%A2%99%E7%BB%98%20%285%29.jpg',
                profile: null
            },
            {
                id: 2004,
                title: '墙绘六',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%A2%99%E7%BB%98%20%286%29.jpg',
                profile: null
            },
            {
                id: 2004,
                title: '墙绘七',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%A2%99%E7%BB%98%20%287%29.png',
                profile: null
            },
            {
                id: 2004,
                title: '墙绘八',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E5%A2%99%E7%BB%98%20%288%29.png',
                profile: null
            },
            ]
        },
        {
            title: "绿植",
            icon: 'evaluate',
            types: [{
                id: 3001,
                title: '绿植一',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%A4%8D%E7%89%A9%20%281%29.png',
                profile: null
            },
            {
                id: 3002,
                title: '绿植二',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%A4%8D%E7%89%A9%20%2811%29.png',
                profile: null
            },
            {
                id: 3003,
                title: '绿植三',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%A4%8D%E7%89%A9%20%2812%29.png',
                profile: null
            },
            {
                id: 3004,
                title: '绿植四',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%A4%8D%E7%89%A9%20%2813%29.png',
                profile: null
            },
            {
                id: 3004,
                title: '绿植五',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%A4%8D%E7%89%A9%20%2814%29.png',
                profile: null
            },
            {
                id: 3004,
                title: '绿植六',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%A4%8D%E7%89%A9%20%284%29.png',
                profile: null
            },
            ]
        },
        {
            title: "小品景观",
            icon: 'barcode',
            types: [{
                id: 4001,
                title: '景观一',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%99%AF%E8%A7%82%E5%B0%8F%E5%93%81%20%281%29.png',
                profile: null
            },
            {
                id: 4002,
                title: '景观二',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%99%AF%E8%A7%82%E5%B0%8F%E5%93%81%20%2810%29.png',
                profile: null
            },
            {
                id: 4003,
                title: '景观三',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%99%AF%E8%A7%82%E5%B0%8F%E5%93%81%20%2811%29.png',
                profile: null
            },
            {
                id: 4004,
                title: '景观四',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%99%AF%E8%A7%82%E5%B0%8F%E5%93%81%20%2813%29.png',
                profile: null
            },
            {
                id: 4005,
                title: '景观五',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/%E6%A8%A1%E5%9D%97/%E6%99%AF%E8%A7%82%E5%B0%8F%E5%93%81%20%2813%29.png',
                profile: null
            },
            ]
        },
        {
            title: "栏杆",
            icon: 'skin',
            types: [{
                id: 5001,
                title: '杆一',
                url: 'https://s2.loli.net/2022/10/01/QerIZcnpLPSt4HX.png',
                profile: null
            },
            {
                id: 5002,
                title: '杆二',
                url: 'https://s2.loli.net/2022/10/01/QerIZcnpLPSt4HX.png',
                profile: null
            },
            {
                id: 5003,
                title: '杆三',
                url: 'https://s2.loli.net/2022/10/01/QerIZcnpLPSt4HX.png',
                profile: null
            },
            {
                id: 5004,
                title: '杆四',
                url: 'https://s2.loli.net/2022/10/01/QerIZcnpLPSt4HX.png',
                profile: null
            },
            ]
        },
        {
            title: "其它",
            icon: 'same',
            types: [{
                id: 4001,
                title: '杆一',
                url: 'https://s2.loli.net/2022/10/01/BbCuxiw6JSL8kmt.png',
                profile: null
            },
            {
                id: 4002,
                title: '杆二',
                url: 'https://s2.loli.net/2022/10/01/BbCuxiw6JSL8kmt.png',
                profile: null
            },
            {
                id: 4003,
                title: '杆三',
                url: 'https://s2.loli.net/2022/10/01/BbCuxiw6JSL8kmt.png',
                profile: null
            },
            {
                id: 4004,
                title: '杆四',
                url: 'https://s2.loli.net/2022/10/01/BbCuxiw6JSL8kmt.png',
                profile: null
            },
            ]
        }
        ],
        modules: [{
            id: 1,
            title: "基础",
            other: null
        },
        {
            id: 2,
            title: "AI创作",
            other: null
        },
        {
            id: 3,
            title: "自定义",
            other: null
        },
            // {
            //     id: 4,
            //     title: "模块四",
            //     other: null
            // },
        ],
        models: [
            {
                id: 0,
                name: '休闲椅',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/armodel/20221010142731_parent_directory_%E4%BC%91%E9%97%B2%E6%A4%8503.jpg',
                model: 'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221010142738_parent_directory_%E4%BC%91%E9%97%B2%E6%A4%8503.gltf'
            },
            {
                id: 1,
                name: '餐椅',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221010150304_parent_directory_%E4%BC%91%E9%97%B2%E6%A4%8543.jpg',
                model: 'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221010150313_parent_directory_%E4%BC%91%E9%97%B2%E6%A4%8543.gltf'
            },
            {
                id: 2,
                name: '雕塑',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/armodel/20221019094647_parent_directory_%E9%9B%95%E5%A1%9102.jpg',
                model: 'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221019094637_parent_directory_%E9%9B%95%E5%A1%9102.gltf'
            },
            {
                id: 3,
                name: '雕塑',
                url: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/armodel/20221019105550_parent_directory_%E9%9B%95%E5%A1%9147.jpg',
                model: 'https://waizao.oss-cn-shanghai.aliyuncs.com/gltf/20221019105545_parent_directory_%E9%9B%95%E5%A1%9147.gltf',
            }
        ],
        selectedARModel: null
    },

    saveDraft() {
        app.globalData.selectedTypes = this.data.selectedTypes
        wx.navigateTo({
            url: '../savedraft/index?imgurl=#',
        })
    },

    exchangeModule(e) {
        this.setData({
            currentModule: this.data.modules[e.currentTarget.dataset.index],
            currentModuleIndex: e.currentTarget.dataset.index,
        })
        if (e.currentTarget.dataset.index === 1) {
            console.log(1);
        }
        // console.log('exchangeModule() ',e.currentTarget.dataset.index);
    },

    changeElement(e) {
        this.setData({
            currentElement: this.data.elements[e.currentTarget.dataset.index],
            showTypes: true
        })
    },

    changeType(e) {
        this.setData({
            currentType: this.data.currentElement.types[e.currentTarget.dataset.index]
        })
    },

    finishType(e) {
        // × 或者 √
        let option = e.currentTarget.dataset.info;
        let selectedTypes = this.data.selectedTypes;

        if (this.data.currentType !== null && option) {
            let flag = false
            selectedTypes.forEach(e => {
                if (e.id === this.data.currentType.id) {
                    flag = true
                }
            })
            if (!flag) {
                let temp = this.data.selectedTypes
                temp.push(this.data.currentType)
                this.setData({
                    selectedTypes: temp
                })
            }
        }
        this.setData({
            showTypes: false
        })
        let str = ''
        this.data.selectedTypes.forEach(e => {
            str = str + e.title
        })
        this.setData({
            selectedString: str,
            currentType: null
        })
        // console.log(this.data.selectedTypes);
    },

    onBackOut() {
        let selectedTypes = this.data.selectedTypes
        selectedTypes = selectedTypes.slice(0, -1)
        this.setData({
            selectedTypes: selectedTypes
        })
        let str = ''
        this.data.selectedTypes.forEach(e => {
            str = str + e.title
        })
        this.setData({
            selectedString: str,
            currentType: null
        })
    },

    // 显示原图
    onShowOrigin() {
        // console.log("onShowOrigin() start");
        if (this.data.selectedTypes.length === 0) {
            return
        }
        // console.log("onShowOrigin start end()");
        let tag = this.data.showOriginScene
        this.setData({
            showOriginScene: !tag
        })
        if (this.data.showOriginScene) {
            this.setData({
                selectedString: '',
                'siteinfo.imgurl': 'https://s2.loli.net/2022/10/01/p6kYxaH2eNDlqOW.jpg'
            })
        } else {
            let str = ''
            this.data.selectedTypes.forEach(e => {
                str = str + e.title
            })
            let imgurl = this.data.siteOriginalDataImg
            // console.log('imgurl= ', app.globalData.selectedSite)
            this.setData({
                selectedString: str,
                'siteinfo.imgurl': imgurl
            })
        }
        console.log(this.data.siteinfo.imgurl);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        /**
         * 请求数据
         */
        // function

        this.setData({
            siteinfo: app.globalData.selectedSite,
            siteOriginalDataImg: app.globalData.selectedSite.imgurl
        })
        // console.log(this.data.siteinfo);

        wx.setBackgroundColor({
            backgroundColor: '#000000',
        })
    },

    show3DModel(e) {
        console.log('长按');
        let typeid = e.currentTarget.dataset.typeid
        console.log(e.currentTarget.dataset.typeid);
        wx.navigateTo({
            url: `../showmodel/index?typeid=${typeid}`,
        })
    },

    selectARModel(e) {
        console.log('选中AR模型',e.currentTarget.dataset.model);
        this.setData({
            selectedARModel: e.currentTarget.dataset.model
        })
        wx.navigateTo({
          url: `../arpage/index?modelid=${this.data.selectedARModel.id}`,
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})