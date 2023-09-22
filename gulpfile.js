const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require("sass"));
const include = require("gulp-file-include");
const concat = require("gulp-concat");
const del = require("del");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();
const reload = sync.reload;
const gutil = require("gulp-util");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const ftp = require("vinyl-ftp");
const ftpDir = "/evrika.8-pla.net/public_html";

const concatFiles = true;

function html() {
  return gulp
    .src("src/**.html")
    .pipe(
      include({
        prefix: "@@",
      })
    )
    .pipe(gulp.dest("verstka"));
}

function scss() {
  return gulp
    .src("src/scss/**.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(concat("style.css"))
    .pipe(gulp.dest("verstka/css"))
    .pipe(sync.stream());
}

function css() {
  return gulp
    .src("src/css/**.css")
    .pipe(concat("libs.css"))
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("verstka/css"));
}

function js() {
  return (
    gulp
      .src("src/js/**.js")
      // .pipe(concat('script.js'))
      .pipe(
        babel({
          presets: ["@babel/env"],
        })
      )
      .pipe(gulp.dest("verstka/js"))
  );
}

function jsLibs() {
  if (concatFiles) {
    return gulp
      .src([
        "src/js/libs/jquery-3.4.1.min.js",
        "src/js/libs/device.min.js",
        "src/js/libs/util.js",
        "src/js/libs/modal.js",
        "src/js/libs/slick.min.js",
        "src/js/libs/jquery.fancybox.js",
        "src/js/libs/cleave.min.js",
        "src/js/libs/jquery.mCustomScrollbar.min.js",
        "src/js/libs/jquery.transit.js",
        "src/js/libs/intersection-observer.js",
        "src/js/libs/nouislider.min.js",
        "src/js/libs/jquery.nice-select.min.js",
      ])
      .pipe(concat("libs.js"))
      .pipe(uglify())
      .pipe(gulp.dest("verstka/js"));
  } else {
    return gulp.src("src/js/libs/**.js").pipe(gulp.dest("verstka/js/libs"));
  }
}

function fonts() {
  return gulp.src("src/fonts/**/*").pipe(gulp.dest("verstka/fonts"));
}

function img() {
  return gulp.src("src/img/**/*").pipe(gulp.dest("verstka/img"));
}

function serve() {
  sync.init({
    server: "./verstka",
  });

  gulp
    .watch(["src/**.html", "src/include/**.html"], gulp.parallel(html))
    .on("change", reload);
  gulp.watch("src/scss/**.scss", gulp.parallel(scss)).on("change", reload);
  gulp.watch("src/css/**.css", gulp.parallel(css)).on("change", reload);
  gulp.watch("src/js/libs/**.js", gulp.parallel(jsLibs)).on("change", reload);
  gulp.watch("src/js/**.js", gulp.parallel(js)).on("change", reload);
  gulp.watch("src/fonts/**/*", gulp.parallel(fonts)).on("change", reload);
  gulp.watch("src/img/**/*", gulp.parallel(img)).on("change", reload);

  // gulp.watch(['src/**.html', 'src/include/**.html'], ['html-watch']);
}

gulp.task("build", gulp.parallel(scss, css, js, jsLibs, fonts, img, html));
gulp.task(
  "serve",
  gulp.parallel(scss, css, js, jsLibs, fonts, img, html, serve)
);

gulp.task("deploy", function () {
  const conn = ftp.create({
    host: "bitrix388.timeweb.ru",
    user: "cl163843",
    password: "xJVS6Hxg",
    parallel: 10,
    log: gutil.log,
  });

  const globs = ["verstka/**"];

  return gulp
    .src(globs, { base: ".", buffer: false })
    .pipe(conn.newer(ftpDir)) // only upload newer files
    .pipe(conn.dest(ftpDir));
});
