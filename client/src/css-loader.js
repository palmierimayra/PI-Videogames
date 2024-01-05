const { process } = require('css-loader');

module.exports = {
  process: (src, filename, config, options) => {
    return process(src, filename, config, options);
  },
};