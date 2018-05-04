'use strict';

const got = require('got');
const fs = require('fs');
const cheerio = require('cheerio');


    var $ = cheerio.load(data);
    var something = {content: $('.grid-canvas').find('.ui-widget-content').html()};
    console.log(something.content);
})