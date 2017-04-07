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
        success: function(res) {
            params.success && params.success(res);
            wx.hideLoading();
        },
        fail: function(res) {
        
        },
        complete: function(res) {
        
        }
    });
}

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
    wxRequest(params, perfix + 'hp/detail/' + params.query.id)
}

module.exports = {
    getVolById,
    getVolIdList,
    getVolsByDate,
    getVolDetailById
}
