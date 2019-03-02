const got = require('got');
const cheerio = require('cheerio');

//args[] = stats to return
//only get chosen stats (exec()?)
const getList = ($, listSelector) => {
    const listLength = $('.layout_3col_right').find(listSelector).length;
    if (listLength !== 0) {
        let temp = [];
        for (let i = 0; i < listLength; i++) {
            temp.push([
                $('.layout_3col_right').find(listSelector).find('.UserCredential').eq(i).text(),
                $('.layout_3col_right').find(listSelector).find('.detail_text').eq(i).text()
            ]);
        }
        return temp;
    } else {
        return null;
    }
};

const convertSuffix = viewPhrase => {
	let suffixedViews = viewPhrase.split(" ")[0];
	let l = suffixedViews.length;
	return parseFloat(suffixedViews.substring(0,l)) * (suffix => {
		switch(suffix) {
			case "k": return 1000; break;
			case "m": return 1000000; break;
			case "b": return 1000000000; break;
			default: return 1; break;
		}
	})(suffixedViews.charAt(l-1));
};

const getStat = {
    'name': ($) => {
        return $('.user').eq(0).text() || null;
    },
    'anonymous': ($) => {
        return $('.anon_user').length !== 0;
    },
    'verified': ($) => {
        return $('.VerificationBadge').length !== 0;
    },
    'profilePicture': ($) => {
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
    'workCredential': ($) => {//array of jobs
        return getList($, '.WorkCredentialListItem') || null;
    },
    'studyCredential': ($) => { //array of studies
        return getList($, '.SchoolCredentialListItem') || null;
    },
    'locationCredential': ($) => {
        return getList($, '.LocationCredentialListItem') || null;
    },
    'totalViews': ($) => {
        return convertSuffix($('.AnswerViewsAboutListItem').find('.main_text').text()) || null;
    },
    'monthlyViews': ($) => {
        return convertSuffix($('.AnswerViewsAboutListItem').find('.detail_text').text()) || null;
    },//TODO convert views to int
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

//Returns information of a Quora user from profile URL
//@required String profileUrl URL of Quora profile to scrape, including endpoint and protocol (eg https://quora.com/profile/Thomas-Plant-1)
//@optional Array targetStats statistics to be calculated and returned, see documentation. All stats will be returned if no targets are given
//@returns Object
//  String name
//  Boolean anonymous
function stats(profileUrl, targetStats) {

	//Verify profileUrl
	if (typeof profileUrl !== 'string' || !/^https:\/\/www\.quora\.com\/profile\/(?:[A-Za-z]+-)+[A-Za-z]+(?:-[0-9]+)?(?:\/answers\\?sort=(?:recency|views))?$/.test(profileUrl)) {
		Promise.reject(new Error("Invalid URL: requires complete URL as string."));
	}

	//Target all stats if provided with invalid targets
	if (!Array.isArray(targetStats) || targetStats.every(targetStat => {
		return targetStat in targetStats;
	})) {
		targetStats = Object.keys(getStat);
	}

	return got(profileUrl).then(res => {
		if (res.statusCode === 200) {
			console.log("Profile load successful.");
		} else {
			return Promise.reject("Request failed server-side: " + res.statusMessage);
		}

		try {
			let $ = cheerio.load(res.body);
			//This is supposed to run cheerio queries asynchronously, can't tell if it actually does though
			let tempObject = {};
			return Promise.all(targetStats.map(async targetStat => {
				tempObject[`${targetStat}`] = getStat[targetStat]($);
			})).then(() => tempObject);
		} catch(err) {
			console.error(err);
			return Promise.reject("HTML parsing failed.")
		}
	}).catch(err => {
		return Promise.reject(new Error("Request failed client-side: " + err));
	})
}

//Indirect call to allow in-file testing
module.exports = stats;