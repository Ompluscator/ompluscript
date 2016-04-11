module.exports = {
    base: {
        src: ['src/typescript/**/*.ts'],
        out: 'dist/javascript/main.js',
        options: {
            sourceMap: false,
            declaration: false,
            removeComments: true,
        }
    }
};