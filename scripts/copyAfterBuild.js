const cpy = require('cpy');
const logger = require('./logger');

module.exports = (opts = {}) => ({
    name: 'copyAfterBuild',
    generateBundle(outputOptions, bundle, isWrite) {
        if (!isWrite) {
            logger.fatal('copyAfterBuild currently only works with bundles that are written to disk');
        }

        if (opts.from && opts.to) {
            setTimeout(() => {
                cpy(opts.from, opts.to)
                    .then(() => {
                        logger.success(`${opts.from} successfully copied to ${opts.to}`);
                    })
                    .catch(() => {
                        logger.fatal('File copy failed!');
                    });
            }, 200);
        }
    },
});
