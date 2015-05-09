// Import the page-mod API
var pageMod = require("sdk/page-mod");

// Import the self API
var self = require("sdk/self").data;

// Import the simple-prefs API
var sp = require('sdk/simple-prefs');


pageMod.PageMod({
    include: "*.steamcommunity.com",
    contentScriptFile: [
        self.url("jquery/jquery.min.js"),
        self.url("checker.js")
    ],
    contentStyleFile: [
        self.url("styles.css")
    ],
    contentScriptOptions: {
        // Shield icons
        ShieldGreenIcon: self.url("icons/shield_green_24.png"),
        ShieldRedIcon: self.url("icons/shield_red_24.png"),
        ShieldYellowSmall: self.url("icons/shield_yellow_24.png"),
        ShieldRedIconBig: self.url("icons/shield_red_128.png"),

        // loading icon
        LoadingIcon: self.url("icons/loading.gif"),

        // websites icons
        faviconTF2Bp: self.url("icons/websites/bp.tf.png"),
        faviconDota2bp: self.url("icons/websites/d2.bp.tf.png"),
        faviconSteamgifts: self.url("icons/websites/st.png"),
        faviconCsgoValue: self.url("icons/websites/csgovalue.png"),
        faviconGoogle: self.url("icons/websites/google.png"),
        faviconSteamRep: self.url("icons/websites/sr.png"),

        faviconBazaar: self.url("icons/websites/bazaar.png"),
        faviconCsgoLounge: self.url("icons/websites/csgo_lounge.png"),
        faviconDota2Lounge: self.url("icons/websites/dota2_lounge.png"),
        faviconTf2Outpost: self.url("icons/websites/tf2outpost.png"),
        faviconTf2TradingPost: self.url("icons/websites/tf2tp.png"),
    },
    onAttach: function (worker) {
        worker.port.emit('settings', sp.prefs);
    }
});