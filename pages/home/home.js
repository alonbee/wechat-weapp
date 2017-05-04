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
            // 设置本地存储，实现收藏
            let hpsIsFavorite = wx.getStorageSync('hps_is_favorite') || {};
            if (hpsIsFavorite[hp.hpcontent_id]) {
              let isFavorite = hpsIsFavorite[hp.hpcontent_id];
              hp.is_favorite = isFavorite;
            } else {
              hpsIsFavorite[hp.hpcontent_id] = false;
              hp.is_favorite = false;
              wx.setStorageSync('hps_is_favorite', hpsIsFavorite);
            }
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
  },
  // 点击收藏事件
  onFavoriteTap: function (event) {
    let hpId = event.currentTarget.dataset.hpId;
    this.getHpsIsFavoriteAsy(hpId);
  },
  // 取得所有的卡片是否收藏信息
  getHpsIsFavoriteAsy: function(hpId) {
    wx.getStorage({
      key: 'hps_is_favorite',
      success: (res) => {
        let hpsIsFavorite = res.data;
        let isFavorite = hpsIsFavorite[hpId];
        // 取反设置收藏
        isFavorite = !isFavorite;
        hpsIsFavorite[hpId] = isFavorite;
        this.showToast(hpsIsFavorite, isFavorite, hpId);
      }
    });
  },
  // 设置和显示收藏信息
  showToast: function (hpsIsFavorite, isFavorite, hpId) {
    // 更新收藏信息
    wx.setStorageSync('hps_is_favorite', hpsIsFavorite);
    // 更新数据
    let hps = this.data.hps;
    for (let i = 0; i < hps.length; i++) {
      if (hps[i].hpcontent_id === hpId) {
        hps[i].is_favorite = isFavorite;
      }
    }
    this.setData({ hps });
    wx.showToast({
      title: isFavorite? "收藏成功" : "取消收藏",
      duration: 1000,
      icon: "success"
    });
  },
  // 点击分享事件
  onShareTap: function() {
    var itemList = [
      "分享给好友",
      "分享到朋友圈",
      "分享到QQ空间",
      "分享到微博"
    ]
    // 操作菜单栏
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#666",
      success: function(res) {
        // 显示模态弹窗
        wx.showModal({
          title: "这是分享的标题",
          content: "小程序还没有内容分享功能!"
        });
      }
    });
  },
})