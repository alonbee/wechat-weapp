// pages/read/question/question.js
let api = require('../../../api/api.js');
let util = require('../../../util/util.js');

Page({
  data:{
    question: {}
  },
  // 页面加载
  onLoad: function (options) {
    console.log(options);
    api.getQuestionById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let question = res.data.data;
          question.answer_content = util.filterContent(question.answer_content);
          this.setData({ question });
        }
      }
    })
  }
})