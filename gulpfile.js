const gulp = require("gulp"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  autoprefixer = require("gulp-autoprefixer"),
  server = require("browser-sync").create();

function buildStyles() {
  return gulp
    .src("dev/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("public/css/"))
    .pipe(server.stream());
}

exports.buildStyles = buildStyles;
exports.watch = function () {
  gulp.watch("dev/scss/**/*.scss", ["sass"]);
};
