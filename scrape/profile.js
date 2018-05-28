const got = require('got');
const cheerio = require('cheerio');

//Returns information of a Quora user from profile URL
const profile = module.exports = profileUrl => {
    if (typeof profileUrl !== 'string') {
        return promise.reject(new Error("Invalid URL: requires complete URL as string."));
    }

    got(profileUrl).then(res => {
        if (res.statusCode === 200) {
            console.log("URL request successful.");
        }
        else {
            return promise.reject(new Error("Request failed server-side: " + res.statusMessage));
        }

        let $ = cheerio.load(res.body);
        let document = (new JSDOM(res.body, { runScripts: 'dangerously', pretendToBeVisual: true })).window.document;
        let more = document.getElementsByClassName('UserDescriptionExpandable').item(1).getElementsByClassName('ui_qtext_more_link');
        simulant.fire(more,'click');

        return {
            anonymous: $('.anon_user').length !== 0,
            verified: $('ProfilePhoto').find('.VerificationBadge').length !== 0,
            name: $('.user').eq(0).val(),
            defaultCredential: $('.UserCredential').eq(0).val() || null,
            profilePicture: $('.profile_photo_img').eq(0).attr('src'),
        }
    }).catch(err => {
        return promise.reject(new Error("Request failed client-side: " + res.statusMessage));
    })
}

//Returns user credentials (user-made and assigned) from profile URL
quora.profile.credentials = profileUrl => {
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
            console.log("Valid profile URL for " + username);
        } else {
            return promise.reject(new Error("Invalid profile URL."));
        }

        return {
            workCredential: $('.WorkCredentialListItem').find('.IdentityCredential').text() || null,
            workTime: $('.WorkCredentialListItem').find('.detail_text').text() || null,
            studyCredential: $('.SchoolCredentialListItem').find('.IdentityCredential').text() || null,
            studyTime: $('.SchoolCredentialListItem').find('.detail_text').text() || null,
            locationCredential: $('.LocationCredentialListItem').find('.IdentityCredential').text() || null,
            locationTime: $('.LocationCredentialListItem').find('.detail_text').text() || null
        }
    }).catch(err => {
        return clientErr(err);
    });
}