module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('test-process', ['typescript-process', 'jasmine']);

    grunt.registerTask('test', ['test-process', 'notify:test']);

};