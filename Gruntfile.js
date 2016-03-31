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
		},
		tslint: {
			options: {
				configuration: "configuration/tslint.json"
			},
			files: {
				src: ['typescript/**/*.ts']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-tslint');

	grunt.registerTask('debug', ['tslint', 'typescript:base']);
	grunt.registerTask('deploy', ['debug', 'uglify:base']);
};