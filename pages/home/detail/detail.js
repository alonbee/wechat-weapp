// pages/home/detail/detail.js
var api = require('../../../api/api.js');
var util = require('../../../util/util.js');

Page({
  data:{
    isDetail: false,
    detail: {}
  },
  onLoad:function(options){
    var that = this;

    api.getVolDetailById({
     query: {
       id: options.id
     },
     success: function(res) {
      if (res.data.res === 0) {
        var detail = res.data.data;
        detail.hp_makettime = util.formatMakettime(detail.hp_makettime);
        that.setData({ detail });
      }
     }
    });
  },

  onReady: function() {
    var title = '- 图文 -'

    wx.setNavigationBarTitle({
      title: title
    });
  }

})