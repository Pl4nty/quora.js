const util = require('./util.js');

/**
 * Finds all valid credential pairs in a category
 * @param {CheerioInstance} $ - Cheerio instance with a profile page loaded
 * @param {String} listSelector - credential category's CSS selector
 * @returns {Array} 2D array of [credential,value] arrays
 */
const getCredentialPairs = ($, listSelector) => {
    const list = $('.layout_3col_right').find(listSelector);
    if (list.length !== 0) {
        let temp = [];
        for (let i = 0; i < list.length; i++) {
            temp.push([
                list.find('.UserCredential').eq(i).text(),
                list.find('.detail_text').eq(i).text()
            ]);
        }
        return temp;
    } else {
        return null;
    }
};

/**
 * @typedef {Object} profileStats
 * 
 * Basic profile data
 * @property {String} name - human-readable name
 * @property {Boolean} anonymous - eg banned
 * @property {Boolean} verified
 * @property {String} icon - URL
 * @property {String} defaultCredential

 * 
 * Stats
 * @property {Number} answers
 * @property {Number} questions
 * @property {Number} posts
 * @property {Number} blogs
 * @property {Number} followers
 * @property {Number} following
 * @property {Number} topics
 * @property {Number} totalViews
 * @property {Number} monthlyViews
 * 
 * Credentials by type
 * @property {String[]} workCredential
 * @property {String[]} studyCredential
 * @property {String[]} locationCredential

 * Years awarded
 * @property {Number[]} topWriter
 * @property {Number[]} topAsker
 * 
 * Years and months awarded
 * @property {Number[]} sessionHost
 * 
 * Publishers
 * @property {String[]} published
 * 
 * Dates awarded
 * @property {Number[]} knowledgePrize
 *
 */

 /**
  * @param {profileStats} profileStats
  */
const profileStats = {
    'name': ($) => {
        return $('.user').eq(0).text() || null;
    },
    'anonymous': ($) => {
        return $('.anon_user').length !== 0;
    },
    'verified': ($) => {
        return $('.VerificationBadge').length !== 0;
    },
    'icon': ($) => {
        return $('.profile_photo_img').eq(0).attr('src') || null;
    },
    'defaultCredential': ($) => {
        return $('.UserCredential').eq(0).text() || null;
    },
	/* Not visible to anonymous users
	'spaces': ($) => {
		return $('.AnswersNavItem').find('.list_count').text() || null;
	},*/
    'answers': ($) => {
        return $('.AnswersNavItem').find('.list_count').text() || null;
    },
    'questions': ($) => {
        return $('.QuestionsNavItem').find('.list_count').text() || null;
    },
	/* Not visible to anonymous users
	'shares:': ($) => {
		return $('.QuestionsNavItem').find('.list_count').text() || null;
	},*/
    'posts': ($) => {
        return $('.PostsNavItem').find('.list_count').text() || null;
    },
    'blogs': ($) => {
        return $('.BlogsNavItem').find('.list_count').text() || null;
    },
    'followers': ($) => {
        return $('.FollowersNavItem').find('.list_count').text() || null;
    },//TODO remove commas from all stats
    'following': ($) => {
        return $('.FollowingNavItem').find('.list_count').text() || null;
    },
    'topics': ($) => {
        return $('.TopicsNavItem').find('.list_count').text() || null;
    },
    /* Removed from UI, but may come back
    'edits': ($) => {
        return $('.OperationsNavItem').find('.list_count').text() || null;
    },*/
    'totalViews': ($) => {
        return util.suffixedNumToInt($('.AnswerViewsAboutListItem').find('.main_text').text().split(' ')[0]) || null;
    },
    'monthlyViews': ($) => {
        return util.suffixedNumToInt($('.AnswerViewsAboutListItem').find('.detail_text').text().split(' ')[0]) || null;
    },//TODO convert views to int
    'workCredential': ($) => {
        return getStatList($, '.WorkCredentialListItem') || null;
    },
    'studyCredential': ($) => {
        return getStatList($, '.SchoolCredentialListItem') || null;
    },
    'locationCredential': ($) => {
        return getStatList($, '.LocationCredentialListItem') || null;
    },
    'topWriter': ($) => {
        return $('.TopWriterAboutListItem').find('.detail_text').text().replace(/\D/g,'').match(/.{1,4}/g) || false;
    },
	'topAsker': ($) => {
		return $('.TopAskerAboutListItem').find('.detail_text').text().replace(/\D/g,'').match(/.{1,4}/g) || false;
	},
    'sessionHost': ($) => {
        return "Feature under construction."
    },
    'published': ($) => {
        return "Feature under construction."
    },
    'knowledgePrize': ($) => {
        return $('.datetime').text() || false;
    }
};

//Indirect call to allow in-file testing
module.exports = profileStats;