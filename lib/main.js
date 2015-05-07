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
        self.url("jquery/jquery-ui.min.js"),
        self.url("checker.js")
    ],
    contentStyleFile: [
        self.url("jquery/jquery-ui.min.css"),
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

        // Preferences
        prefBackpack: sp.prefs['prefBackpack'],
        prefDotaBP: sp.prefs['prefDotaBP'],
        prefSteamgifts: sp.prefs['prefSteamgifts'],
        prefCSGOvalue: sp.prefs['prefCSGOvalue'],
        prefGoogle: sp.prefs['prefGoogle']

    },
    onAttach: function (worker) {
        sp.on('', function (prefName) {
            console.log(prefName + ' Has changed');
            worker.port.emit('prefBackpack', sp.prefs['prefBackpack']);
            worker.port.emit('prefDotaBP', sp.prefs['prefDotaBP']);
            worker.port.emit('prefSteamgifts', sp.prefs['prefSteamgifts']);
            worker.port.emit('prefCSGOvalue', sp.prefs['prefCSGOvalue']);
            worker.port.emit('prefGoogle', sp.prefs['prefGoogle']);
        });

    }
});