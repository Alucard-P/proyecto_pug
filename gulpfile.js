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

function compilePug() {
  return gulp
    .src("dev/pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./public/"));
}
// gulp.task("pug", () => {
//   return gulp
//     .src("dev/pug/*.pug")
//     .pipe(pug({ pretty: true }))
//     .pipe(gulp.dest("./public/"));
// });

gulp.task("reload", () => {
  server.reload;
});

exports.compilePug = compilePug;
exports.buildStyles = buildStyles;

// exports.watch = function () {
//   gulp.watch("dev/scss/**/*.scss", ["sass"]);
//   gulp.watch("dev/pug/**/*.pug", ["pug", "reload"]);
// };

// gulp.task("default", () => {
//   server.init({
//     server: "./public/",
//   });
//   gulp.watch("dev/pug/**/*.pug", ["pug", "reload"]);
//   gulp.watch("dev/scss/**/*.scss", ["sass"]);
//   gulp.watch("public/index.html", server.reload);
// });

gulp.task("default", () => {
  server.init({
    server: "./public/",
  });

  gulp.watch("dev/pug/**/*.pug", compilePug);
  gulp.watch("dev/scss/**/*.scss", buildStyles);
  gulp.watch("public/index.html").on("change", server.reload);
});
