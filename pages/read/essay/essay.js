// pages/read/essay/essay.js
let api = require('../../../api/api.js');
let util = require('../../../util/util.js');

Page({
  data:{
    essay: {}
  },
  // 页面加载
  onLoad: function (options) {
    console.log(options);
    api.getEssayById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let essay = res.data.data;
          essay.hp_content = util.filterContent(essay.hp_content);
          this.setData({ essay });
        }
      }
    });
  }
})