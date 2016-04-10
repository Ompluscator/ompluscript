module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('test', ['typescript-process', 'jasmine', 'notify:test']);

};