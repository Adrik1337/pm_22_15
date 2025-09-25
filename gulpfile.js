const { series } = require('gulp');

function defaultTask(done) {
  console.log('Gulp працює! 🎉');
  done();
}

exports.default = series(defaultTask);
