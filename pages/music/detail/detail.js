// pages/music/detail/detail.js
let api = require('../../../api/api.js');
let util = require('../../../util/util.js');

Page({
  data:{
    music: {}
  },
  // 页面加载
  onLoad: function (options) {
    api.getMuiscById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let music = res.data.data;
          music.story = util.filterContent(music.story);
          this.setData({ music });
        }
      }
    });
  }
})