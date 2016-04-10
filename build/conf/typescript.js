module.exports = {
    base: {
        src: ['src/typescript/**/*.ts'],
        dest: 'dist/javascript/main.js',
        options: {
            module: 'commonjs',
            sourceMap: false,
            declaration: false,
            removeComments: true,
        }
    }
};