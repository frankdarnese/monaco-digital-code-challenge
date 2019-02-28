const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require("gulp-rename");


// Sass compiler + Autoprefixer + Cssnano
gulp.task('css', function() { 
    const plugins = [
        autoprefixer({browsers: ['last 2 versions', 'iOS 8']}),
        cssnano()
    ];
    return gulp.src('app/stylesheets/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('public/css'))
});

// Babel + Concat + Uglify JS
gulp.task('concat', () => 
    gulp.src('app/javascripts/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
);

// Optimize Images
gulp.task('imageMin', () => 
    gulp.src('app/assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/assets/images'))
);

// Gulp Watch
gulp.task('watch', () => 
    gulp.watch('app/stylesheets/**/*.scss', gulp.series('css')),
    gulp.watch('app/javascripts/**/*.js', gulp.series('concat')),
    gulp.watch('app/assets/images/*', gulp.series('imageMin'))
)