import got from 'got';
import cheerio from 'cheerio'
const version = require('../../package.json').version;

/**
 * Parent Page class for all models
 */
export default abstract class Page {
    private static quoraEndpoint = process.env.QUORA_ENDPOINT || "https://quora.com";
    private static userAgent = process.env.QUORA_USERAGENT || "quorajs";

    private readonly uri: string;
    private lastRefreshed: Date;

    protected $: CheerioStatic;

    protected abstract urlFragment: string; //abstract to require in child models
    protected static uriScheme: RegExp; //static as must be accessible from constructor
    
    constructor (uri: string) {
        if (uri.match(Page.uriScheme)) {
            this.uri = uri;
        }
    }

    /**
     * Reloads the page body into Cheerio
     */
    public async load(): Promise<void> {
        //console.log(`trying to load ${Page.quoraEndpoint}${this.urlFragment}${this.uri}`)
        //TODO add more detailed error handling based on quora behaviour
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

    getUri = (): string => this.uri
    getLastRefreshed = (): Date => this.lastRefreshed;
}