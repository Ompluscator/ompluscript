module.exports = function (grunt) {
    "use strict";

    var path = require('path');
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'build/conf')
    });

    grunt.loadTasks('build/tasks');

};