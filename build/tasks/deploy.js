module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('deploy', ['test-process', 'uglify:base', 'notify:deploy']);

};