// pages/history/history.js
Page({
  data:{
    dateList: [
      "2017-04",
      "2017-03",
      "2017-02",
      "2017-01",
      "2016-12",
      "2016-11",
      "2016-10",
      "2016-09",
      "2016-08",
      "2016-07",
      "2016-06"
    ]
  },
  // 页面加载
  onLoad:function(options){
    
  },

  // 点击月份跳转内容
  viewMonthlyTap: function(event) {
    var date = event.currentTarget.dataset.date;
    var year = date.split('-')[0];
    var month = date.split('-')[1];

    wx.navigateTo({
      url: '../home/monthly/monthly?year='+ year + '&month=' + month
    });
  }

})