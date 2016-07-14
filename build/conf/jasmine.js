module.exports = {
    src : 'dist/javascript/main.js',
    options : {
        specs : 'test/javascript/**/*.js',
        vendor: ['node_modules/jasmine-ajax/lib/mock-ajax.js'],
    }
};