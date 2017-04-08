// pages/read/read.js
var api = require('../../api/api.js');

Page({
  data: {
    carousel: [],
    articles: {},
    current: 0
  },
  // 页面加载
  onLoad: function (options) {
    var that = this;
    // 滑动图片数据
    api.getCarouselList({
      success: function (res) {
        if (res.data.res === 0) {
          var carousel = res.data.data;
          that.setData({ carousel });
        }
      }
    });
    // 文章列表数据
    api.getLastArticles({
      success: function (res) {
        if (res.data.res === 0) {
          var articles = res.data.data;
          that.setData({ articles })
        }
      }
    });

  },
  // 滑块页面详情
  viewDetailTap: function (event) {
    var carouselId = event.currentTarget.dataset.carouselId;
    wx.navigateTo({
      url: 'carousel/carousel?id=' + carouselId
    });
  },

})