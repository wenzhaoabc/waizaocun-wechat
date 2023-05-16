// components/panorama/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: "https://waizao.oss-cn-shanghai.aliyuncs.com/file/e518241a18fb46dc83ab0849b956befc/golf_course_sunrise_2k.png"
    }
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
    handleAssetsProgress: function ({ detail }) {
      console.log(detail);
      console.log('assets progress', detail.value);
    },
    handleAssetsLoaded: function ({ detail }) {
      console.log('assets loaded', detail.value);
    }
  }
})
