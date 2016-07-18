module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('start', ['deploy', 'http-server:dev']);

};