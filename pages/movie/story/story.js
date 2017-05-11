// pages/movie/detail/detail.js
let api = require('../../../api/api.js');
let util = require('../../../util/util.js');

Page({
  data:{
    movie: {},
    comments: [],
    current: 0,
    followed: false,
    showUser: false
  },
  onLoad: function (options) {
    if (options.user_id !== '0') {
      let showUser = true;
      this.setData({ showUser });
    }

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
    
    let usersFollowed = wx.getStorageSync('users_is_followed');
    let userId = options.user_id;
    console.log(userId);
    if (usersFollowed) {
      let userFollowed = usersFollowed[userId];
      if (!userFollowed) {
        usersFollowed[userId] = false;
        wx.setStorageSync('users_is_followed', usersFollowed);
      }
      this.setData({
        followed: userFollowed
      });
    } else {
      let usersFollowed = {};
      usersFollowed[userId] = false;
      wx.setStorageSync('users_is_followed', usersFollowed);
    }

  },
  viewMovieDetailTap: function () {
    let id = this.data.movie.movie_id;

    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },
  // 监听滑块的index
  handleChange: function (event) {
    let current = event.detail.current;
    this.setData({ current });
  }
})