// pages/music/music.js
var api = require('../../api/api.js');
var util = require('../../util/util.js');

Page({
  data:{
    musics: []
  },
  // 页面加载
  onLoad:function(options){
    var that = this;
    api.getMusicIdList({
      success: function (res) {
        if (res.data.res === 0) {
          var idList = res.data.data;
          that.getMusics(idList);
        }
      }
    });
  },
  getMusics: function (idList) {
    var that = this;
    var musics = this.data.musics;

    if (idList.length > 0) {
      api.getMusicDetailById({
        query: {
          id: idList.shift()
        },
        success: function (res) {
          if (res.data.res === 0) {
            var music = res.data.data;

            music.story = util.filterContent(music.story);
            music.maketime = util.formatMakettime(music.maketime);
            musics.push(music);
          }
          that.getMusics(idList);
        }
      });
    } else {
      that.setData({ musics });
    }
  }

})