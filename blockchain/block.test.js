const { keccakhash } = require('../util');
const Block = require('./block');

describe('Block', () => {
    describe('calaculateBlockTargetHash()', () => {
        it('calculates the maximum hash when the last block difficulty is 1', () => {
            expect(
                Block
                    .calaculateBlockTargetHash({ lastBlock: { blockHeaders: { difficulty: 1 } } } )
            ) .toEqual('f'.repeat(64))
        });

        it('calculates a low hash value when the last block difficulty is high', () => {
            expect(Block
                .calaculateBlockTargetHash({ lastBlock: { blockHeaders: { difficulty: 500 } } }) < '1')
                .toBe(true)
        });
    });

    describe('mineblock()', () => {
        let lastBlock, minedBlock;
        beforeEach(() => {
            lastBlock = Block.genesis();
            minedBlock = Block.mineBlock({ lastBlock, beneficiary: 'beneficiary' });
        })
        it('mines a block', () => {
            expect(
                minedBlock
            ).toBeInstanceOf(Block)
        });
        it('mines a block that meets the proof of work requirement', () => {
            const target = Block.calaculateBlockTargetHash({ lastBlock });
            const { blockHeaders } = minedBlock;
            const { nonce } = blockHeaders;
            const truncatedBlockheaders = { ...blockHeaders };
            delete truncatedBlockheaders.nonce;
            const header = keccakhash(truncatedBlockheaders);
            underTargetHash = keccakhash(header + nonce);
            expect(
                underTargetHash < target
            ).toBe(true)
        });
    });

    describe('adjustDifficulty()', () => {
        it('keeps the difficulty above 0', () => {
            expect(
                Block.adjustDifficulty({
                    lastBlock: { blockHeaders: { difficulty: 0 } },
                    timestamp: Date.now()
                })
            ).toEqual(1);
        });

        it('increases the difficulty for quickly mined block', () => {
            expect(
                Block.adjustDifficulty({
                    lastBlock: { blockHeaders: { difficulty: 5, timestamp: 3000 } },
                    timestamp: 3000
                })
            ).toEqual(6);
        });

        it('decrease the difficulty for slowly mined block', () => {
            expect(
                Block.adjustDifficulty({
                    lastBlock: { blockHeaders: { difficulty: 5, timestamp: 1000 } },
                    timestamp: 20000
                })
            ).toEqual(4);
        });
    });
    
});