let gulp = require('gulp');
let concat = require('gulp-concat');
let postcss = require('gulp-postcss');
let autoprefixer = require('gulp-autoprefixer');
let cleancss = require('gulp-clean-css');
let browserSync = require('browser-sync').create();
let cssnext = require("postcss-preset-env")
let uglify = require("gulp-uglify")
let cssnano = require("cssnano")
let /** @type {import("gulp-imagemin")} */ imagemin;
let /** @type {import("imagemin-jpegtran")}*/ imageminJpegtran;
let /** @type {import("imagemin-pngquant")}*/ imageminPngquant;


/**
 * @function css()
 * @name css
 *  1. Idea project үүсэн хавтасны хажууд package.json үүсгэнэ
 *  2. npm install хийнэ.
 *  3. Сангаа дуудаж оруулахдаа "absolute path" -ыг зааж өгнө
 * @function
 * */

/**
 * @function js()
 * @name js
 *  1. Idea project үүсэн хавтасны хажууд package.json үүсгэнэ
 *  2. npm install хийнэ.
 *  3.Сангаа дуудаж оруулахдаа "absolute path" -ыг зааж өгнө
 * @function
 * */

async function imageminify(){
    const imagemini = await import("gulp-imagemin");
    const imagePlugins = [
        imagemini.svgo({
            plugins: [

            ]
        })
    ]
    return gulp.src('images/*')
        .pipe(imagemini.default(imagePlugins))
        .pipe(gulp.dest('dist/images'))
}

gulp.task("startup", async ()=>{
    await startup();
})

function refresh() {
    return gulp.src(['css/*.css'])
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
}


function css() {
    return gulp.src([
        '/home/zakuro/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/css/perfect-scrollbar.css',
        '/home/zakuro/IdeaProjects/mglbar-demo/node_modules/swiper/swiper-bundle.css',
        'css/*.css',
    ])
        .pipe(cleancss())
        .pipe(concat('root.min.css'))
        .pipe(browserSync.stream())
        .pipe(autoprefixer({cascade: false}))
        .pipe(postcss([], [cssnano()]))
        .pipe(gulp.dest('dist/css/'));
}


function js() {
    return gulp.src([
        'js/*.js',
        '/home/zakuro/IdeaProjects/mglbar-demo/node_modules/swiper/swiper-bundle.js',
        // '/home/zakuro/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/dist/perfect-scrollbar.common.js',
        // '/home/zakuro/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/dist/perfect-scrollbar.js',
        // '/home/turbold/IdeaProjects/mglbar-demo/node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js',

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
gulp.task('build', gulp.series(css, js, imageminify));
gulp.task('css', gulp.series(css));

