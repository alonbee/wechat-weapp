const formatHpMakettime = (dateString) => {
    return dateString.split(' ')[0].replace(/\-/g, '  /  ');
}

const formatHpAuthor = (authorString) => {
    return authorString.split(' ')[0].replace(/\＆/, ' | ');
}

const formatHpContent = (contentString) => {
    return contentString.split(' ')[0];
}

var filterContent = function (string) {
    return string.replace(/[\r\n]/g, "").replace(/<.*?>/g, "\n");
}

module.exports = {
    formatHpMakettime,
    formatHpAuthor,
    formatHpContent,
    filterContent
}