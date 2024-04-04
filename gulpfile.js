const gulp = require("gulp"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  autoprefixer = require("gulp-autoprefixer"),
  server = require("browser-sync").create();

function compilePug() {
  return gulp
    .src("dev/pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./public/"))
    .on("end", server.reload);
}

gulp.task("reload", () => {
  server.reload();
});

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

gulp.task("default", () => {
  server.init({
    server: "public/",
  });

  gulp.watch("dev/**/*.pug", compilePug);
  gulp.watch("dev/scss/**/*.scss", buildStyles);
  gulp.watch("public/index.html").on("change", server.reload);
});

exports.compilePug = compilePug;
exports.buildStyles = buildStyles;
