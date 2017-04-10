// pages/read/question/question.js
var api = require('../../../api/api.js');
var util = require('../../../util/util.js');

Page({
  data:{
    question: {}
  },
  // 页面加载
  onLoad:function(options){
    var that = this;

    api.getQuestionById({
      query: {
        id: options.id
      },
      success: function(res) {
        if (res.data.res === 0) {
          var question = res.data.data;
          question.answer_content = util.filterContent(question.answer_content);
          question.question_makettime = util.formatMakettime(question.question_makettime);
          that.setData({ question });
        }
      }
    })
  }
})