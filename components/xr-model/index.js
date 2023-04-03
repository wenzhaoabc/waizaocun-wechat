// components/xr-model/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        modelURL:String
    },

    /**
     * 组件的初始数据
     */
    data: {
        URL:{
            1001:''
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleReady :function ({detail}) {
         console.log('xr-showmodel');  
        }
    }
})
