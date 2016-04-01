module.exports = {
    base: {
        src: ['src/typescript/**/*.ts'],
        dest: 'dist/js/main.js',
        options: {
            module: 'commonjs',
            sourceMap: false,
            declaration: false,
            removeComments: true,
        }
    }
};