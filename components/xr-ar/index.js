// components/xr-ar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        modelurl:String
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleReady: function ({ detail }) {
            // console.log("");
            // wx.showToast({ title: 'Ready' });
            this.scene = detail.value;
        },
        handleAssetsLoaded: function ({ detail }) {
            wx.showToast({ title: '点击屏幕放置' });
            this.scene.event.add('touchstart', () => {
                this.scene.ar.placeHere('setitem', true);
            });
        }
    }
})
