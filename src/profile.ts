const util = require('./util.js');

/**
 * profile.ts defines possible scraped stats extremely granularly to minimise unnecessary DOM parsing
 * could possibly redesign if I can figure out how to run performance tests
 */

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

class Page {
    readonly uri: string;
    protected $: CheerioStatic;

    public lastRefreshed: Date;
    
    constructor (uri: string) {
        this.uri = uri;
        this.refresh();
    }

    public refresh() {
        //implement getting page, parsing into cheerio (this.$) and error handling
        got(this.uri)
        
        this.$ = cheerio.load("test");

        this.lastRefreshed = new Date();
    }
}

class Profile extends Page {
    static uriScheme = /^test/

    constructor (uri: string) {
        super(uri)
    }

    // Meta properties
    name = (): string => super.$('.user').eq(0).text();
    anonymous = (): boolean => super.$('.anon_user').length !== 0;
    verified = (): boolean => super.$('.VerificationBadge').length !== 0;
    icon = (): string => super.$('.profile_photo_img').eq(0).attr('src');
    defaultCredential = (): string => super.$('.UserCredential').eq(0).text();

    // TODO remove commas from all numberic stats
    // TODO add tests, especially for credentials and arrays. So many edge cases!
    

	// Not visible to anonymous users
    // spaces = (): number => parseInt(super.$('.AnswersNavItem').find('.list_count').text()))
    // Not visible to anonymous users
    // shares = (): number => parseInt(super.$('.QuestionsNavItem').find('.list_count').text())
    // Removed from UI, but may come back
    // edits: (): number => parseInt(super.$('.OperationsNavItem').find('.list_count').text())  
    
    // Numeric stats
    answers = (): number => parseInt(super.$('.AnswersNavItem').find('.list_count').text())
    questions = (): number => parseInt(super.$('.QuestionsNavItem').find('.list_count').text())
    posts = (): number => parseInt(super.$('.PostsNavItem').find('.list_count').text())
    blogs = (): number => parseInt(super.$('.BlogsNavItem').find('.list_count').text())
    followers = (): number => parseInt(super.$('.FollowersNavItem').find('.list_count').text())
    following = (): number => parseInt(super.$('.FollowingNavItem').find('.list_count').text())
    topics = (): number => parseInt(super.$('.TopicsNavItem').find('.list_count').text())
    totalViews = (): number => parseInt(util.suffixedNumToInt(super.$('.AnswerViewsAboutListItem').find('.main_text').text().split(' ')[0]))
    monthlyViews = (): number => parseInt(util.suffixedNumToInt(super.$('.AnswerViewsAboutListItem').find('.detail_text').text().split(' ')[0]))

    // Category credentials
    workCredential = (): number => parseInt(super.getStatList(super.$, '.WorkCredentialListItem'))
    studyCredential = (): number => parseInt(super.getStatList(super.$, '.SchoolCredentialListItem'))
    locationCredential = (): number => parseInt(super.getStatList($, '.LocationCredentialListItem'))

    // Award stats
    // TODO convert string[] years to numbers
    topWriter = (): Array<string> => super.$('.TopWriterAboutListItem').find('.detail_text').text().replace(/\D/g,'').match(/.{1,4}/g)
    topAsker = (): Array<string> => super.$('.TopAskerAboutListItem').find('.detail_text').text().replace(/\D/g,'').match(/.{1,4}/g)
    // TODO finish these:
    // sessionHost = (): Array<string> => 
    // published = (): Array<string> => 
    // knowledgePrize = (): number => parseInt(super.$('.datetime').text())
}