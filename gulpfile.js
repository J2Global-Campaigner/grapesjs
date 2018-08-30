var gulp = require('gulp'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
minifyCSS = require('gulp-minify-css'),
rename = require('gulp-rename');


//CKEDITOR related tasks:
//we need these individual tasks to avoid copying over too many unneccessary files
//remove this task when we go with product localization to include all of the lang resource files
gulp.task('ckeditor_node_modules_lang', function() {
    gulp.src([
            'node_modules/ckeditor/lang/en.js'
        ])
        .pipe(gulp.dest(
            'dist/js/node_modules/ckeditor/lang'
        ));
});
gulp.task('ckeditor_node_modules_plugins', function() {
    gulp.src([
            'node_modules/ckeditor/plugins/**/*'
        ])
        .pipe(gulp.dest(
            'dist/js/node_modules/ckeditor/plugins'
        ));
});
gulp.task('ckeditor_node_modules_skins', function() {
    gulp.src([
            'node_modules/ckeditor/skins/**/*'
        ])
        .pipe(gulp.dest(
            'dist/js/node_modules/ckeditor/skins'
        ));
});
gulp.task('ckeditor_node_modules_misc', function() {
    gulp.src([
            'node_modules/ckeditor/ckeditor.js',
            'node_modules/ckeditor/styles.js',
            'node_modules/ckeditor/contents.css',
            'node_modules/ckeditor/undefinededitor.css'
            //'node_modules/ckeditor/config.js',
        ])
        .pipe(gulp.dest(
            'dist/js/node_modules/ckeditor'
        ));
});

// 1. We need to add our custom plugins that we've created in the ckeditor project to this project for deployement to CSB
gulp.task('ckeditor_mergeField_plugin', function() {
    gulp.src([
            'plugins/CKEditor/ckeditor/plugins/mergeField/plugin.js',
        ])  
        .pipe(uglify())
        //move it to the root level node_modules folder
        .pipe(gulp.dest(
            'dist/js/node_modules/ckeditor/plugins/mergeField'
        ))
        //copy the laterst version to this projects node_modules folder so we can run this project locally before deploy
        .pipe(gulp.dest(
            'node_modules/ckeditor/plugins/mergeField'
        ));
});
//link dialog plugin
gulp.task('ckeditor_link_plugin', function() {
    gulp.src([
            'plugins/CKEditor/ckeditor/plugins/link/dialogs/link.js',
        ])  
        .pipe(uglify())
        //move it to the root level node_modules folder
        .pipe(gulp.dest(
            'dist/js/node_modules/ckeditor/plugins/link/dialogs'
        ))
        //copy the laterst version to this projects node_modules folder so we can run this project locally before deploy
        .pipe(gulp.dest(
            'node_modules/ckeditor/plugins/link/dialogs'
        ));
});

// 2. We've modified and rebuilt the grapesjs-plugin-ckeditor to include our new custom plugin (ie. mergeField) and we need to grab the latest version
gulp.task('grapesjs_ckeditor_plugin', function() {
    gulp.src([
            'plugins/CKEditor/grapesjs-plugin/dist/grapesjs-plugin-ckeditor.min.js'
        ])  
        .pipe(gulp.dest(
            'dist/js'
        ));
});

// 3. We've modified and rebuilt the grapesjs-preset-newsletter so grab the latest version from that project
gulp.task('grapesjs_newsletter', function() {
    gulp.src([
            'plugins/grapesjs-preset-newsletter/dist/js/grapesjs-preset-newsletter.min.js'
        ])  
        .pipe(gulp.dest(
            'dist/js'
        ));
});


//copy over everything in the dist folder to CSB
gulp.task('dist', function() {
    gulp.src([
            'dist/**/*'
        ])
        .pipe(gulp.dest('../Lightning/Lightning/Areas/Editor/GrapesJS/'));
});


//run all ckeditor related tasks
gulp.task('ckeditor', function() {
    gulp.run(
             'ckeditor_node_modules_lang',
             'ckeditor_node_modules_plugins',
             'ckeditor_node_modules_skins',
             'ckeditor_node_modules_misc',
             'ckeditor_mergeField_plugin',
             'ckeditor_link_plugin',
             'grapesjs_ckeditor_plugin'
            );
});


//gulp command will run all tasks configured below
gulp.task('default', function() {
    gulp.run('grapesjs_newsletter');
});