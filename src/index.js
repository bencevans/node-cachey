
module.exports = process.env.CACHEY_COV ? require('./lib-cov/cachey') : require('./lib/cachey');