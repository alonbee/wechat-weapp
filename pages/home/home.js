// pages/home/home.js
var api = require('../../api/api.js');
var util = require('../../util/util.js');

Page({
  data: {
    vols: [],
    current: 0
  },
  // 页面加载
  onLoad: function (options) {
    var that = this;
    // 取得vols列表id
    api.getVolIdList({
      success: function (res) {
        if (res.data.res === 0) {
          var idList = res.data.data;
          that.getVols(idList);
        }
      }
    });
  },
  // 取得vols列表id对应的详细数据
  getVols: function (idList) {
    var that = this;
    var vols = this.data.vols;

    if (idList.length > 0) {
      api.getVolById({
        query: {
          id: idList.shift()
        },
        success: function (res) {
          if (res.data.res === 0) {
            var vol = res.data.data;
            vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
            vols.push(vol);
          }
          that.getVols(idList);
        }
      });
    } else {
      that.setData({ vols })
    }
  },
  // 页面初次渲染完成
  onReady: function () {
    var title = '早安 | 午安 | 晚安';
    var hour = (new Date()).getHours();

    if (hour >= 6 && hour <= 9) {
      title = '早安'
    } else if (hour >= 11 && hour <= 13) {
      title = '午安'
    } else if (hour >= 21 && hour < 24) {
      title = '晚安'
    } else if (hour >= 0 && hour < 6) {
      title = '睡觉吧!'
    }
    // 根据时间设置导航条标题
    wx.setNavigationBarTitle({
      title: title
    });

  },
  // 点击卡券整体跳转详情页
  viewDetailTap: function(event) {
    var volId = event.currentTarget.dataset.volId;
    wx.navigateTo({
      url: 'detail/detail?id=' + volId 
    });
  },
  // 点击卡券more跳转年月选择页面
  viewMoreTap: function(event) {
    wx.navigateTo({
      url: '../history/history?page=home'
    });
  }

})