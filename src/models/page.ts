import got from 'got';
import cheerio from 'cheerio'
const version = require('../../package.json').version;

/**
 * Parent Page class for all models
 */
export default abstract class Page {
    static quoraEndpoint = process.env.QUORA_ENDPOINT || "https://quora.com";
    protected abstract urlFragment: string;
    static uriScheme: RegExp;
    static userAgent = process.env.QUORA_USERAGENT || "unspecifiedbot";

    protected readonly uri: string;
    protected $: CheerioStatic;
    private lastRefreshed: Date;
    
    constructor (uri: string) {
        if (uri.match(Page.uriScheme)) {
            this.uri = uri;
        }
    }

    /**
     * Reloads the page body into Cheerio
     */
    public async load(): Promise<void> {
        //console.log(`trying to load ${this.urlFragment}${this.uri}`)
        const res = await got(this.urlFragment + this.uri, {
            baseUrl: Page.quoraEndpoint,
            headers: {
                'user-agent': `${Page.userAgent} quorajs/${version} (https://github.com/pl4nty/quorajs)`
            },
            retry: {
                statusCodes: [408,413,429,500,502,503,504]
            }
        })
        
        this.$ = cheerio.load(res.body);
        this.lastRefreshed = new Date();
    }

    refreshDate = (): Date => this.lastRefreshed;
}