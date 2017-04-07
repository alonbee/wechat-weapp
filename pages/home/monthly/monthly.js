// pages/home/monthly/monthly.js
var api = require('../../../api/api.js');

Page({
  data:{
    monthly: []
  },
  // 页面加载
  onLoad:function(options){
    var that = this;
    var year = options.year;
    var month = options.month;
    var date = year + '-' + month;

    api.getVolsByDate({
      query: {
        date: date
      },
      success: function(res) {
        if (res.data.res === 0) {
          var monthly = res.data.data;
          that.setData({ monthly });
        }
      }
    });
  },
  // 页面初次渲染完成
  onReady:function(){
    
  },
  // 点击跳转卡券详情页
  viewDetailTap: function(event) {
    var volId = event.currentTarget.dataset.volId;
    wx.navigateTo({
      url: '../detail/detail?id=' + volId
    });
  }
})