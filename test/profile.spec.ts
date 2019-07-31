import 'mocha'
import { expect } from 'chai'
import Profile from '../src/models/profile'
import { promises } from 'fs'

const testUris = [
    'Thomas-Plant-1',
    'Jon-Davis-10'
];

testUris.forEach(uri => {
    describe(`Profile ${uri}`, () => {
        let liveProfile: Profile;
        let cachedProfile: {
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
                cachedProfile = JSON.parse(json)
            })
        })

        it("has a name", () => {
            expect(liveProfile.name()).to.not.be.empty;
            expect(liveProfile.name()).to.equal(cachedProfile.name)
        })
    
        it("could be anonymous", () => {
            expect(liveProfile.anonymous()).to.equal(cachedProfile.anonymous);
        })

        it("could be verified", () => {
            expect(liveProfile.verified()).to.equal(cachedProfile.verified);
        })

        it("has a profile picture", () => {
            expect(liveProfile.name()).to.not.be.empty;
        })

        it("could have a default credential", () => {
            expect(liveProfile.iconUrl()).to.not.be.empty;
        })

        // I hope so anyway...
        it("has answers", () => {
            expect(liveProfile.answers()).to.be.a('number');
        })

        it("has questions", () => {
            expect(liveProfile.questions()).to.be.a('number');
        })
    })
})