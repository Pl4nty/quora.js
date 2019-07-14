describe('name', async () => {
    const name = await space['name']($);
    it('should return a human name', () => {
        expect(name).to.be.a('string')
        expect(name).to.match(!/^[a-zA-Z ]+$/)
    })
})