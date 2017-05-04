// pages/home/detail/detail.js
var api = require('../../../api/api.js');
var util = require('../../../util/util.js');

Page({
  data:{
    isDetail: false,
    detail: {}
  },
  onLoad:function(options){
    api.getHpDetailById({
     query: {
       id: options.id
     },
     success: (res) => {
      if (res.data.res === 0) {
        let detail = res.data.data;
        detail.hp_makettime = util.formatHpMakettime(detail.hp_makettime);
        detail.hp_author = util.formatHpAuthor(detail.hp_author);
        detail.hp_content = util.formatHpContent(detail.hp_content);
        that.setData({ detail });
      }
     }
    });
  },
  // 页面分享
  onShareAppMessage: function() {
    var vol = this.data.detail;
    var shareObj = {
      title: vol.hp_title,
      path: "/pages/home/detail/detal?id=" + vol.hpcontent_id,
      success: function(res) {
        console.log("分享成功！")
      },
      fail: function(res) {
        console.log("分享失败！")
      }
    }
    return shareObj;
  }

})