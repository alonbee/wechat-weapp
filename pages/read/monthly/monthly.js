// pages/read/monthly/monthly.js
var api = require('../../../api/api.js');

Page({
  data:{
    articles: [],
    articleType: '',
    title: ''
  },
  // 页面加载
  onLoad:function(options){
    var that = this;
    var year = options.year;
    var month = options.month;
    var date = year + '-' + month;
    var articleType = options.type;

    api.getArticlesByDate({
      query: {
        type: articleType,
        date: date
      },
      success: function(res) {
        if (res.data.res === 0) {
          var articles = res.data.data;
          that.setData({ 
            articles: articles,
            articleType: articleType
          });
        }
      }
    });
  },
  // 短篇文章详情
  viewEssayDetailTap: function (event) {
    var essayId = event.currentTarget.dataset.essayId;
    wx.navigateTo({
      url: '../essay/essay?id=' + essayId
    });
  },
  // 连载文章详情
  viewSerialTap: function (event) {
    var serialId = event.currentTarget.dataset.serialId;
    wx.navigateTo({
      url: '../serial/serial?id=' + serialId
    });
  },
  // 问答文章详情
  viewQuestionTap: function (event) {
    var questionId = event.currentTarget.dataset.questionId;
    wx.navigateTo({
      url: '../question/question?id=' + questionId
    });
  }
})