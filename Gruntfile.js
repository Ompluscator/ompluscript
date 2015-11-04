module.exports = function (grunt) {
	grunt.initConfig({
		uglify: {
			dist: {
				options: {
					sourceMap: 'js/main.min.map',
					sourceMapIn: 'js/main.js.map',
					sourceMapRoot: 'ts/'
				},
				files: {
					'js/main.min.js': ['js/main.js']
				}
			}
		},
		typescript: {
			base: {
				src: ['ts/**/*.ts'],
				dest: 'js/main.js',
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

	grunt.registerTask('deploy', ['typescript:base', 'uglify:dist']);
};