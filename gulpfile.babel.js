// gulp
import gulp from 'gulp';
import gulpIf from 'gulp-if';

// utils
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import del from 'del';

// pug
import rename from 'gulp-rename';
import pug from 'gulp-pug';

// css
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import cssmin from 'gulp-cssmin';
import autoprefixer from 'gulp-autoprefixer';
const sass = gulpSass( dartSass );

// eslint
import eslint from 'gulp-eslint';

// ts
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import fancyLog from 'fancy-log';
import supportsColor from 'supports-color';

// variables
const srcDir = './src';
const glPath = './src/ts/gl';
const outDir = './public';

const isFixed = ( file ) => {

	return file.eslint != null && file.eslint.fixed;

};

const lint = ( cb ) => {

	let paths = [ srcDir ];

	for ( let i = 0; i < paths.length; i ++ ) {

		gulp.src( paths[ i ] + '**/*.ts' )
			.pipe( eslint( { useEslintrc: true, fix: true } ) ) // .eslintrc を参照
			.pipe( eslint.format() )
			.pipe( gulpIf( isFixed, gulp.dest( paths[ i ] ) ) )
			.pipe( eslint.failAfterError() );

	}

	cb();

};

const setDevMode = ( cb ) => {

	webpackConfig.mode = 'development';

	cb();

};

const setPrdMode = ( cb ) => {

	webpackConfig.mode = 'production';

	cb();

};

const buildWebpack = ( cb ) => {

	webpackConfig.entry.main = srcDir + '/ts/top/main.ts';
	webpackConfig.output.filename = 'script.js';

	webpackStream( webpackConfig, webpack, ( err, stats ) => {

		if ( err ) {

			console.log( err );
			return;

		}

		stats = stats || {};

		var statusLog = stats.toString( {
			colors: supportsColor.stdout.hasBasic,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false,
			modules: false,
			children: true,
			version: true,
			cached: false,
			cachedAssets: false,
			reasons: false,
			source: false,
			errorDetails: false
		} );

		if ( statusLog ) {

			fancyLog( statusLog );

		}

		reload();

	} )
		.on( 'error', function () {

			this.emit( 'end' );

		} )
		.pipe( gulp.dest( outDir + '/js/' ) );

	cb();

};

const buildPug = ( cb ) => {

	let glList = require( './src/ts/gl/gl.json' );
	
	gulp.src( [ srcDir + '/pug/**/*.pug', '!/**/_*.pug', '!/**/gl.pug' ] )
		.pipe( plumber() )
		.pipe( pug( {
			pretty: true,
			locals: {
				glList: glList,
			}
		} ) )
		.pipe( rename( ( path ) => {

			path.basename = 'index';

		} ) )
		.pipe( gulp.dest( outDir ) )
		.unpipe( browserSync.reload() );

	for ( let i = 0; i < glList.length; i ++ ) {

		let gl = glList[ i ];
		let glName = gl.title;
		let glDate = gl.data;
		let glFileName = gl.fileName;
		let glDescription = gl.description;

		gulp.src( srcDir + '/pug/gl.pug' )
			.pipe( plumber() )
			.pipe( pug( {
				pretty: true,
				locals: {
					glName: glName,
					glDate: glDate,
					glFileName: glFileName,
					glDescription: glDescription
				}
			} ) )
			.pipe( rename( ( path ) => {

				path.basename = 'index';

			} ) )
			.pipe( gulp.dest( outDir + '/' + gl.fileName + '/' ) );

	}

	cb();

};

const buildSass = () => {

	return gulp.src( srcDir + '/scss/style.scss' )
		.pipe( plumber( {

			errorHandler: ( err ) => {

				console.log( err.messageFormatted );
				this.emit( 'end' );

			} } ) )
		.pipe( sass() )
		.pipe( autoprefixer( [ 'last 2 versions' ] ) )
		.pipe( cssmin() )
		.pipe( gulp.dest( outDir + '/css/' ) )
		.pipe( browserSync.stream() );

};

const copy = ( c ) => {

	gulp.src( './src/conf/**/*' ).pipe( gulp.dest( outDir ) );
	gulp.src( srcDir + '/ts/top/assets/**/*' ).pipe( gulp.dest( outDir + '/assets/' ) );

	let glList = require( './src/ts/gl/gl.json' );

	for ( let i = 0; i < glList.length; i ++ ) {

		let glName = glList[ i ].fileName;

		gulp.src( glPath + '/' + glName + '/assets/**/*' ).pipe( gulp.dest( outDir + '/' + glName + '/assets/' ) );

	}

	browserSync.reload();
	c();

};

const brSync = () => {

	browserSync.init( {
		server: {
			baseDir: outDir,
			index: 'index.html'
		},
		open: true,
		notify: false,
		ghostMode: false
	} );

};

const clean = ( c ) => {

	del(
		[ outDir ],
		{
			force: true,
		}
	).then( () => {

		c();

	} );

};

const reload = ( cb ) => {

	browserSync.reload();

	cb && cb();

};

const watch = () => {

	gulp.watch( srcDir + '/pug/**/*', gulp.series( buildPug ) );
	gulp.watch( srcDir + '/scss/**/*', gulp.series( buildSass ) );
	gulp.watch( [srcDir + '/ts/top/assets/**/*', glPath + '/*/assets/**/*'], gulp.series( copy ) );

};

exports.default = gulp.series(
	clean,
	setDevMode,
	gulp.parallel( buildPug, buildSass, buildWebpack, ),
	copy,
	gulp.parallel( brSync, watch )
);

exports.build = gulp.series(
	clean,
	setPrdMode,
	gulp.parallel( buildPug, buildSass, buildWebpack ),
	copy,
);

exports.lint = gulp.task( lint );
