const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require("del");
const fs = require("fs");
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const twig = require("gulp-twig");
const YAML = require('yaml');
const { dest, lastRun, parallel, series, src, watch: gulpWatch } = require("gulp");

const distFolder = "dist"
const stylesSrcGlob = "src/styles/styles.css";

const config = {
  cleanGlobs: [`${distFolder}/**/*`, `!${distFolder}/.gitkeep`],
  dataGlob: "src/data/data.yaml",
  stylesSrcGlobs: stylesSrcGlob,
  stylesWatchGlobs: [stylesSrcGlob, "tailwind.config.js"],
  viewsSrcGlobs: "src/views/**/[^_]*.twig",
  viewsWatchGlobs: "src/views/**/*.twig",
  staticGlobs: "src/static/**/*",
};

function clean() {
  return del(config.cleanGlobs);
}

function reload(done) {
  browserSync.reload();
  done();
}

function serve(done) {
  browserSync.init({
    open: false,
    server: { baseDir: distFolder }
  });

  done();
}

function static() {
  return src(config.staticGlobs, { since: lastRun(static) })
    .pipe(dest(distFolder));
}

function styles() {
  return src(config.stylesSrcGlobs)
    .pipe(postcss([
      tailwindcss(),
      autoprefixer(),
    ]))
    .pipe(dest(distFolder))
}

function views() {
  const dataFile = fs.readFileSync(config.dataGlob, 'utf8')
  const data = YAML.parse(dataFile)

  return src(config.viewsSrcGlobs)
    .pipe(twig({
      data: data,
      extname: '',
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      minifyJS: true, 
    }))
    .pipe(dest(distFolder));
}

function watch(done) {
  gulpWatch(config.dataGlob, series(parallel(styles, views), reload));
  gulpWatch(config.staticGlobs, series(static, reload));
  gulpWatch(config.stylesWatchGlobs, series(styles, reload));
  gulpWatch(config.viewsWatchGlobs, series(parallel(styles, views), reload));
  
  done();
}

/**
 * Single-task exports
 */

exports.clean = clean;

/**
 * Multi-task exports
 */

const build = parallel(styles, static, views);

exports.build = build;
exports.dev = series(build, serve, watch);
