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
    ],
    contentScriptOptions: {
        // Shield icons
        shieldGreenSmall: self.data.url("icons/shield_green_24.png"),
        shieldRedSmall: self.data.url("icons/shield_red_24.png"),
        shieldYellowSmall: self.data.url("icons/shield_yellow_24.png"),
        shieldRedBig: self.data.url("icons/shield_red_128.png"),

        // loading icon
        loading: self.data.url("icons/loading.gif"),

        // websites icons
        backpackTF2: self.data.url("icons/websites/bp.tf.png"),
        backpackD2: self.data.url("icons/websites/d2.bp.tf.png"),
        steamRep: self.data.url("icons/websites/sr.png"),
        steamTrades: self.data.url("icons/websites/st.png"),
        csgoValue: self.data.url("icons/websites/csgovalue.png"),
        google: self.data.url("icons/websites/google.png")
    }
});