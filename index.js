'use strict';

//Requirements
const profile = require('./scrape/profile.js');

module.exports = {
	profile: profile
};

/*'index' has been replaced with 'quora' in some spots...

//Returns first space-separated substring
const getAmount = string => {
	return string.substring(0, string.indexOf(' '));
}

//Takes a jquery DOM object, eq(index) to start at, and object to modify
const getMaxValues = (jqueryArgument, startquora, method, responseObject, propertyName) => {
	const questionName = jqueryObject[eq(parseInt(startquora))][method];
    if (questionName !== '') {
        responseObject[propertyName + startquora] = questionName;
        getMaxValues(jqueryArgument, startquora, responseObject);
	} else {return responseObject}
}

//Client-side error handler TODO - add specific error handling: timed out, bad gateway etc
const clientErr = err => {
    if (err) {
        err.message = "URL request failed client-side. " + err;
    }
    return err;
}


//Return error if user tries quora-api()
const quora = module.exports = () => {return new Error("Directly calling quora-api is not supported. Please use its methods instead.")};

import "./scrape/"

/*
Returns the full contents of a Quora profile's biography, or null if no biography or invalid profile link. TODO add profileUrl verification
@param {string} profileUrl Complete URL of a Quora profile eg https://www.quora.com/profile/Adam-DAngelo
 /
quora.profile.biography = profileUrl => {
    return cp.execSync('phantomjs ../intercept-xhr/biography.js ' + profileUrl, (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        return stdout;
    }).toString('ascii');
};


//Returns basic user statistics (# ofs) from profile URL
quora.profile.stats = profileUrl => {
    if (typeof profileUrl !== 'string') {
        return promise.reject(new Error("Invalid URL: requires complete URL as string."));
    }

	return got(profileUrl).then(res => {
        if (res.statusCode === 200) {
            console.log("URL request successful.");
        } else {
            return promise.reject(new Error("URL request failed server-side: " + res.statusMessage));
        }

        const $ = cheerio.load(res.body);

        var output = {};

        const username = $('.ProfileNameAndSig').find('.user').text();
        if (username !== '') {
            console.log("Valid profile URL for " + username + ".");
        } else if ($('.ProfileNameAndSig').find('.user').is(':visible')) {
            output.anonymous = true;
            output.name = "Quora User";
            output.job = null;

            return promise.reject(new Error("Invalid profile URL."));
        }

        return {
            totalAnswerViews: $('.AnswerViewsAboutListItem').find('.main_text').text() || null,
            monthlyAnswerViews: $('.AnswerViewsAboutListItem').find('.detail_text').text() || null,
            publicAnswers: $('.AnswersNavItem').find('.list_count').text() || null,
            questions: $('.QuestionsNavItem').find('.list_count').text() || null,
            posts: $('.PostsNavItem').find('.list_count').text() || null,
            blogs: $('.BlogsNavItem').find('.list_count').text() || null,
            followers: $('.FollowersNavItem').find('.list_count').text() || null,
            following: $('.FollowingNavItem').find('.list_count').text() || null,
            topics: $('.TopicsNavItem').find('.list_count').text() || null,
            edits: $('.OperationsNavItem').find('.list_count').text() || null,
		}
	}).catch(err => {
        return clientErr(err);
	})
}

//Returns up to 5 answer categories a user 'Knows About' from profile URL
quora.profile.knowsAbout = profileUrl => {
    if (typeof profileUrl !== 'string') {
        return promise.reject(new Error("Invalid URL: requires complete URL as string."));
    }

    return got(profileUrl).then(res => {
        if (res.statusCode === 200) {
            console.log("URL request successful.");
        } else {
            return promise.reject(new Error("URL request failed server-side: " + res.statusMessage));
        }

        const $ = cheerio.load(res.body);

        const username = $('.ProfileNameAndSig').find('.user').text();
        if (username !== '') {
            console.log("Valid profile URL for " + username + ".");
        } else {
            return promise.reject(new Error("Invalid profile URL."));
        }

        return {
            knowsAbout1: $('.ProfileExperienceItem').find('.TopicName').eq(0).text() || null,
            answers1: getAmount($('.ProfileExperienceItem').find('.answer_link').eq(0).text()) || null,
            knowsAbout2: $('.ProfileExperienceItem').find('.TopicName').eq(1).text() || null,
            answers2: getAmount($('.ProfileExperienceItem').find('.answer_link').eq(1).text()) || null,
            knowsAbout3: $('.ProfileExperienceItem').find('.TopicName').eq(2).text() || null,
            answers3: getAmount($('.ProfileExperienceItem').find('.answer_link').eq(2).text()) || null,
            knowsAbout4: $('.ProfileExperienceItem').find('.TopicName').eq(3).text() || null,
            answers4: getAmount($('.ProfileExperienceItem').find('.answer_link').eq(3).text()) || null,
            knowsAbout5: $('.ProfileExperienceItem').find('.TopicName').eq(4).text() || null,
            answers5: getAmount($('.ProfileExperienceItem').find('.answer_link').eq(4).text()) || null
        }
    }).catch(err => {
        return clientErr(err);
    });
}

//Returns a question's name and its top 3 answers by upvotes from question URL
quora.question = questionUrl => {
    if (typeof questionUrl !== 'string') {
        return promise.reject(new Error("Invalid URL: requires complete URL as string."));
    }

    return got(questionUrl).then(res => {
        if (res.statusCode === 200) {
            console.log("URL request successful.");
        } else {
            return promise.reject(new Error("URL request failed server-side: " + res.statusMessage));
        }

        const $ = cheerio.load(res.body);

        const questionName = $('.QuestionArea').find('.rendered_qtext').text();
        if (questionName !== '') {
            console.log("Valid question URL for \'" + questionName + "\'.");
        } else {
            return promise.reject(new Error("Invalid answer URL."));
        }

		var responseObject = {
            question: $('.QuestionArea').find('.rendered_qtext').text() || null,
            answerCount: getAmount($('.answer_count').text()),
		}

		getMaxValues($('.AnswerBase').find('.ui_qtext_rendered_qtext'), 0, html(), responseObject);
    	getMaxValues($('.AnswerBase').find('.user'), 0, text(), responseObject);
        return responseObject;
    }).catch(err => {
        return clientErr(err);
    })
}

// fetches answer, answered by a user
quora.answer = answerUrl => {
    if (typeof answerUrl !== 'string') {
        return promise.reject(new Error("Invalid URL: requires complete URL as string."));
    }

	return got(answerUrl).then(res => {
        if (res.statusCode === 200) {
        	console.log("URL request successful.");
    	} else {
        	return promise.reject(new Error("URL request failed server-side: " + res.statusMessage));
    	}

    	const $ = cheerio.load(res.body);

    	const questionName = $('.question_text').find('.rendered_qtext').text();
    	if (questionName !== '') {
        	console.log("Valid question URL for \'" + questionName + "\'.");
    	} else {
        	return promise.reject(new Error("Invalid answer URL."));
    	}

    	var answered = $('.answer_permalink').text();
    	answered = answered.substring(answered.quoraOf(' ') + 1, answered.lastquoraOf(' '))

		return {
    		question: $('.question_text').find('.rendered_qtext').text(),
			answer: $('.AnswerPageAnswer').find('.ui_qtext_rendered_qtext').text() || null,
			views: $('.AnswerFooter').find('.meta_num').text() || null,
			upvotes: getAmount($('.AnswerFooter').find('.AnswerVoterListModalLink').eq(0).text()) || null,
			answered: answered || null
		}
	}).catch(err => {
        return clientErr(err);
	})
}

// User's activities
// Recent activities - max 5
quora.activity = profileActivityUrl => {
	if (typeof profileActivityUrl !== 'string') {
        return promise.reject(new Error("Invalid URL: requires complete URL as string."));
	}

	return got(profileActivityUrl).then(res => {
        if (res.statusCode === 200) {
        	console.log("URL request successful.");
    	} else {
        	return promise.reject(new Error("URL request failed server-side: " + res.statusMessage));
    	}

    	const $ = cheerio.load(res.body);

		const username = $('.ProfileNameAndSig').find('.user').text();
		if (username !== '') {
			console.log("Valid profile URL for " + username);
		} else {
			return promise.reject(new Error("Invalid profile URL."));
		}

    	var responseObject = {};
    	getMaxValues($('.feed_item .question_link, .feed_item .BoardItemTitle'), 0, responseObject, 'question');
    	getMaxValues($('.EventHeader, .ContentReason, .inline_suggestions_reason'), 0, responseObject, 'action');
    	return responseObject;
	}).catch(err => {
        return clientErr(err);
	})
}

// recently asked questions - max 5
quora.activity.asked = profileAskedUrl => {
    if (typeof profileAskedUrl !== 'string') {
        return promise.reject(new Error("Invalid URL: requires complete URL as string."));
    }

	return got(profileAskedUrl).then(res => {
        if (res.statusCode === 200) {
			console.log("URL request successful.");
		} else {
			return promise.reject(new Error("URL request failed server-side: " + res.statusMessage));
		}

		const $ = cheerio.load(res.body);

		const username = $('.ProfileNameAndSig').find('.user').text();
		if (username !== '') {
			console.log("Valid profile URL for " + username);
		} else {
			return promise.reject(new Error("Invalid profile URL."));
		}

		var responseObject = {};
		getMaxValues($('.feed_item .question_link, .feed_item .BoardItemTitle'), 0, responseObject);
		return responseObject;
	}).catch(err => {
        return clientErr(err);
	})
}

// recently answered questions - max 5
quora.activity.answered = profileAnsweredUrl => {
    if (typeof profileAnsweredUrl !== 'string') {
        return promise.reject(new Error("Invalid URL: requires complete URL as string."));
    }

	return got(url).then(res => {
        if (res.statusCode === 200) {
			console.log("URL request successful.");
		} else {
			return promise.reject(new Error("URL request failed server-side: " + res.statusMessage));
		}

		const $ = cheerio.load(res.body);

		const username = $('.ProfileNameAndSig').find('.user').text();
		if (username !== '') {
			console.log("Valid profile URL for " + username);
		} else {
			return promise.reject(new Error("Invalid profile URL."));
		}

		return {
			question0: $('.feed_item .question_link, .feed_item .BoardItemTitle').eq(0).text() || null,
			details0: $('.CredibilitySection, .CredibilityFacts').eq(0).text() || null,
			question1: $('.feed_item .question_link, .feed_item .BoardItemTitle').eq(1).text() || null,
			details1: $('.CredibilitySection, .CredibilityFacts').eq(1).text() || null,
			question2: $('.feed_item .question_link, .feed_item .BoardItemTitle').eq(2).text() || null,
			details2: $('.CredibilitySection, .CredibilityFacts').eq(2).text() || null,
			question3: $('.feed_item .question_link, .feed_item .BoardItemTitle').eq(3).text() || null,
			details3: $('.CredibilitySection, .CredibilityFacts').eq(3).text() || null,
			question4: $('.feed_item .question_link, .feed_item .BoardItemTitle').eq(4).text() || null,
			details4: $('.CredibilitySection, .CredibilityFacts').eq(4).text() || null
		};
	}).catch(err => {
        return clientErr(err);
	})
}

// dicing basic information into smaller single functions
// get only profile picture's link
quora.profileImage = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			profilePicture: $('.profile_photo_img').attr('data-src') || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	});
};

// get only initial description of a user
quora.bio = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}



	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			biography: $('.ProfileNameAndSig .IdentitySig').eq(0).text() || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	});
};

// complete biography of a  quora user
quora.fullBio = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}



	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			fullBio: $('.ExpandedUserBio').text() || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	});
};

// fetch total public answer (count)
quora.publicAnswers = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			publicAnswers: $('.list_count').eq(0).text() || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	});
};

// total public question asked by a user
quora.questions = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			questions: $('.list_count').eq(1).text() || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	});
};

// total blog posts made by user
quora.posts = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			posts: $('.list_count').eq(2).text() || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	});
};

// total followers count
quora.followers = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			followers: $('.list_count').eq(3).text() || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	});
};

// total following
quora.following = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			following: $('.list_count').eq(4).text() || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	});
};

// total edits made
quora.edits = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			edits: $('.list_count').eq(5).text() || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	});
};

// total answer views generated in a month
quora.monthlyViews = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			monthlyViews: $('.total_count').eq(0).text() || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	});
};

// all time views on user's answer
quora.totalViews = url => {
	if (typeof url !== 'string') {
		return promise.reject(new Error('username required'));
	}

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		return {
			totalViews: $('.total_count').eq(1).text() || null
		};
	}).catch(err => {
		if (err) {
			err.message = 'Something went wrong!';
		}
		return err;
	})
}
*/