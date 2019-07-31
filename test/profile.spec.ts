import 'mocha'
import { expect } from 'chai'
import Profile from '../src/models/profile'
import { promises } from 'fs'

const testUris = [
    'Thomas-Plant-1'
];

testUris.forEach(uri => {
    describe(`Profile ${uri}`, () => {
        let liveProfile: Profile;
        let staticFields: {
            name: string,
            anonymous: boolean,
            verified: boolean,
            iconUrl: string,
            defaultCredential: string,
            answers: number
        };

        before("populate live test data", async() => {
            liveProfile = new Profile(uri);
            let json: string;
            await Promise.all([
                liveProfile.load(),
                json = await promises.readFile(`./test/cache/${uri}.json`, 'utf8')
            ]).then(() => {
                staticFields = JSON.parse(json)
            })
        })

        it("matches expected name and anon/verified status", () => {
            expect(liveProfile.name()).to.not.be.empty;
            expect(liveProfile.name()).to.equal(staticFields.name)
            expect(liveProfile.anonymous()).to.equal(staticFields.anonymous);
            expect(liveProfile.verified()).to.equal(staticFields.verified);
        })

        it("has a profile picture", () => {
            expect(liveProfile.name()).to.not.be.empty;
        })

        it("could have a default credential", () => {
            expect(liveProfile.iconUrl()).to.be.a('string');
        })

        it("has numeric stats", () => {
            expect(liveProfile.answers()).to.be.a('number');
            expect(liveProfile.questions()).to.be.a('number');
            expect(liveProfile.posts()).to.be.a('number');
            expect(liveProfile.blogs()).to.be.a('number');
            expect(liveProfile.followers()).to.be.a('number');
            expect(liveProfile.following()).to.be.a('number');
            expect(liveProfile.topics()).to.be.a('number');
        })
    })
})