const { GENESIS_DATA, MINE_RATE } = require ('../config');
const { keccakhash } = require('../util');

const HASH_LENGTH = 64;
const MAX_HASH = parseInt('f'.repeat(HASH_LENGTH), 16);
const MAX_NONCE_VALUE = 2 ** 64;

class Block {
    constructor({ blockHeaders }) {
        this.blockHeaders = blockHeaders;
    }

    static calaculateBlockTargetHash({ lastBlock }) {
        const value = (MAX_HASH / lastBlock.blockHeaders.difficulty).toString(16);
        // const value = (MAX_HASH / 5).toString(16);
        
        if (value.length > HASH_LENGTH) {
            return 'f'.repeat(HASH_LENGTH);
        }

        return '0'.repeat(HASH_LENGTH - value.length) + value;
    }

    static adjustDifficulty ({ lastBlock, timestamp}) {
        const { difficulty } = lastBlock.blockHeaders;
        if ((timestamp - lastBlock.blockHeaders.timestamp) > MINE_RATE) {
            return difficulty - 1;
        }

        if (difficulty < 1) {
            return 1;
        }

        return difficulty + 1;
    }

    static mineBlock({ lastBlock, beneficiary }) {
        const target = Block.calaculateBlockTargetHash({ lastBlock });
        let timestamp, truncatedBlockheaders, header, nonce, underTargetHash;
        do {
            timestamp = Date.now();
            truncatedBlockheaders = {
                parentHash: keccakhash(lastBlock.blockHeaders),
                beneficiary,
                difficulty: Block.adjustDifficulty({lastBlock, timestamp}),
                number: lastBlock.blockHeaders.number + 1,
                timestamp
            };
            header = keccakhash(truncatedBlockheaders);
            nonce = Math.floor(Math.random() * MAX_NONCE_VALUE);

            underTargetHash = keccakhash(header + nonce);
        } while (underTargetHash > target);


        // console.log('underTargetHash', underTargetHash);
        // console.log('target', target);
        
        return new this({
            blockHeaders: {
                ...truncatedBlockheaders, nonce
            }
        });
    }

    static genesis() {
        return new this(GENESIS_DATA)
    }
}

module.exports = Block;

// const block = Block.mineBlock({
//     lastBlock: Block.genesis(),
//     beneficiary: 'foo'
// });

// console.log('block', block);