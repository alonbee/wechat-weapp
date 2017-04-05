// pages/home/home.js
var volsData = require('../../data/vols-data.js');
var formatDate = require("../../util/util.js").formatDate;

Page({
  data: {
   current: 0,
   blessing: '有一个开心的一天'
  },
  onLoad:function(options){
    var date = new Date();
    var time = formatDate(date);

    var hour = date.getHours();
    var good = '';

    if (hour < 12 && hour > 6) {
      good = '早安';
    } else if (hour >= 12 && hour <= 18) {
      good = '午安';
    } else if (hour > 18 && hour <= 24) {
      good = '晚安';
    } else {
      good = '该睡觉了';
    }

    var volList = volsData.volList;
    var vols = [];

    volList.forEach(function (item) {
      if (item.date === time) {
        vols.push(item)
      }
    });

    this.setData({
      time: time,
      good: good,
      vols: vols
    });

  },
  changeHandle: function(event) {
    console.log(1);
  },
  isFavorite: function(event) {
    var id = event.currentTarget.id
    var vols = this.data.vols;
    vols[id].isFavorite = !vols[id].isFavorite;
    console.log(vols);
  }
})