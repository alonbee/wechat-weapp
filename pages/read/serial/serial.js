// pages/read/serial/serial.js
let api = require('../../../api/api.js');
let util = require('../../../util/util.js');

Page({
  data:{
    serial: {}
  },
  // 页面加载
  onLoad: function (options){
    console.log(options);
    api.getSerialById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let serial = res.data.data;
          serial.content = util.filterContent(serial.content);
          this.setData({ serial });
          console.log(serial);
        }
      }
    });
  }
})