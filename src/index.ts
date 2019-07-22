/** 
 * Handles core HTTP requests - ratelimiting, error handling and robots.txt compliance
 * Aims to balance high performance and thorough error handling
 */

import got from 'got';
import cheerio from 'cheerio';

const QUORA_BASE_URL = "https://quora.com/"

/**
 * @param uri URI of page to scrape eg Thomas-Plant-1 <- profile
 * @param urlRegex 
 * @param {Array} targetStats - stats to be returned, all stats will be returned if no targets are given
 * @param {Object} availableStats - available stats on the given page
 * @returns profileStats - array of requested stats
 */
function scrape(uri: string, urlRegex: RegExp, targetStats: Array<string>, availableStats: object) {
	//Check URL
	if (typeof url !== 'string' || !urlRegex.test(url)) {
		Promise.reject(new Error("Invalid URL: requires complete URL as string."));
	}

	//Target all stats if provided with any invalid targets
	if (!Array.isArray(targetStats) || targetStats.every((targetStat: string) => {
		return targetStat in targetStats;
	})) {
		targetStats = Object.keys(availableStats);
	}

	//Load page
	return got(url).then((res) => {
		//Ensure Quora is alive
		//TODO address edge case statuscodes -> handle quora down, ratelimit, IP ban etc
		if (res.statusCode !== 200) {
			switch(res.statusCode) {
				case 404: return Promise.reject("Page not found - has Quora changed their URIs?");
				case 401: return Promise.reject("Unauthorized - have you been ratelimited?");
				default: return Promise.reject("Request failed server-side: " + res.statusMessage);
			}
		} else {
			console.log("Page load successful");
		}

		//TODO handle individual stat parsing failures as nulls instead of rejecting promise altogether
		try {
			let $ = cheerio.load(res.body);
			//This is supposed to run cheerio queries asynchronously, can't tell if it actually does though
			let tempObject = {};
			return Promise.all(targetStats.map(async targetStat => {
				tempObject[`${targetStat}`] = availableStats[targetStat]($);
			})).then(() => tempObject);
		} catch(err) {
			console.error(err);
			return Promise.reject("HTML parsing failed.")
		}
	}).catch(err => {
		return Promise.reject(new Error("Request failed client-side: " + err));
	})
}
/**
 * Scrape Quora page info with Got
 * @param {scrapeCategory} profile - scrape a profile page's targetStats
 * //TODO add JSDoc link to page category targetStats definition
 * @param {CheerioInstance} $ - Cheerio instance with a profile page loaded
 * @param {String[]} targetStats - stats to be returned, all available stats will be returned if no targets are given
 * @returns {Object} profileStats - map of requested stats with their values70
 */
module.exports = {
	profile: (url,targetStats) => scrape(url,
		/^(?:[A-Za-z]+-)+[A-Za-z]+(?:-[0-9]+)?(?:\/answers\\?sort=(?:recency|views))?$/,
		targetStats, require('./src/profile.js')
	)//,
	//space: require('./scrape/space.js'),
	//question: require('./scrape/question.js'),
	//answer: require('./scrape/answer.js')
};