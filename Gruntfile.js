/*global module */
/*global require */
module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig();

    // loads ftp config
    grunt.loadTasks('grunttasks');

    grunt.registerTask('default', [
        'ftpPut'
    ]);
};
