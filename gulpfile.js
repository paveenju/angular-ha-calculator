var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minHtml = require('gulp-minify-html');
var sass = require('gulp-sass');

var outputDir = "dist/";


gulp.task('default', ['html', 'lib-js', 'app-js', 'css', 'fonts', 'css-fonts', 'css-images'], function () {
  //
});

gulp.task('quick', ['html', 'app-js', 'css'], function () {
  //
});

gulp.task('watch', ['quick'], function () {

  gulp.watch("src/index.html", ['html']);
  gulp.watch("src/styles/**/*.scss", ['css']);
  gulp.watch("src/app/**/*.js", ['app-js'])
});

gulp.task('css', function () {
  return gulp.src(["bower_components/bootstrap/dist/css/bootstrap.min.css",
    "bower_components/jspanel/source/jquery.jspanel.css",
    "src/styles/**/*.scss"])
    .pipe(sass())
    .pipe(concat('default.css'))
    .pipe(gulp.dest(outputDir + "/styles"));
});

gulp.task('html', function () {
  return gulp.src("src/index.html")
    .pipe(minHtml())
    .pipe(gulp.dest(outputDir));
});

gulp.task('lib-js', function () {
  var src = [
    // lib
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-ui/jquery-ui.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/jspanel/vendor/mobile-detect.min.js',
    'bower_components/jspanel/source/jquery.jspanel.min.js',
    'bower_components/highcharts/highcharts.js',
    'bower_components/mathjs/dist/math.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-resource/angular-resource.js',
    
    // an highchart theme
    'bower_components/highcharts/themes/dark-green.js'
  ];

  return gulp.src(src)
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest(outputDir + "/scripts"));
});

gulp.task('app-js', function () {
  var src = [
    // applications
    'src/app/model.js',
    'src/app/app.js',
    'src/app/services.js',
    'src/app/rams.js'
  ];

  return gulp.src(src)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(outputDir + "/scripts"));
});

gulp.task('fonts', function () {
  var src = [
    'bower_components/bootstrap/dist/fonts/*.*'
  ];

  return gulp.src(src)
    .pipe(gulp.dest(outputDir + '/fonts'));
});

gulp.task('css-fonts', function () {
  var src = [
    'bower_components/jspanel/source/fonts/*.*'
  ];

  return gulp.src(src)
    .pipe(gulp.dest(outputDir + '/styles/fonts'));
});

gulp.task('css-images', function () {
  var src = [
    'bower_components/jspanel/source/images/**/*.*'
  ];

  return gulp.src(src)
    .pipe(gulp.dest(outputDir + '/styles/images'));
});