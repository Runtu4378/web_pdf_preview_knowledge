const path = require('path')

module.exports = ({
  SRC,
}) => {
  const entry = {
    index: path.resolve(SRC, './pages/index/index.js'),
  }
  return entry
}
