var formatMakettime = function (dataString) {
    return (new Date(dataString).toString().split(' ', 4).slice(1, 4).join(' '));
}

var filterContent = function (string) {
    return string.replace(/[\r\n]/g, "").replace(/<.*?>/g, "\n");
}

module.exports = {
    formatMakettime,
    filterContent
}