import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import {deleteAsync} from 'del';


// Styles

 const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))

    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//html
 const html = () => {
  return gulp.src('source/*.html')
   .pipe(htmlmin({ collapseWhitespace: true }))
   .pipe (gulp.dest('build'));
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Skripts
 const script = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}


// Images
 const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}

 const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'))
}



// WebP
 const creatWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh( {
    webp: {}
  }))
  .pipe(gulp.dest('build/img'))
}


//SVG
 const svg = () =>
gulp.src (['source/img/*.svg'])
.pipe (svgo())
.pipe(gulp.dest('build/img'));


//Copy
 const copy = (done) => {
gulp.src([
  'source/fonts/*.{woff2,woff}',
  'source/*.ico',
  'source/favicons/*'
], {
  base: 'source'
})
  .pipe(gulp.dest('build'))
  done();
 }


 //Clean
 const clean = () => {
  return deleteAsync('build');
 };


 //Reload
 const reload = (done) => {
  browser.reload();
  done();
 }

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/app.js", gulp.series(script));
  gulp.watch("source/*.html", gulp.series(html, reload));
};



//Build

 const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    script,
    svg,
    creatWebp
  ),
);



export default gulp.series(
  clean,
   copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    script,
    svg,
    creatWebp
  ),
  gulp.series(
    server,
    watcher
    ));
