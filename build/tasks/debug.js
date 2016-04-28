module.exports = function (grunt) {
    "use strict";
    
    grunt.registerTask('debug', ['concurrent:base', 'notify:debug']);

};