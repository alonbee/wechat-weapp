var formatMakettime = function(dataString) {
    return (new Date(dataString).toString().split(' ', 4).slice(1, 4).join(' '));
}

module.exports = {
    formatMakettime
}