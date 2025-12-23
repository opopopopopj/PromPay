'use strict';

const gulp             = require('gulp');

const postcss          = require('gulp-postcss');
const autoprefixer     = require("autoprefixer");
const csso             = require("gulp-csso");
const minify           = require('gulp-minify');
const browserReporter  = require('postcss-browser-reporter');

const postcssImport    = require('postcss-import');
const postcssVariables = require('postcss-advanced-variables');
const postcssColor     = require('postcss-color-function');
const postcssNested    = require('postcss-nested');
const postcssExtend    = require('postcss-extend');

const mqpacker         = require("@lipemat/css-mqpacker");
const sourcemaps       = require('gulp-sourcemaps');

const nunjucksRender   = require('gulp-nunjucks-render');

const rename           = require('gulp-rename');

const plumber          = require('gulp-plumber');
const server           = require('browser-sync').create();
const ftp              = require('vinyl-ftp');
const replace          = require('gulp-replace');
const filter           = require('gulp-filter');

const del              = require('del');
const fs               = require("fs");

const newer            = require('gulp-newer');

const concat           = require('gulp-concat');
const remember         = require('gulp-remember');

const debug            = require('gulp-debug');

const w3cjs            = require('gulp-w3cjs');

let config             = null;

const timestamp        = Date.now();
const site             = 'prompay.cards';
const domain           = 'prompay.htmlpluscss.website';

const folderWatch      = 'main';

try {

	config            = require('./config.json');

	config.ftp.remotePath = domain + config.ftp.remotePath;

}catch(e){

	console.log("config the file doesn't exists");

}

const html = (files, since = {}, folder = '') => {

	return gulp.src(files, since)
		.pipe(plumber())
		.pipe(debug({title: 'html:'}))
		.pipe(nunjucksRender({
			data: {
				url: 'https://' + site,
				site,
				timestamp
			},
			path: 'src/'
		}))
		.pipe(replace('	', '  '))
		.pipe(w3cjs({
			url : 'https://validator.w3.org/nu/',
			verifyMessage: (type, message) => !message.includes('iframe')
		}))
		.pipe(w3cjs.reporter())
		.pipe(gulp.dest('build' + folder))

};

gulp.task('html', () => html('src/**/index.html', {since: gulp.lastRun('html')}));
gulp.task('html:touch', () => html('src/**/index.html'));
gulp.task('html:folderWatch', () => html('src/'+folderWatch+'/**/index.html', {}, '/' + folderWatch));

gulp.task('css', () => {

	return gulp.src('src/css/style.css')
			.pipe(plumber({
				errorHandler: err => {
					console.error(err.toString());
					this.emit('end'); // чтобы gulp не падал
				}
			}))
			.pipe(sourcemaps.init())
			.pipe(postcss([
				postcssImport(),
				postcssVariables(),
				postcssColor(),
				postcssNested(),
				postcssExtend(),
				autoprefixer({
					overrideBrowserslist: 'Android >= 5'
				}),
				mqpacker(),
				browserReporter()
			]))
			.pipe(sourcemaps.write())
			.pipe(rename('styles.css'))
			.pipe(gulp.dest('build/css'))
			.pipe(csso())
			.pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest('build/css'))

});

gulp.task('js', () => {

	return gulp.src([

		'src/js/min/*.js',
		'src/js/js.js',
		'src/js/*.js'

	], {since: gulp.lastRun('js')})

		.pipe(debug({title: 'js'}))
		.pipe(sourcemaps.init())
		.pipe(remember('js'))
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())
		.pipe(minify({
			preserveComments: "some",
			ext : {
				min:'.min.js'
			}
		}))

		.pipe(gulp.dest('build/js'))

});

gulp.task('serve', () => {

	server.init({
		server: 'build',
		files: [
			{
				match: ['build/**/*.*', '!build/**/*.min.{css,js}'],
				fn: server.reload()
			}
		]
	});

});

gulp.task('clear', () => del('build'));

gulp.task('copy', () => {

	return gulp.src(['src/**/*.*', '!src/**/*.{css,html,js}'], {since: gulp.lastRun('copy')})
			.pipe(newer('build'))
			.pipe(gulp.dest('build'))

});

gulp.task('ftp', () => {

	if(!config) {

		return true;

	}

	const f = filter('**/*.html', {restore: true});
	const conn = ftp.create( config.ftp );

	return gulp.src( ['build/**/*','!build/img/**/*'], {since: gulp.lastRun('ftp')} )
		.pipe(debug({title: 'ftp:'}))
		.pipe(f)
		.pipe(replace('"https://' + site, '"https://' + domain))
		.pipe(replace('css/styles.css', 'css/styles.min.css?' + Date.now()))
		.pipe(replace('js/scripts.js', 'js/scripts.min.js?' + Date.now()))
		.pipe(f.restore)
		.pipe(conn.dest(domain));

});

gulp.task('watch', () => {
	gulp.watch('src/js/*.*', gulp.series('js'));
	gulp.watch('src/css/*.*', gulp.series('css'));
	gulp.watch('src/**/index.html', gulp.series('html'));
	gulp.watch(['src/'+folderWatch+'/**','!src/'+folderWatch+'/index.html'], gulp.series('html:folderWatch'));
	gulp.watch(['src/_include/**/*.html','src/template/**/*.html'], gulp.series('html:touch'));
	gulp.watch(['src/**/*.*', '!src/**/*.{css,html,js}'], gulp.series('copy'));
	gulp.watch('build/**/*.*', gulp.series('ftp'));
});

gulp.task('default', gulp.series(
	'clear',
	gulp.parallel('css','js'),
	'html',
	'copy',
	gulp.parallel('ftp','watch','serve')
	));


gulp.task('build', () => {
	return gulp.src('build/**/*.html')
		.pipe(replace('"https://' + site, '"https://' + domain))
		.pipe(replace('css/styles.css', 'css/styles.min.css?' + Date.now()))
		.pipe(replace('js/scripts.js', 'js/scripts.min.js?' + Date.now()))
		.pipe(gulp.dest('build'))
});

gulp.task('clean-assets', () => del(['build/img', 'build/fonts']));

gulp.task('min', gulp.series('build', 'clean-assets'));