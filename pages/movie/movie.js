// pages/movie/movie.js
let api = require('../../api/api.js');
let util = require('../../util/util.js');

Page({
  data:{
    movies: []
  },
  onLoad:function (options) {
    api.getMovieList({
      success: (res) => {
        if (res.data.res === 0) {
          let movieList = res.data.data;
          let movieIds = [];
          movieList.forEach((item) => {
            movieIds.push(item.id);
          });
          this.getMovieStory(movieIds);
        }
      }
    });
  },
  getMovieStory: function (ids) {
    let movies = this.data.movies;

    if (ids.length > 0) {
      api.getMovieStoryById({
        query: {
          id: ids.shift()
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
                  movie.input_date = util.formatHpsTitle(movie.input_date);
                  movies.push(movie);
                  this.getMovieStory(ids);
                }
              }
            });
          }
        }
      });
    } else {
      this.setData({ movies });
    }
  },
  viewMusicDetail: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/detail?id=' + id
    });
  }
})