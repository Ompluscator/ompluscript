module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('test-prepare', 'Preparing test conditions', function() {
        var destination = 'test/template.html';
        var content = grunt.file.read(destination);

        grunt.file.expand('test/javascript/**/*.js').forEach(function(jsDestination) {
            var htmlDestination = 'dist/test/' + jsDestination.replace('.js', '.html').replace('test/javascript/', '').replace(/\//g, '.');
            var htmlContent = content.replace('${PATH}', jsDestination);

            grunt.file.write(htmlDestination, htmlContent);
        });
        
    });

    grunt.registerTask('test', ['typescript-process', 'clean:test', 'test-prepare', 'test-prepare', 'qunit', 'clean:test', 'notify:test']);

};