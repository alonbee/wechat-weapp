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
    // 请求阅读页滑块内容
    api.getReadingCarousel({
      success:  (res) => {
        if (res.data.res === 0) {
          let carousel = res.data.data;
          this.setData({ carousel });
        }
      }
    });
    // 请求首页的文章列表
    api.getReadingIndex({
      success: (res) => {
        if (res.data.res === 0) {
          let articles = res.data.data;

          // 文章发送时间过滤
          articles.essay.map((essay) => {
            essay.hp_makettime = util.getBeforeTime(essay.hp_makettime);
          });
          articles.serial.map((serial) => {
            serial.maketime = util.getBeforeTime(serial.maketime);
          });
          articles.question.map((question) => {
            question.question_makettime = util.getBeforeTime(question.question_makettime);
          });
          console.log(articles);
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
  },
  // 跳转Essay详情
  viewEssayTap: function (event) {
    let id = event.currentTarget.dataset.id;
    let userId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `essay/essay?id=${id}&user_id=${userId}`
    });
  },
  // 跳转Serial详情
  viewSerialTap: function (event) {
    let id = event.currentTarget.dataset.id;
    let userId = event.currentTarget.dataset.id;    
    wx.navigateTo({
      url: `serial/serial?id=${id}&user_id=${userId}`
    });
  },
  // 跳转Question详情
  viewQuestionTap: function (event) {
    let id = event.currentTarget.dataset.id;
    let userId = event.currentTarget.dataset.id;    
    wx.navigateTo({
      url: `question/question?id=${id}&user_id=${userId}`
    });
  }
})