const { sortCharacters, keccakhash } = require('./index');
describe('util', () => {
    describe('sortCharacters()', () => {
        it('creates the same string for thr objects with same property and value no matter the order', () => {
            expect(sortCharacters({ foo: 'foo', bar: 'bar'}))
                .toEqual(sortCharacters({ bar: 'bar', foo: 'foo' }))
        });

        it('creates a different string for different objects', () => {
            expect(sortCharacters({ foo: 'foo'}))
                .not.toEqual(sortCharacters({ bar: 'bar'}))
        });
    });

    describe('keccakHash()', () => {
        it('produces a keccak256 hash', () => {
            expect(keccakhash('foo')).toEqual('b2a7ad9b4a2ee6d984cc5c2ad81d0c2b2902fa410670aa3f2f4f668a1f80611c');
        });
    });
});