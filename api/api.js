var perfix = "http://v3.wufazhuce.com:8000/api/";

var wxRequest = function (params, url) {
    wx.showLoading({
        title: "Loading...",
    });

    wx.request({
        url: url,
        data: params.data || '',
        header: {
            'content-type': 'application/json'
        },
        method: params.method || 'GET',
        success: function (res) {
            params.success && params.success(res);
            wx.hideLoading();
        },
        fail: function (res) {

        },
        complete: function (res) {

        }
    });
}

// home
var getVolById = function (params) {
    wxRequest(params, perfix + 'hp/detail/' + params.query.id);
}

var getVolIdList = function (params) {
    wxRequest(params, perfix + 'hp/idlist/0');
}

var getVolsByDate = function (params) {
    wxRequest(params, perfix + 'hp/bymonth/' + params.query.date);
}

var getVolDetailById = function (params) {
    wxRequest(params, perfix + 'hp/detail/' + params.query.id);
}

// read
var getCarouselList = function (params) {
    wxRequest(params, perfix + 'reading/carousel');
}

var getCarouselDetailById = function (params) {
    wxRequest(params, perfix + 'reading/carousel/' + params.query.id);
}

var getLastArticles = function (params) {
    wxRequest(params, perfix + 'reading/index');
}

var getEssayById = function (params) {
    wxRequest(params, perfix + 'essay/' + params.query.id);
}

var getSerialById = function (params) {
    wxRequest(params, perfix + 'serialcontent/' + params.query.id);
}

var getQuestionById = function (params) {
    wxRequest(params, perfix + 'question/' + params.query.id);
}

module.exports = {
    getVolById,
    getVolIdList,
    getVolsByDate,
    getVolDetailById,
    getCarouselList,
    getCarouselDetailById,
    getLastArticles,
    getEssayById,
    getSerialById,
    getQuestionById
}