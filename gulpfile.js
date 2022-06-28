import gulp from "gulp"
import concat from "gulp-concat"
import postcss from 'gulp-postcss'
import autoprefixer from "gulp-autoprefixer"
import cleancss from "gulp-clean-css"
import browserSync from "browser-sync"
import cssnext from "postcss-preset-env"
import uglify from "gulp-uglify"
import cssnano from "cssnano";
import imagemin from 'gulp-imagemin';
// let imagemin = require("gulp-imagemin")

function imgmin () {
    return gulp.src([
        'images/*',
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
}

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
        '/home/turbold/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/css/perfect-scrollbar.css',
        '/home/turbold/IdeaProjects/mglbar-demo/node_modules/swiper/swiper-bundle.css',
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
        '/home/turbold/IdeaProjects/mglbar-demo/node_modules/swiper/swiper-bundle.js',
        '/home/turbold/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/dist/perfect-scrollbar.common.js',
        '/home/turbold/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/dist/perfect-scrollbar.js',
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
gulp.task('build', gulp.series(css, js, imgmin));
gulp.task('css', gulp.series(css));
