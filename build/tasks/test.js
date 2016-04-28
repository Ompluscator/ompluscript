module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('test-process', ['javascript-process', 'jasmine']);

    grunt.registerTask('test', ['test-process', 'notify:test']);

};