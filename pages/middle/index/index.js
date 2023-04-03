// pages/choosesite/choosesite.js
const app = getApp()
const CDN_PATH = 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images'
const ALL_SITE_MARK = {
    iconPath: '../../../images/middle/Marker1_Activated@3x.png',
    width: 34,
    height: 34,
}

const ALL_SITE_CALL = {
    fontSize: 16,
    padding: 5,
    borderRadius: 6,
    display: 'ALWAYS',
    color: "#04be02",
    bgColor: '#ffffff'
}

const MAP_FORM = {
    rodmap: '../../../images/middle/roadmap.png',
    satellite: '../../../images/middle/satellite.png'
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs: {
            plus: `${CDN_PATH}/btn_plus@3x.png`,
            minus: `${CDN_PATH}/btn_minus@3x.png`
        },
        siteMakers: [{
                id: 0,
                latitude: 30.947094099563415,
                longitude: 121.86913311481477,
                ...ALL_SITE_MARK,
                callout: {
                    content: '大四灶港',
                    ...ALL_SITE_CALL
                },
            },
            {
                id: 1,
                latitude: 30.949774728600453,
                longitude: 121.87006652355196,
                ...ALL_SITE_MARK,
                callout: {
                    content: '大舞台',
                    ...ALL_SITE_CALL
                },
            },
            {
                id: 2,
                latitude: 30.948533280248224,
                longitude: 121.86859130859376,
                ...ALL_SITE_MARK,
                callout: {
                    content: '希望田野',
                    ...ALL_SITE_CALL
                },
            },
            {
                id: 3,
                latitude: 30.949113131839855,
                longitude: 121.8694442510605,
                ...ALL_SITE_MARK,
                callout: {
                    content: '书院',
                    ...ALL_SITE_CALL
                },
            },
            {
                id: 4,
                latitude: 30.952703,
                longitude: 121.886222,
                ...ALL_SITE_MARK,
                callout: {
                    content: '墙绘',
                    ...ALL_SITE_CALL
                },
            },
            {
                id: 5,
                latitude: 30.949577,
                longitude: 121.886197,
                ...ALL_SITE_MARK,
                callout: {
                    content: '小空间',
                    ...ALL_SITE_CALL
                },
            },
            {
                id: 6,
                latitude: 30.947897,
                longitude: 121.885801,
                ...ALL_SITE_MARK,
                callout: {
                    content: '停车场',
                    ...ALL_SITE_CALL
                },
            },
            {
                id: 7,
                latitude: 30.957468,
                longitude: 121.867547,
                ...ALL_SITE_MARK,
                callout: {
                    content: '稻田构筑物',
                    ...ALL_SITE_CALL
                },
            },
            {
                id: 8,
                latitude: 30.955716,
                longitude: 121.865928,
                ...ALL_SITE_MARK,
                callout: {
                    content: '观光座椅',
                    ...ALL_SITE_CALL
                },
            },
            {
                id: 9,
                latitude: 30.954558,
                longitude: 121.871055,
                ...ALL_SITE_MARK,
                callout: {
                    content: '盐文化线路',
                    ...ALL_SITE_CALL
                },
            },
            {
                id: 10,
                latitude: 30.951847,
                longitude: 121.876106,
                ...ALL_SITE_MARK,
                callout: {
                    content: '田间停车',
                    ...ALL_SITE_CALL
                },
            },
        ],

        location: {
            latitude: 30.950340271946413,
            longitude: 121.86954617500307
        },
        mapFormIcon: MAP_FORM.satellite,
        calloutDispaly: 'ALWAYS',
        minScale: 3,
        maxScale: 20,
        mapScale: 15,
        satellite: false,
        showCallOut: true,

        sitesInfo: [{
                id: 0,
                title: '希望田野',
                publisher: '外灶村委会',
                imgurl: 'https://s2.loli.net/2022/10/01/B94FhqQpkfdoWbi.jpg',
                publishtime: '2022年10月12日',
                location: {
                    latitude: 31.283131,
                    longitude: 121.213922
                },
                detail: '2018年，外灶村自编自导自演《外灶追梦》影片，展现出外灶村的人文底蕴，荣获上海市改革开放40周年创新成果奖。2019年，创新开展《流金岁月、美丽外灶》项目，为168对金婚夫妻拍摄结婚照，进一步促进了村级精神文明建设，满足老人们对美好生活的向往。',
            },
            {
                id: 1,
                title: '村民大舞台',
                publisher: '外灶村委会',
                imgurl: 'https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg',
                publishtime: '2022年10月11日',
                location: {
                    latitude: 30.94713548205828,
                    longitude: 121.86908483505249
                },
                detail: '浦东新区书院镇外灶村，作为临港自贸区新片区内对接自贸先行区的“临港第一村”，以丰厚的历史底蕴和共同的文化传承，为美丽乡村建设增添了生动的注脚。',
            },
            {
                id: 2,
                title: '田野',
                publisher: '外灶村委会',
                imgurl: 'https://s2.loli.net/2022/10/01/4sdw3QpAYtFNzrD.jpg',
                publishtime: '2022年10月11日',
                location: {
                    latitude: 30.94713548205828,
                    longitude: 121.86908483505249
                },
                detail: '浦东新区书院镇外灶村，作为临港自贸区新片区内对接自贸先行区的“临港第一村”，以丰厚的历史底蕴和共同的文化传承，为美丽乡村建设增添了生动的注脚。',
            },
            {
                id: 3,
                title: '书院',
                publisher: '外灶村委会',
                imgurl: 'https://s2.loli.net/2022/10/01/p6kYxaH2eNDlqOW.jpg',
                publishtime: '2022年10月11日',
                location: {
                    latitude: 30.94713548205828,
                    longitude: 121.86908483505249
                },
                detail: '外灶之“灶”，指过去制盐的建制单位，当地人也视为制盐时的砌灶烧煮。百余年前，外灶村地域成陆后，沿海地区制盐业十分兴旺，制盐需砌灶烧煮，于是境内有"外三灶"、"里三灶"之称，后形成小集镇，外灶村由此而得名。',
            },
            {
                id: 4,
                title: '墙绘',
                publisher: '外灶村委会',
                imgurl: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/现状图片/点位2 现状 (1).jpg',
                publishtime: '2022年10月11日',
                location: {
                    latitude: 30.94713548205828,
                    longitude: 121.86908483505249
                },
                detail: '外灶之“灶”，指过去制盐的建制单位，当地人也视为制盐时的砌灶烧煮。百余年前，外灶村地域成陆后，沿海地区制盐业十分兴旺，制盐需砌灶烧煮，于是境内有"外三灶"、"里三灶"之称，后形成小集镇，外灶村由此而得名。',
            },
            {
                id: 5,
                title: '小空间',
                publisher: '外灶村委会',
                imgurl: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/现状图片/点位3 现状 (1).jpg',
                publishtime: '2021年10月9日',
                location: {
                    latitude: 30.949577,
                    longitude: 121.886197
                },
                detail:'小空间规划'
            },
            {
                id: 6,
                title: '停车场',
                publisher: '外灶村委会',
                imgurl: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/现状图片/点位4 现状 (1).jpg',
                publishtime: '2023年2月11日',
                location: {
                    latitude: 30.947897,
                    longitude: 121.885801
                },
                detail:'小型停车场规划'
            },
            {
                id: 7,
                title: '稻田构筑物',
                publisher: '外灶村委会',
                imgurl: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/现状图片/点位5 现状 (10).jpg',
                publishtime: '2023年2月11日',
                location: {
                    latitude: 30.947897,
                    longitude: 121.885801
                },
                detail:'合理规划稻田构筑'
            },
            {
                id: 8,
                title: '观光座椅',
                publisher: '外灶村委会',
                imgurl: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/现状图片/点位6 现状 (1).jpg',
                publishtime: '2023年2月11日',
                location: {
                    latitude: 30.955716,
                    longitude: 121.865928
                },
                detail:'设置观光座椅，要求舒适美观实用'
            },
            {
                id: 9,
                title: '盐文化线路',
                publisher: '外灶村委会',
                imgurl: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/现状图片/点位8 现状 (1).jpg',
                publishtime: '2023年1月29日',
                location: {
                    latitude: 30.954558,
                    longitude: 121.871055,
                },
                detail:'设置外灶村制盐观光线路，体现本村特色'
            },
            {
                id: 10,
                title: '田间停车',
                publisher: '外灶村委会',
                imgurl: 'https://waizao.oss-cn-shanghai.aliyuncs.com/images/现状图片/点位7 现状 (1).jpg',
                publishtime: '2023年3月3日',
                location: {
                    latitude: 30.951847,
                    longitude: 121.876106,
                },
                detail:'田间地头临时停车'
            },
        ],
        searchResSitesInfo: [],
        currentSiteInfo: {},
        tosearch: false,
        toDetail: false,
        reviewList: [{
                reviewID: 'REB23M1',
                userID: 'UBG001',
                userName: '李林飞',
                headPhoto: 'https://s2.loli.net/2022/11/05/RpfSei7DEk1IK9U.jpg',
                content: '美丽外灶人人共建！',
                date: '2022年11月4日',
                isHelpful: true,
                isLoved: false,
                father: 'RE00BV4'
            },
            {
                reviewID: 'REB23M2',
                userID: 'UBG459',
                userName: '岳疏鸿',
                headPhoto: 'https://s2.loli.net/2022/11/05/JHblT1xpcjgSA6K.jpg',
                content: '浴乎沂，风乎舞雩，咏而归，是我向往的生活',
                date: '2022年11月4日',
                isHelpful: true,
                isLoved: false,
                father: 'RE00BV4'
            },
            {
                reviewID: 'REB23M3',
                userID: 'UBG021',
                userName: '张慧敏',
                headPhoto: 'https://s2.loli.net/2022/11/05/8j6akmQ9xViINKG.jpg',
                content: '在希望的田野上🎶……',
                date: '2022年11月4日',
                isHelpful: true,
                isLoved: false,
                father: 'RE00BV4'
            },
        ],
        inputReviewValue: '',
    },

    onIncreaseScale() {
        let scale = this.data.mapScale;
        if (scale === this.data.maxScale) {
            return;
        }
        scale++;
        this.setData({
            mapScale: scale
        });
        if (scale >= 15) {
            this.handleCallOut(true)
        }
    },
    onDecreaseScale() {
        let scale = this.data.mapScale;
        if (scale === this.data.minScale) {
            return;
        }
        scale--;
        this.setData({
            mapScale: scale
        });
        if (scale < 15) {
            this.handleCallOut(false)
        }
    },

    onChangeMapForm() {
        let tag = this.data.satellite
        this.setData({
            satellite: !tag,
            mapFormIcon: tag ? MAP_FORM.satellite : MAP_FORM.rodmap
        })
    },

    onChangeCurrentSite(e) {
        this.setData({
            currentSiteInfo: this.data.sitesInfo[e.markerId],
            toDetail: true
        })
        // console.log(this.data.currentSiteInfo);
    },

    onStartDesign() {
        app.globalData.selectedSite = this.data.currentSiteInfo
        wx.navigateTo({
            url: '../reform/index',
        })
    },

    onFeedBack() {
        wx.navigateTo({
            url: '../addsite/index',
        })
    },

    handleCallOut(isShow) {
        let obj = this.data.siteMakers
        let str = isShow ? 'ALWAYS' : 'BYCLICK'
        obj.forEach(e => {
            e.callout.display = str
        })
        this.setData({
            siteMakers: obj
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            currentSiteInfo: this.data.sitesInfo[0]
        })
        // wx.getLocation({
        //     type: 'wgs84',
        //     isHighAccuracy: true,
        //     success: (res) => {
        //         this.setData({
        //             'location.latitude': res.latitude,
        //             'location.longitude': res.longitude
        //         })
        //     },
        //     fail: (err) => {
        //         console.log(err);
        //     }
        // })
    },
    gotoSearch() {
        this.setData({
            toSearch: true,
            toDetail: false
        })
        // console.log(this.data.tosearch);
        // console.log("tosearch");
    },
    canselSearch() {
        this.setData({
            toSearch: false,
            toDetail: false,
        })
        console.log("点击地图");
    },
    inputtoSearch(e) {
        // 搜索逻辑的实现
        // console.log(e.detail.value);
        let text = e.detail.value
        console.log(text);
        if (!text || text === "") {
            this.setData({
                searchResSitesInfo: null
            })
            return
        }
        let resArr = this.data.sitesInfo.filter(s => {
            return s.title.indexOf(text) >= 0
        })
        console.log(resArr);
        if (resArr != null) {
            this.setData({
                searchResSitesInfo: resArr
            })
        }
    },
    // searchConfirm(e){
    //     let text = e.detail.value
    //     if(!text||text===""){
    //         this.setData({
    //             searchResSitesInfo:[]
    //         })
    //         return
    //     }
    //     let resArr = this.data.sitesInfo.find(s=>s.title===text)
    //     if(resArr!=null){
    //         this.setData({
    //             searchResSitesInfo:resArr
    //         })
    //     }
    // },
    gotoSiteDetail(e) {
        let site = e.currentTarget.dataset.site
        this.setData({
            currentSiteInfo: site,
            toDetail: true,
            toSearch: false
        })
    },
    getInputVal(e) {
        this.setData({
            inputReviewValue: e.detail.value
        })
    },
    sendReview() {
        let date = new Date()
        let dateStr = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日'
        let newMyReview = this.data.reviewList.find(r=>r.reviewID==='000000')
        if(newMyReview!=null){
            newMyReview.content = this.data.inputReviewValue
        }
        let myreview = {
            reviewID: '000000',
            userID: '000000',
            userName: wx.getStorageSync('nickName') || '',
            headPhoto: wx.getStorageSync('avatarUrl') || '',
            content: this.data.inputReviewValue,
            date: dateStr,
            isHelpful: true,
            isLoved: false,
            father: 'RE00BV4'
        }
        let newReviewList = this.data.reviewList.push(myreview)
        console.log(myreview);
        this.setData({
            reviewList: newReviewList,
            inputReviewValue: ''
        })
    },

    // 点击村舍跳转到three.js的测试界面
    onRouteToThree(){
        wx.navigateTo({
          url: '/pages/threeTest/threeTest',
        })
    }
})