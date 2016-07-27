module.exports = {
    'dev': {
        root: "dist/",
        port: 3000,
        host: "0.0.0.0",
        customPages: {
            "/": "index.html",
            "/home": "index.html",
            "/getting-started": "index.html",
            "/getting-started/model": "index.html",
            "/getting-started/view": "index.html",
            "/getting-started/controller": "index.html",
            "/getting-started/application": "index.html",
            "/layouts": "index.html",
            "/layouts/null-layout": "index.html",
            "/layouts/relative-layout": "index.html",
            "/layouts/table-layout": "index.html",
            "/layouts/linear-layout": "index.html",
            "/navigation": "index.html",
            "/translation": "index.html",
            "/form": "index.html",
            "/table": "index.html",
            "/table/users": "index.html",
            "/table/users/type/online": "index.html",
            "/table/users/type/offline": "index.html",
            "/json/users.json?type=online": "json/online.json",
            "/json/users.json?type=offline": "json/offline.json",
            "/json/translation.json?id=1": "json/prevod.json",
            "/about": "index.html",
            "/not-found": "index.html"
        },
        openBrowser: true
    }
}