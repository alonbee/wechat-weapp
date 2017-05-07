// pages/music/music.js
let api = require('../../api/api.js');
let util = require('../../util/util.js');

Page({
  data:{
    musics: [],
    is_play: false
  },
  // 页面加载
  onLoad: function (options) {
    api.getMusicIdList({
      success: (res) => {
        if (res.data.res === 0) {
          let idList = res.data.data;
          this.getMusicDetail(idList);
        }
      }
    });
  },
  // 获取音乐首页每个id的详情
  getMusicDetail: function (idList) {
    let musics = this.data.musics;
    if (idList.length > 0) {
      api.getMuiscById({
        query: {
          id: idList.shift()
        },
        success:  (res) => {
          if (res.data.res === 0) {
            let music = res.data.data;

            music.story = util.filterContent(music.story);
            music.last_update_date = util.formatBeforeTime(music.last_update_date);
            musics.push(music);
          }
          this.getMusicDetail(idList);
        }
      });
    } else {
      this.setData({ musics });
    }
  },
  viewMuiscDetail: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/detail?id=' + id
    });
  }
})