module.exports = function (grunt) {
	grunt.initConfig({
		uglify: {
			base: {
				files: {
					'build/main.min.js': ['build/main.js']
				}
			}
		},
		typescript: {
			base: {
				src: ['typescript/**/*.ts'],
				dest: 'build/main.js',
				options: {
					module: 'amd',
					sourceMap: true,
					declaration: false
				}
			}

		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-typescript');

	grunt.registerTask('debug', ['typescript:base']);
	grunt.registerTask('deploy', ['typescript:base', 'uglify:base']);
};