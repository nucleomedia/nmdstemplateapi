var gulp = require('gulp');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

gulp.task('android',['sample'],function(){
	 return gulp.src('sample/**/*')
        	.pipe(zip('sample.html5'))
        	.pipe(gulp.dest('.')); 
});

gulp.task('sample',['default'],function(){
	return 	gulp.src([	'dist/*.js',
						'bower_components/angular/angular.min.js',
					  	'bower_components/x2js/xml2json.js',
					  	])
			.pipe(gulp.dest('sample/lib'));
});

gulp.task('default', function() {
  return gulp.src('src/*.js')
		.pipe(uglify())
  		.pipe(gulp.dest('dist'));
});