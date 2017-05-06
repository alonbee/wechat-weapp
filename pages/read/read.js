// pages/read/read.js
let api = require('../../api/api.js');
let util = require('../../util/util.js');

Page({
  data: {
    carousel: [],
    articles: {},
    current: 0
  },
  // 页面加载
  onLoad: function (options) {
    api.getReadingCarousel({
      success:  (res) => {
        if (res.data.res === 0) {
          let carousel = res.data.data;
          this.setData({ carousel });
        }
      }
    });

    api.getReadingIndex({
      success: (res) => {
        if (res.data.res === 0) {
          let articles = res.data.data;

          articles.essay.map((essay) => {
            essay.hp_makettime = util.formatEssayTime(essay.hp_makettime);
          });
          articles.serial.map((serial) => {
            serial.maketime = util.formatEssayTime(serial.maketime);
          });
          articles.question.map((question) => {
            question.question_makettime = util.formatEssayTime(question.question_makettime);
          });
          this.setData({ articles });
        } 
      }
    });
  },
  // 滑块页面详情
  viewCarouselDetailTap: function (event) {
    let carouselId = event.currentTarget.dataset.carouselId;
    wx.navigateTo({
      url: 'carousel/carousel?id=' + carouselId
    });
  }
})