const space = require('../scrape/space.js')
const cheerio = require('cheerio')
const got = require('got')
const expect = require('chai').expect;

let stats = {};

before(() => {
    return got('https://www.quora.com/q/war-elephant').then((res) => {
        let $ = cheerio.load(res.body);
        Promise.all(Object.keys(space).map(async targetStat => {
            stats[`${targetStat}`] = space[targetStat]($);
        }));
    })
})

describe('name', () => {
    it('should return a readable name', () => {
        expect(stats.name).to.be.a('string')
    })
    it('shouldn\'t contain invalid characters', () => {
        expect(stats.name).to.not.contain('/')
    })
})

describe('icon', () => {
    it('should be a string', () => {
        expect(stats.icon).to.be.a('string')
    })
    it('should match the icon URL format', () => {
        expect(stats.icon).to.match(/^https:\/\/qph[a-zA-Z]?\d?.[a-zA-Z\d]{2}.quoracdn.net\/main-thumb-ti-\d{3}-\d{3}-[a-z]+.jpeg$/,'has Quora changed their icon URL scheme?')
    })
})

describe('about', () => {
    it('should be a string')
})

describe('details', () => {
    it('should return a large rich text details section', () => {
        expect(stats.details).to.be.a('string')
    })
})

describe('contributors', () => {
    it('should return an array of contributor profile URIs', () => {
        console.log(stats.contributors)
        expect(stats.contributors).to.be.a('array')
    })
    it('should contain valid profile URI strings', () => {
        expect(stats.contributors[0]).to.be.a('string')
                                     .to.match(/^[\p{L}\p{M}*]+-[\p{L}\p{M}*]+(-[\d]+)?$/u)
    })
})