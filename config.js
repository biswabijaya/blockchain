const GENESIS_DATA = {
    blockHeaders: {
        parentHash: '--genesis-parent-hash--',
        beneficiary: '--genesis-beneficiary--',
        difficulty: 10000,
        number: 0,
        timestamp: '--genesis-timestamp--',
        nonce: 0
    }
};

const MILISECONDS = 1;
const SECONDS = 1000 * MILISECONDS;
const MINE_RATE = 13 * SECONDS;

module.exports = {
    GENESIS_DATA,
    MINE_RATE
};
