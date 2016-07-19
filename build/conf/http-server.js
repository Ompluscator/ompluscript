module.exports = {
    'dev': {
        root: "dist/",
        port: 3000,
        host: "0.0.0.0",
        customPages: {
            "/": "index.html",
            "/home": "index.html",
            "/layouts": "index.html",
            "/null-layout": "index.html",
            "/relative-layout": "index.html",
            "/table-layout": "index.html"
        },
    }
}