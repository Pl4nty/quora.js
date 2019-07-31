import Page from './page';

/**
 * profile schema definining current and former stats (deprecated ones are commented)
 */

/**
 * Finds all valid credential pairs in a category
 * @param {CheerioInstance} $ - Cheerio instance with a profile page loaded
 * @param {String} listSelector - credential category's CSS selector
 * @returns {Array} 2D array of [credential,value] arrays
 */
/*const getCredentialPairs = ($, listSelector) => {
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
*/
export default class Profile extends Page {
    protected urlFragment = '/profile/'
    static uriScheme = /^(?:[A-Za-z]+-)+[A-Za-z]+(?:-[0-9]+)?$/;

    constructor (uri: string) {
        super(uri)
    }

    getUri = (): string => this.uri

    // Meta properties
    name = (): string => this.$('.user').eq(0).text();
    anonymous = (): boolean => this.$('.anon_user').length !== 0; //eg banned
    verified = (): boolean => this.$('.VerificationBadge').length !== 0;
    iconUrl = (): string => this.$('.profile_photo_img').eq(0).attr('src');
    defaultCredential = (): string => this.$('.UserCredential').eq(0).text();

    // TODO remove commas from all numberic stats
    // TODO add tests, especially for credentials and arrays. So many edge cases!
    

	// Not visible to anonymous users
    // spaces = (): number => parseInt(this.$('.AnswersNavItem').find('.list_count').text()))
    // Not visible to anonymous users
    // shares = (): number => parseInt(this.$('.QuestionsNavItem').find('.list_count').text())
    // Removed from UI, but may come back
    // edits: (): number => parseInt(this.$('.OperationsNavItem').find('.list_count').text())  
    
    // Numeric stats
    answers = (): number => parseInt(this.$('.AnswersNavItem').find('.list_count').text())
    questions = (): number => parseInt(this.$('.QuestionsNavItem').find('.list_count').text())
    posts = (): number => parseInt(this.$('.PostsNavItem').find('.list_count').text())
    blogs = (): number => parseInt(this.$('.BlogsNavItem').find('.list_count').text())
    followers = (): number => parseInt(this.$('.FollowersNavItem').find('.list_count').text())
    following = (): number => parseInt(this.$('.FollowingNavItem').find('.list_count').text())
    topics = (): number => parseInt(this.$('.TopicsNavItem').find('.list_count').text())
    //totalViews = (): number => parseInt(util.suffixedNumToInt(this.$('.AnswerViewsAboutListItem').find('.main_text').text().split(' ')[0]))
   // monthlyViews = (): number => parseInt(util.suffixedNumToInt(this.$('.AnswerViewsAboutListItem').find('.detail_text').text().split(' ')[0]))

    // Category credentials
    //workCredential = (): number => parseInt(getStatList(this.$, '.WorkCredentialListItem'))
    //studyCredential = (): number => parseInt(getStatList(this.$, '.SchoolCredentialListItem'))
    //locationCredential = (): number => parseInt(getStatList(this.$, '.LocationCredentialListItem'))

    // Award dates
    // TODO convert string[] years to numbers
    topWriter = (): Array<string> => this.$('.TopWriterAboutListItem').find('.detail_text').text().replace(/\D/g,'').match(/.{1,4}/g)
    topAsker = (): Array<string> => this.$('.TopAskerAboutListItem').find('.detail_text').text().replace(/\D/g,'').match(/.{1,4}/g)
    // TODO finish these:
    // sessionHost = (): Array<string> => 
    // published = (): Array<string> => 
    // knowledgePrize = (): number => parseInt(this.$('.datetime').text())
}