// const { series, parallel } = require('gulp');

// function clean(cb) {
//   // body omitted
//   cb();
// }

// function cssTranspile(cb) {
//   // body omitted
//   cb();
// }

// function cssMinify(cb) {
//   // body omitted
//   cb();
// }

// function jsTranspile(cb) {
//   // body omitted
//   cb();
// }

// function jsBundle(cb) {
//   // body omitted
//   cb();
// }

// function jsMinify(cb) {
//   // body omitted
//   cb();
// }

// function publish(cb) {
//   // body omitted
//   cb();
// }

// exports.build = series(
//   clean,
//   parallel(
//     cssTranspile,
//     series(jsTranspile, jsBundle)
//   ),
//   parallel(cssMinify, jsMinify),
//   publish
// );

const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

exports.default = function() {
  return src('vendor/*.js')
    .pipe(babel())
    .pipe( src('src/*.js'))
    .pipe(concat('peerObject.js'))
    .pipe(dest('output/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}