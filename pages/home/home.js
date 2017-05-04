// pages/home/home.js
var api = require('../../api/api.js');
var util = require('../../util/util.js');

Page({
  data: {
    hps: [],
    current: 0
  },
  // 页面加载
  onLoad: function (options) {
    // 取得vols列表id
    api.getHpIdList({
      success: (res) => {
        if (res.data.res === 0) {
          let idList = res.data.data;
          this.getHps(idList);
        }
      }
    });
  },
  // 取得vols列表id对应的详细数据
  getHps: function (idList) {
    let hps = this.data.hps;

    if (idList.length > 0) {
      api.getHpDetailById({
        query: {
          id: idList.shift()
        },
        success: (res) => {
          if (res.data.res === 0) {
            let hp = res.data.data;
            hp.hp_makettime = util.formatHpMakettime(hp.hp_makettime);
            hp.hp_author = util.formatHpAuthor(hp.hp_author);
            hp.hp_content = util.formatHpContent(hp.hp_content);
            hps.push(hp);
          }
          this.getHps(idList);
        }
      });
    } else {
      this.setData({ hps });
    }
  },
  // 小记跳转详情
  viewDetailTap: function (event) {
    let hpId = event.currentTarget.dataset.hpId;
    wx.navigateTo({
      url: 'detail/detail?id=' + hpId 
    });
  },
  // 滑动卡片到最后一张跳转历史
  handleChange: function (event) {
    let current = event.detail.current;
    let hpsLength = this.data.hps.length;

    if (current === hpsLength) {
      this.setData({
        current: hpsLength
      });
      wx.navigateTo({
        url: '../history/history',
        success: function(res){
          this.setData({
            current: hpsLength - 1
          });
        }
      });
    }
  }
})