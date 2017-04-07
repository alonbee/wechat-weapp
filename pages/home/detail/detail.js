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

    // 发起请求，拿到数据
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

    // 设置本地存储，实现收藏
    var volsIsFavorite = wx.getStorageSync('vols_is_favorite');
    var volId = options.id;
    // 将当前的卡券信息绑定在data上，方便后面使用
    this.data.currentVolId = volId;
    if (volsIsFavorite) {
      var isFavorite = volsIsFavorite[volId];
      this.setData({
        isFavorite: isFavorite
      });
    } else {
      var volsIsFavorite = {};
      volsIsFavorite[volId] = false;
      wx.setStorageSync('vols_is_favorite', volsIsFavorite);
    }

  },
  // 点击收藏事件
  onFavoriteTap: function() {
    this.getVolsIsFavoriteAsy();
  },
  // 取得所有的卡片是否收藏信息
  getVolsIsFavoriteAsy: function() {
    var that = this;
    wx.getStorage({
      key: 'vols_is_favorite',
      success: function(res){
        var volsIsFavorite = res.data;
        var isFavorite = volsIsFavorite[that.data.currentVolId];
        // 取反设置收藏
        isFavorite = !isFavorite;
        volsIsFavorite[that.data.currentVolId] = isFavorite;
        that.showToast(volsIsFavorite, isFavorite);
      }
    })
  },
  // 设置和显示收藏信息
  showToast: function(volsIsFavorite, isFavorite) {
    // 更新收藏信息
    wx.setStorageSync('vols_is_favorite', volsIsFavorite);
    // 更新数据
    this.setData({
      isFavorite: isFavorite
    });
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
  // 页面分享
  onShareAppMessage: function() {
    var vol = this.data.detail;
    var shareObj = {
      title: vol.hp_title,
      path: "/pages/home/detail/detal?id=" + vol.hpcontent_id,
      success: function(res) {
        console.log("分享成功！")
      },
      fail: function(res) {
        console.log("分享失败！")
      }
    }
    return shareObj;
  }

})