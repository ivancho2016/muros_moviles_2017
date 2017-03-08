var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

var fuentesJS = ['js/funciones.js', 'js/scripts.js'];

/*tarea de sass para preprocesar archivos y generar el css*/
gulp.task('sass', function() {
	var archivosSASS,
	archivosCSS, archivosFONTS, archivosOWL, archivosTether;

	archivosSASS = gulp.src('scss/app.scss')
	.pipe(autoprefixer())
	.pipe(sass({
		includePaths:['scss']
	}));

	archivosCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');

	archivosFONTS = gulp.src('./app/css/font-awesome.css');

	archivosOWL = gulp.src('./app/css/owl.carousel.min.css');

	archivosTether = gulp.src('./app/css/tether.min.css');

	return merge(archivosSASS, archivosCSS, archivosFONTS, archivosOWL, archivosTether)
	.pipe(concat('app.css'))
	//.pipe(cssmin())
	//.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

/*minificar css*/
gulp.task('miniCSS', function() {
	gulp.src('./app/css/app.css')
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/css'));
});

/*ejecutar el proceso de sass y recargar el navegador*/
gulp.task('serve', ['sass'], function() {
	browserSync.init(["app/css/*.css", "app/js/*.js", "app/*.html" ], {
		server: {
			baseDir: 'app'
		}
	});
});

/*concatenar archivos js*/
gulp.task('js', function() {
	gulp.src(fuentesJS)
	.pipe(concat('app.js'))
	.pipe(browserify())
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream:true}))
});

/*minificar js*/
gulp.task('miniJS', function() {
	gulp.src('./app/js/app.js')
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/js'))
});

/*mover fuentes*/
gulp.task('moverFuentes', function() {
	gulp.src('./app/fonts/*.{eot,svg,ttf,woff,woff2}')
	.pipe(gulp.dest('dist/fonts'))
});

/*minificar html*/
gulp.task('miniHTML', function() {
	//return gulp.src('./app/*.html')
	return gulp.src('./app/**/*.html')
	.pipe(htmlmin({collapseWhitespace:true}))
	.pipe(gulp.dest('dist'))
});

/*minificar imagenes*/
gulp.task('miniIMG', function() {
    gulp.src('./app/img/*.{jpg,png,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

/*observar cambios en archivos sass*/
gulp.task('watch', ['sass', 'serve', 'js'], function() {
	gulp.watch(["scss/*.scss"], ['sass']);
	gulp.watch(["js/*.js"], ['js']);
	gulp.watch(["./app/img/*.{png,jpg,gif}"]);
	gulp.watch(["./app/fonts/*.{eot,svg,ttf,woff,woff2}"]);
});

gulp.task('default', ['watch']);

/*generar archivos para distribución*/

gulp.task('dist', ['miniCSS','moverFuentes', 'miniHTML', 'miniJS', 'miniIMG', 'miniPHP']);