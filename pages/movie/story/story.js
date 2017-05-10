// pages/movie/detail/detail.js
let api = require('../../../api/api.js');
let util = require('../../../util/util.js');

Page({
  data:{
    movie: {},
    comments: []
  },
  onLoad: function (options) {
    api.getMovieStoryById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let movie = res.data.data.data[0];
          api.getMovieById({
            query: {
              id: movie.movie_id
            },
            success: (res) => {
              if (res.data.res === 0) {
                let movie_detail = res.data.data;
                movie.movie_detail = movie_detail;
                movie.content = util.filterContent(movie.content);
                this.setData({ movie });
              }
            }
          });
        }
      }
    });

    api.getCommentList({
      query: {
        type: 'movie',
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let comments = res.data.data.data;
          this.setData({ comments });
        }
      }
    });
  },
  viewDetailTap: function () {
    let id = this.data.movie.movie_id;

    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  }
})