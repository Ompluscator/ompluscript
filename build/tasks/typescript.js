module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('truncate-main', 'Truncate additional rows from main.js', function() {
        
        var ompluscriptDeclaration = 'var Ompluscript;\n';
        var destination = 'dist/javascript/main.js';
        var content = grunt.file.read(destination);
        
        content = ompluscriptDeclaration + content.replace(new RegExp(ompluscriptDeclaration, 'g'), '');
        content = content.replace(/\/\/\/ <reference path="[\.\/a-zA-Z]+\.ts" \/>\n/g, '');
        grunt.file.write(destination, content);
        
    });

    grunt.registerTask('typescript-process', ['clean:javascript', 'tslint', 'typescript:base', 'truncate-main']);

};