import 'mocha'
import { expect } from 'chai'
import Profile from '../src/models/profile'

// Profile URIs to test
const testUris = [
    'Thomas-Plant-1',
    'Jon-Davis-10'
];

testUris.forEach(uri => {
    describe(uri, () => {
        let liveProfile: Profile;
        
        before("populate live test data", async() => {
            liveProfile = new Profile(uri);
            await liveProfile.load();
        })

        it("could match expected name and anon/verified status", () => {
            const name = liveProfile.name();
            expect(name).to.not.be.empty;
            console.log(`      is ${name}`);
            console.log(`      ${liveProfile.anonymous() ? 'is' : 'isn\'t' } anonymous`);
            console.log(`      ${liveProfile.verified() ? 'is' : 'isn\'t' } verified`);
        })

        it("has a profile picture", () => {
            expect(liveProfile.iconUrl()).to.not.be.empty;
        })

        it("could have a default credential", () => {
            const credential = liveProfile.defaultCredential()
            expect(credential).to.be.a('string');
            console.log(`      has the credential: "${credential}"`)
        })

        // I wish
        it("has answers", () => {
            expect(liveProfile.answers()).to.be.a('number').and.not.NaN;
        })

        it("has questions", () => {
            expect(liveProfile.questions()).to.be.a('number').and.not.NaN;
        })

        it("has followers", () => {
            expect(liveProfile.followers()).to.be.a('number').and.not.NaN;
        })

        it("has following", () => {
            expect(liveProfile.following()).to.be.a('number').and.not.NaN;
        })
    })
})