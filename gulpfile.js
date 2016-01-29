const gulp = require('gulp')
const assign = require('lodash/assign')

const browserify = require('browserify')
const watchify = require('watchify')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const plugins = require('gulp-load-plugins')()
const standardFormat = require('standard-format')

const options = {
  jsEntries: ['./src/js/main.js'],
  jsFiles: ['./src/js/**/.js'],
  jsOutput: './build/js',

  sassEntries: ['./src/scss/style.scss'],
  sassFiles: ['./src/scss/**/*.scss'],
  sassOutput: './build/scss',

  imgFiles: ['./src/img/**'],
  imgOutput: './build/img',

  fontFiles: ['./src/font/**'],
  fontOutput: './build/font',

  htmlFiles: ['./src/**/*.html'],
  htmlOutput: './build/',
  debug: true
}

const browserifyOptions = assign({}, watchify.args, {
  entries: options.jsEntries,
  debug: options.debug
})

const b = watchify(browserify(browserifyOptions))
  .transform('babelify', {
    presets: ['es2015']
  })

gulp.task('js', bundle)
b.on('update', bundle)
b.on('log', plugins.util.log)

function onError (err) {
  plugins.util.log('\n', plugins.util.colors.red(err), '\n')
}

/**
 * Bundle js files (is run initially and when js files change - we use watchify
 * to keep watch over js files not gulp watch because it knows best which js
 * file should trigger a rebundle)
 * standard style check/hinting is also run but only reports and doesn't change files
 */
function bundle () {
  gulp.src(options.jsEntries)
    .pipe(plugins.standard())
    .pipe(plugins.standard.reporter('default', {
      breakOnError: false
    }))
    .on('error', onError)

  return b.bundle()
    .on('error', function (err) {
      onError(err)
      this.emit('end')
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({
      loadMaps: true
    }))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(options.jsOutput))
    .pipe(plugins.livereload())
}

/**
 * Compiles sass and adds browser prefixes
 */
gulp.task('sass', () => {
  /*gulp.src(options.sassEntries)
    .pipe(plugins.cssfmt())
    .on('error', onError)
    .pipe(gulp.dest('./'))*/

  return gulp.src(options.sassEntries)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', onError))
    .pipe(plugins.sourcemaps.write({includeContent: false, sourceRoot: '.'}))

    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.autoprefixer({
      browsers: ['last 1 version', '> 1%'],
      cascade: false
    }).on('error', onError))
    .pipe(plugins.sourcemaps.write({
      includeContent: false,
      sourceRoot: '../../src/scss'
    }))
    .pipe(gulp.dest(options.sassOutput))
    .pipe(plugins.livereload())
})

gulp.task('img', () => {
  return gulp.src(options.imgFiles)
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .on('error', onError)
    .pipe(gulp.dest(options.imgOutput))
    .on('error', onError)
    .pipe(plugins.livereload())
})

gulp.task('font', () => {
  return gulp.src(options.fontFiles)
    .pipe(gulp.dest(options.fontOutput))
    .on('error', onError)
    .pipe(plugins.livereload())
})

gulp.task('html', () => {
  return gulp.src(options.htmlFiles)
    .pipe(gulp.dest(options.htmlOutput))
    .on('error', onError)
    .pipe(plugins.livereload())
})

gulp.task('watch', () => {
  plugins.livereload.listen()
  gulp.start('sass')
  gulp.start('img')
  gulp.start('font')
  gulp.start('html')
  gulp.start('js')

  gulp.watch(options.sassFiles, ['sass'])
  gulp.watch(options.imgFiles, ['img'])
  gulp.watch(options.fontFiles, ['font'])
  gulp.watch(options.htmlFiles, ['html'])
})
