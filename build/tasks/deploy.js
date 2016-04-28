module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('deploy', ['concurrent:base', 'jasmine', 'concurrent:uglify', 'notify:deploy']);

};