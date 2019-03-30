const util = require('./util.js');

const space = {
    'name': ($) => {
        return $('.ui_content_title').eq(0).text() || null;
    },
    'icon': ($) => {
        return $('.TribeIcon').eq(0).attr('src') || null;
    },
    'about':
    'details':
    'contributors':
    ''
};

//Indirect call to allow in-file testing
module.exports = space;