module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('deploy', ['typescript-process', 'uglify:base', 'notify:deploy']);

};