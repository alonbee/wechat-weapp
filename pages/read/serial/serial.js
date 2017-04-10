// pages/read/serial/serial.js
var api = require('../../../api/api.js');
var util = require('../../../util/util.js');

Page({
  data:{
    serial: {}
  },
  // 页面加载
  onLoad:function(options){
    var that = this;

    api.getSerialById({
      query: {
        id: options.id
      },
      success: function(res) {
        if (res.data.res === 0) {
          var serial = res.data.data;
          serial.content = util.filterContent(serial.content);
          serial.maketime = util.formatMakettime(serial.maketime);
          that.setData({ serial })
        }
      }
    });
  }
})