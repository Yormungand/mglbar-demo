let gulp = require('gulp');
let concat = require('gulp-concat');
let postcss = require('gulp-postcss');
let autoprefixer = require('gulp-autoprefixer');
let cleancss = require('gulp-clean-css');
let browserSync = require('browser-sync').create();
let cssnext = require("postcss-preset-env")
let uglify = require("gulp-uglify")
let cssnano = require("cssnano")

function refresh() {
    return gulp.src(['css/*.css'])
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
}


/**
 * @function css()
 * @name css
 *  1. Idea project үүсэн хавтасны хажууд package.json үүсгэнэ
 *  2. npm install хийнэ.
 *  3. Сангаа дуудаж оруулахдаа "absolute path" -ыг зааж өгнө
 * @function
 * */
function css() {
    return gulp.src([
        '/home/batkhongor/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/css/perfect-scrollbar.css',
        '/home/batkhongor/IdeaProjects/mglbar-demo/node_modules/swiper/swiper-bundle.css',
        'css/*.css',
    ])
        .pipe(cleancss())
        .pipe(concat('root.min.css'))
        .pipe(browserSync.stream())
        .pipe(autoprefixer({cascade: false}))
        .pipe(postcss([], [cssnano()]))
        .pipe(gulp.dest('dist/css/'));
}


/**
 * @function js()
 * @name js
 *  1. Idea project үүсэн хавтасны хажууд package.json үүсгэнэ
 *  2. npm install хийнэ.
 *  3.Сангаа дуудаж оруулахдаа "absolute path" -ыг зааж өгнө
 * @function
 * */
function js() {
    return gulp.src([
        '/home/batkhongor/IdeaProjects/mglbar-demo/node_modules/swiper/swiper-bundle.js',
        '/home/batkhongor/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/dist/perfect-scrollbar.common.js',
        '/home/batkhongor/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/dist/perfect-scrollbar.js',
        // '/home/turbold/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js',
        'js/*.js',
    ])
        .pipe(uglify())
        .pipe(concat('root.min.js'))
        .pipe(gulp.dest('dist/js/'))
}

function serve(){
    browserSync.init({
        server: ''
    });
    gulp.watch('*.html').on('change', css, browserSync.reload);
    gulp.watch('./css/*.css').on('change', css, browserSync.reload);
    gulp.watch('./js/*.js').on('change', css, browserSync.reload);
    gulp.watch('./**/**/*').on('change', function () {

        console.log("Watch hit");
        browserSync.reload();
    });
}

gulp.task('default', gulp.series(serve, css, js));
gulp.task('build', gulp.series(css, js));
gulp.task('css', gulp.series(css));
