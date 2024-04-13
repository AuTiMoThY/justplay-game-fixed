
const VERSION = '20240413';
const PROJECT_NAME = 'au';
const entry = {
    sass: './_src/sass/**/*.scss'
}

const output = {
    css: 'dist/assets/css'
}

const sassVar = {
    VERSION: VERSION,
    PROJECT_NAME: PROJECT_NAME,
}



const port = 8200;
// 引入依賴
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const connectPHP = require('gulp-connect-php');
const sass = require('gulp-sass')(require('sass'));
const sassVars = require('gulp-sass-vars');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const nunjucksRender = require('gulp-nunjucks-render');

const {src, dest, watch, series} = gulp;
// 編譯 SASS
function compileSASS() {
    return src([entry.sass])
        .pipe(sassVars(sassVar, { verbose: true }))
        .pipe(plumber(function (err) {
            console.log('SASS Compile Error:', err.message);
            this.emit('end');
        }))
        .pipe(sourcemaps.init()) // 初始化 sourcemaps
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: ["node_modules"],
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "last 2 version",
                "> 1%",
                "IE 9",
                "safari 7",
                "safari 8"
            ],
            cascade: false,
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(output.css))
        .pipe(browserSync.stream());
}

function compileHTML() {
    return src(`./_src/pages/**/*.+(html|nunjucks|njk)`)
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: [`./_src/pages_templates`],
        data: {
            VERSION: VERSION,
            IMG_PATH: "assets/images",
            PROJECT_NAME: PROJECT_NAME
        }
    }))
    // output files in app folder
    .pipe(dest('./dist'))
    .on('end', () => {
        console.log('=================================');
        console.log(`generate HTML OK!`);
        console.log('=================================');
        browserSync.reload();
    });
}

// 監控 SASS 文件
function watchSass() {
    return gulp.watch(entry.sass, compileSASS);
}

// 開啟預設的 HTTP 伺服器並監控檔案
function serveDefault() {
    browserSync.init({
        server: './dist/',
        port: port,
    });

    watch([entry.sass], compileSASS);
    watch(['./_src/pages/**/*', './_src/pages_templates/**/*'], compileHTML);
}

// 開啟 PHP 伺服器並監控檔案
function servePHP() {
    connectPHP.server({
        // 設定伺服器的根目錄
        base: `./dist/`,
        // 選擇一個不常用的埠以避免衝突
        port: port,
        // 保持伺服器開啟
        keepalive: true
        // bin: 'D:\\PHP-8.2\\php.exe',
    }, function () {
        browserSync.init({
            // 代理到剛剛啟動的 PHP 伺服器
            proxy: 'localhost:' + port,
            // 設定 browserSync 的監聽埠，避免與 PHP 伺服器埠衝突
            port: 3000,
        });
    });

    watch([entry.sass], compileSASS);
    watch(['./app/Views/**/*', './app/Controllers/**/*', './dist/assets/js/**/*']).on('change', browserSync.reload);
}


exports.default = series(compileSASS, compileHTML, serveDefault);
exports.php = series(compileSASS, servePHP);
exports.sass = series(compileSASS, watchSass);