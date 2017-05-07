// pages/music/motnly/monthly.js
let api = require('../../../api/api.js');
let util = require('../../../util/util.js');

Page({
  data:{
    musics: [],
    title: ''
  },
  onLoad: function (options) {
    let title = '';
    if (options.title === '本月') {
      title = util.formatHpsTitle();
    } else {
      title = options.title
    }
    this.setData({
      title: title
    });

    api.getMusicByMonth({
      query: {
        month: options.month
      },
      success: (res) => {
        if (res.data.res === 0) {
          let musics = res.data.data;
          this.setData({ musics });
        }
      }
    });
  },
  viewMusicDetail: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  }
})