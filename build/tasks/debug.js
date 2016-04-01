module.exports = function (grunt) {
    "use strict";
    
    grunt.registerTask('debug', ['typescript-process', 'notify:debug']);

};