// pages/read/carousel/carousel.js
var api = require('../../../api/api.js');

Page({
  data:{
    detail: []
  },
  // 页面加载
  onLoad:function(options){
    var that = this;
    var id = options.id;

    api.getCarouselDetailById({
      query: {
        id: id
      },
      success: function(res) {
        if (res.data.res === 0) {
          var detail = res.data.data;
          that.setData({ detail })
        }
      }
    });
  }
})