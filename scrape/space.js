const util = require('./util.js');
const answer = require('./answer.js')

module.exports = {
    name: ($) => $('.ui_content_title').eq(0).text(),
    icon: ($) => $('.TribeIcon').eq(0).attr('src'),
    about: ($) => $('.TribePreview').find('.rendered_qtext').text(),
    details: ($) => $('.TribeRulesInlineEditor').find('.rendered_qtext').text(),
    contributors: ($) => $('.TribePreview').find('.user').map(function(){return $(this).attr('href').substring(9)}).get(),
    /*answers: ($) => $('.TribePostItem').map(function(){
        Promise.all(answer.title($),answer.link($),answer.date($),answer.views($),answer.upvotes($));
    })*/
};