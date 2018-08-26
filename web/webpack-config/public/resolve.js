const path = require('path')

module.exports = ({
  SRC,
}) => {
  return {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': SRC,
      'components': path.resolve(SRC, 'components'),
      'utils': path.resolve(SRC, 'utils'),
      'static': path.resolve(SRC, 'static'),
    },
  }
}
