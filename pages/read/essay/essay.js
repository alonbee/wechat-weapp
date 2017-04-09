// pages/read/essay/essay.js
var api = require('../../../api/api.js');
var util = require('../../../util/util.js');

Page({
  data:{
    essay: {}
  },
  // 页面加载
  onLoad:function(options){
    var that = this;

    api.getEssayById({
      query: {
        id: options.id
      },
      success: function(res) {
        if (res.data.res === 0) {
          var essay = res.data.data;
          essay.hp_content = util.filterContent(essay.hp_content);
          essay.hp_makettime = util.formatMakettime(essay.hp_makettime);
          that.setData({ essay });
        }
      }
    });
  }

})