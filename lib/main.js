// Import the page-mod API
var pageMod = require("sdk/page-mod");

// Import the self API
var self = require("sdk/self");

pageMod.PageMod({
    include: "*.steamcommunity.com",
    contentScriptFile: [
        self.data.url("jquery/jquery-2.1.1.min.js"),
        self.data.url("jquery/jquery-ui.min.js"),
        self.data.url("checker.js")
    ],
    contentStyleFile: [
        self.data.url("jquery/jquery-ui.min.css"),
        self.data.url("styles.css")
    ]
});