/**
 * Object that holds the current addon preferences
 *
 * @type {{prefBackpack: boolean, prefDotaBP: boolean, prefSteamgifts: boolean, prefCSGOValue: boolean, prefGoogle: boolean, prefCsgoLounge: boolean, prefDota2Lounge: boolean, prefTf2Outpost: boolean, prefTf2TradingPost: boolean}}
 */
var Settings = {
    prefBackpack: true,
    prefDotaBP: true,
    prefSteamgifts: true,
    prefCSGOValue: true,
    prefGoogle: true,
    prefBazaar: true,
    prefCsgoLounge: true,
    prefDota2Lounge: true,
    prefTf2Outpost: true,
    prefTf2TradingPost: true
};


/**
 * Update values to reflect preferences changes while the addon is attached to a page
 */
self.port.on("settings", function (newValue) {
    Settings.prefBackpack = newValue.prefBackpack;
    Settings.prefDotaBP = newValue.prefDotaBP;
    Settings.prefSteamgifts = newValue.prefSteamgifts;
    Settings.prefCSGOValue = newValue.prefCSGOValue;
    Settings.prefGoogle = newValue.prefGoogle;
    Settings.prefBazaar = newValue.prefBazaar;
    Settings.prefCsgoLounge = newValue.prefCsgoLounge;
    Settings.prefDota2Lounge = newValue.prefDota2Lounge;
    Settings.prefTf2Outpost = newValue.prefTf2Outpost;
    Settings.prefTf2TradingPost = newValue.prefTf2TradingPost;
});


/**
 * Steam user object
 *
 * @type {{SteamID64: string, VacBanned: string, TradeBanState: string, IsLimitedAccount: string, Privacy: string}}
 */
var User = {
    SteamID64: '',
    VacBanned: '',
    TradeBanState: '',
    IsLimitedAccount: '',
    Privacy: ''
};

/**
 * SteamRep response object
 *
 * @type {{SteamID64: string, Reputation: string}}
 */
var SteamRepInfo = {
    SteamID64: '',
    Reputation: ''
};

/**
 * Icons
 *
 * Shield Icons by paomedia (https://github.com/paomedia/small-n-flat)
 * licensed under CC0 which is available here: https://github.com/paomedia/small-n-flat/blob/master/LICENSE
 *
 * @type {{ShieldGreen: {height: number, width: number, src: *, alt: string}, ShieldYellow: {height: number, width: number, src: *, alt: string}, ShieldRed: {height: number, width: number, src: *, alt: string}, Loading: {height: number, width: number, src: *, alt: string, class: string}, fiTF2Bp: {height: number, width: number, src: *, alt: string, class: string}, fiDota2bp: {height: number, width: number, src: *, alt: string, class: string}, fiSteamgifts: {height: number, width: number, src: *, alt: string, class: string}, fiCSGOValue: {height: number, width: number, src: *, alt: string, class: string}, fiGoogle: {height: number, width: number, src: *, alt: string, class: string}, fiBazaar: {height: number, width: number, src: *, alt: string, class: string}, fiCsgoLounge: {height: number, width: number, src: *, alt: string, class: string}, fiDota2Lounge: {height: number, width: number, src: *, alt: string, class: string}, fiTf2Outpost: {height: number, width: number, src: *, alt: string, class: string}, fiTradingPost: {height: number, width: number, src: *, alt: string, class: string}, fiSteamrep: {height: number, width: number, src: *, alt: string, class: string}, ShieldRedBig: {height: number, width: number, src: *, alt: string, style: string}}}
 */
var Icons = {
    ShieldGreen:   { height: 24,  width: 24,  src: self.options.ShieldGreenIcon, alt: "trusted"},
    ShieldYellow:  { height: 24,  width: 24,  src: self.options.ShieldYellowSmall, alt: "caution"},
    ShieldRed:     { height: 24,  width: 24,  src: self.options.ShieldRedIcon, alt: "scammer"},
    Loading:       { height: 16,  width: 16,  src: self.options.LoadingIcon, alt: "loading", className: "loading"},
    fiTF2Bp:       { height: 16,  width: 16,  src: self.options.faviconTF2Bp, alt: "Backpack.tf", className: "src_icon"},
    fiDota2bp:     { height: 16,  width: 16,  src: self.options.faviconDota2bp, alt: "D2.backpack.tf", className: "src_icon"},
    fiSteamgifts:  { height: 16,  width: 16,  src: self.options.faviconSteamgifts, alt: "Steamgifts", className: "src_icon"},
    fiCSGOValue:   { height: 16,  width: 16,  src: self.options.faviconCSGOValue, alt: "CSGOValue", className: "src_icon"},
    fiGoogle:      { height: 16,  width: 16,  src: self.options.faviconGoogle, alt: "Google", className: "src_icon"},
    fiBazaar:      { height: 16,  width: 16,  src: self.options.faviconBazaar, alt: "Bazaar.tf", className: "src_icon"},
    fiCsgoLounge:  { height: 16,  width: 16,  src: self.options.faviconCsgoLounge, alt: "CSGO Lounge", className: "src_icon" },
    fiDota2Lounge: { height: 16,  width: 16,  src: self.options.faviconDota2Lounge, alt: "Dota 2 Lounge", class: "src_icon" },
    fiTf2Outpost:  { height: 16,  width: 16,  src: self.options.faviconTf2Outpost, alt: "Outpost", class: "src_icon"},
    fiTradingPost: { height: 16,  width: 16,  src: self.options.faviconTradingPost, alt: "Tf2 Trading Post", class: "src_icon" },
    fiSteamrep:    { height: 16,  width: 16,  src: self.options.faviconSteamRep, alt: "Steamrep", class: "src_icon"},
    ShieldRedBig:  { height: 128, width: 128, src: self.options.ShieldRedIconBig, alt: "scammer", style: "float:left;"}
};

/**
 * create an image element
 * @param image
 * @returns {Element}
 */
function createImageElement(image) {
    var imageElement = document.createElement("img");
    imageElement.height = image.height;
    imageElement.width = image.width;
    imageElement.src = image.src;
    imageElement.alt = image.alt;
    imageElement.setAttribute("class", image.className || "");
    imageElement.style = image.style || "";
    return imageElement;
}

/**
 * create an element and initialize its text content
 * @param tagName tag name
 * @param textContent text content
 * @returns {Element}
 */
function createElementWithText(tagName, textContent) {
    var element = document.createElement(tagName);
    element.textContent = textContent;
    return element;
}

/**
 * Create a warning dialog in case the Steam user is a known scammer
 */
function createScammerWarningDialog() {

    var dlg = document.createElement('div');
    dlg.id = "openModal";
    dlg.setAttribute("class", "modalDialog");

    var innerDiv = document.createElement('div');

    var closeModalLink = document.createElement('a');
    closeModalLink.setAttribute("class", "close");
    closeModalLink.href = "javascript:";
    closeModalLink.title = "Close";
    closeModalLink.textContent = "\u2716";
    closeModalLink.addEventListener('click', function () {
        document.getElementById("openModal").style.opacity = 0;
        document.getElementById("openModal").style.pointerEvents = "none";
    });

    var dialogTitle = createElementWithText('h2', 'WARNING: SCAMMER');
    var dlgParag = createElementWithText('p', ' This user has been marked as a scammer on SteamRep.com. ');
    dlgParag.insertBefore(createImageElement(Icons.ShieldRedBig), dlgParag.firstChild);

    innerDiv.appendChild(closeModalLink);
    innerDiv.appendChild(dialogTitle);
    innerDiv.appendChild(dlgParag);
    innerDiv.appendChild(createElementWithText('p', "To protect yourself and prevent thieves from profiting, do not trade " +
        "with this person. Players shouldn't be encouraged to steal. Supporting them can hurt your reputation"));

    dlg.appendChild(innerDiv);

    document.body.insertBefore(dlg, document.body.children[0]);
}

/**
 * adds a visual feedback according to the steamrep tags
 * @param tagType steamrep tag
 * @param reputation detailed tag
 */
function tagUser(tagType, reputation) {
    var srcRepElement = document.getElementById('src_rep');
    var personaName = document.querySelector('.actual_persona_name');
    switch (tagType) {
        case "scammer":
            srcRepElement.textContent = reputation;
            srcRepElement.className = "scammer";

            document.querySelector('.playerAvatar.profile_header_size').style.border = "2px solid #F00";
            personaName.className = personaName.className + " scammer";
            personaName.insertBefore(createImageElement(Icons.ShieldRed), personaName.firstElementChild);
            break;
        case "caution":
            srcRepElement.textContent = reputation;
            srcRepElement.className = "caution";

            document.querySelector('.playerAvatar.profile_header_size').style.border = "2px solid orange";
            personaName.className = personaName.className + " caution";
            personaName.insertBefore(createImageElement(Icons.ShieldYellow), personaName.firstElementChild);
            break;
        case "trusted":
            srcRepElement.textContent = reputation;
            srcRepElement.className = "trusted";

            document.querySelector('.playerAvatar.profile_header_size').style.border = "2px solid lime";
            personaName.className = personaName.className + " trusted";
            personaName.insertBefore(createImageElement(Icons.ShieldGreen), personaName.firstElementChild);
            break;
        default:
            srcRepElement.textContent = "No special rep (there might be pending reports against this user)";
            break;
    }
}

/**
 * Parses the Steamrep response
 */
function handleRep() {
    if (SteamRepInfo.Reputation == "") {
        tagUser("", SteamRepInfo.Reputation);
        findPendingReports(User.SteamID64);
    }
    else if (SteamRepInfo.Reputation.search(/(banned|scammer)/i) > -1) {
        tagUser("scammer", SteamRepInfo.Reputation);
        createScammerWarningDialog();
    }
    else if (SteamRepInfo.Reputation.search(/(admin|middleman|valve employee|trusted)/i) > -1) {
        tagUser("trusted", SteamRepInfo.Reputation);

    }
    else if (SteamRepInfo.Reputation.search(/caution/i) > -1) {
        tagUser("caution", SteamRepInfo.Reputation)
    }
}


/**
 * Queries SteamRep.com for the reputation of a user
 */
function querySteamRep() {
    var sr_api_url = "https://steamrep.com/api/beta/reputation/" + User.SteamID64 + "?json=1&source=sr-check";

    $.ajax({
        url: sr_api_url,
        dataType: "json"
    }).done(function (xml, textStatus, jqxhr) {
        var srResponse = jqxhr.responseJSON;

        SteamRepInfo.Reputation = srResponse.steamrep.reputation;
        SteamRepInfo.SteamID64 = User.SteamID64;

        $("#src_rep").attr("title", SteamRepInfo.Reputation);

        handleRep(SteamRepInfo.Reputation, User.SteamID64);

    }).fail(function () {
        $("#src_rep").text("Error communicating with SteamRep.com. Click here to visit the website.");
    });
}

/**
 * Searches the Steamrep forums for pending reports then updates the infobox accordingly
 *
 * @param steamID64 SteamID64 of the user
 */
function findPendingReports(steamID64) {
    var sr_api_url = "http://forums.steamrep.com/search/search/.json?keywords=" + steamID64 + "&o=date";

    $.ajax({
            url: sr_api_url,
            dataType: "json"
        })
        .done(function (xml, textStatus, jqxhr) {

            var srResponse = jqxhr.responseJSON;
            var srcRepElement = document.getElementById('src_rep');
            if (typeof(srResponse.status) !== "undefined") {
                if ((srResponse.status == "ok") && (srResponse.message == "No results found.")) {
                    srcRepElement.title = "No special rep (0 pending reports)";
                    srcRepElement.textContent = " No special rep (0 pending reports)";
                }
            } else {
                srcRepElement.title = "There might be pending reports against this user";
                srcRepElement.textContent = "No special rep (there might be pending reports against this user)";
            }
        })
}


/**
 * Display the the SteamID64, privacy level and adds links to 3rd party websites
 * to ease the background check
 */
function displaySteamInfo() {
    $("#src_rep").attr("href", "http://steamrep.com/profiles/" + User.SteamID64);

    var privacy = "";
    switch (privacy) {
        case "public":
            privacy = "Public";
            break;
        case "friendsonly":
            privacy = "Friends Only";
            break;
        case "usersonly":
            privacy = "Users Only";
            break;
        case "private":
            privacy = "Private";
            break;
    }

    var srcElement = document.getElementById('steamrep_checker');

    var privacyParag = document.createElement('p');
    privacyParag.appendChild(createElementWithText('b', 'Profile privacy : '));
    privacyParag.appendChild(document.createTextNode(privacy));

    var permalinkParag = document.createElement('p');
    permalinkParag.appendChild(createElementWithText('b', 'Permalink : '));

    var permalink = createElementWithText('a', 'http://steamcommunity.com/profiles/' + User.SteamID64);
    permalink.href = 'http://steamcommunity.com/profiles/' + User.SteamID64;
    permalink.id = 'src_profile_permalink';
    permalinkParag.appendChild(permalink);

    var pendingReportsParag = document.createElement('p');
    pendingReportsParag.appendChild(createElementWithText('b', 'Pending reports : '));
    var pendingReportsLink = createElementWithText('a', 'Search SteamRep Forums');
    pendingReportsLink.id = 'src_pending_reports';
    pendingReportsLink.href = 'http://forums.steamrep.com/search/search/?keywords=' + User.SteamID64 + '&o=date';
    pendingReportsParag.appendChild(pendingReportsLink);

    var id64Box = document.createElement('p');

    var id64Label = createElementWithText('label', 'SteamID64 : ');
    id64Label.for = 'src_sid64tb';

    var id64Input = document.createElement('input');
    id64Input.id = 'src_sid64tb';
    id64Input.type = 'text';
    id64Input.value = User.SteamID64;
    id64Label.readOnly = 'readonly';

    id64Box.appendChild(id64Label);
    id64Box.appendChild(id64Input);

    srcElement.appendChild(privacyParag);
    srcElement.appendChild(permalinkParag);
    srcElement.appendChild(pendingReportsParag);
    srcElement.appendChild(id64Box);


    // External websites
    var extLinks = document.createElement('ul');
    extLinks.id = 'ext_links';

    var src = document.getElementById('steamrep_checker');
    src.appendChild(extLinks);

    if (Settings.prefBackpack)
        extLinks.appendChild(addExtLink('http://backpack.tf/profiles/', createImageElement(Icons.fiTF2Bp), 'Backpack.tf'));
    if (Settings.prefDotaBP)
        extLinks.appendChild(addExtLink('http://dota2.backpack.tf/profiles/', createImageElement(Icons.fiDota2bp), 'Dota2.BP.TF'));
    if (Settings.prefCSGOValue)
        extLinks.appendChild(addExtLink('http://www.CSGOValue.com/?steamID=', createImageElement(Icons.fiCSGOValue), 'CSGOValue.com'));
    if (Settings.prefSteamgifts)
        extLinks.appendChild(addExtLink('http://www.steamgifts.com/go/user/', createImageElement(Icons.fiSteamgifts), 'SteamGifts.com'));
    if (Settings.prefGoogle)
        extLinks.appendChild(addExtLink('https://www.google.com/search?q=', createImageElement(Icons.fiGoogle), 'Google'));
    if (Settings.prefBazaar)
        extLinks.appendChild(addExtLink('http://bazaar.tf/profiles/', createImageElement(Icons.fiBazaar), 'Bazaar.tf'));
    if (Settings.prefCsgoLounge)
        extLinks.appendChild(addExtLink('http://csgolounge.com/profile?id=', createImageElement(Icons.fiCsgoLounge), 'CSGO Lounge'));
    if (Settings.prefDota2Lounge)
        extLinks.appendChild(addExtLink('http://dota2lounge.com/profile?id=', createImageElement(Icons.fiDota2Lounge), 'Dota2Lounge.com'));
    if (Settings.prefTf2Outpost)
        extLinks.appendChild(addExtLink('http://www.tf2outpost.com/user/', createImageElement(Icons.fiTf2Outpost), 'TF2Outpost.com'));
    if (Settings.prefTf2TradingPost)
        extLinks.appendChild(addExtLink('http://tf2tp.com/user/', createImageElement(Icons.fiTradingPost), 'TF2TP.com'));

}

/**
 * Add a link to the external websites links list
 * @param href website url
 * @param image image element
 * @param text link text
 * @returns {Element} li element
 */
function addExtLink(href, image, text) {
    var element = document.createElement('li');
    var link = document.createElement('a');
    link.href = href + User.SteamID64;
    link.textContent = ' ' + text;
    link.insertBefore(image, link.firstChild);
    element.appendChild(link);

    return element;
}

/**
 * retrieve the SteamID64 and the privacy level of a Steam profile
 */
function getSteamInfo() {
    var url = document.location.href + '/?xml=1';

    $.ajax({
            url: url,
            dataType: 'xml'
        })
        .done(function (xml) {
            var jqXml = $(xml);
            User.SteamID64 = jqXml.find("steamID64").text();
            User.IsLimitedAccount = jqXml.find("isLimitedAccount").text();
            User.TradeBanState = jqXml.find("tradeBanState").text();
            User.VacBanned = jqXml.find("vacBanned").text();
            User.Privacy = jqXml.find("privacyState").text();

            displaySteamInfo();
            querySteamRep(User.SteamID64);
        })
        .fail(function () {
            $('#src_rep').text('Error getting the SteamID64');
        });
}

/**
 * Create a custom info box on a Steam profile
 *
 * @param title title of the infobox
 */
function createInfoBox(title) {

    var link = document.createElement('a');
    link.href = '#';
    link.id = 'src_rep';
    link.innerText = ' Checking Steamrep....';
    link.insertBefore(createImageElement(Icons.Loading), link.firstChild);

    var b = document.createElement('b');
    b.text = 'Reputation : ';

    var p = document.createElement('p');
    p.appendChild(createImageElement(Icons.fiSteamrep));
    p.appendChild(b);
    p.appendChild(link);

    var srcDiv = document.createElement('div');
    srcDiv.id = 'steamrep_checker';
    srcDiv.appendChild(p);

    var sccbg = document.createElement('div');
    sccbg.className = 'showcase_content_bg showcase_notes';
    sccbg.appendChild(srcDiv);

    var ctsc = document.createElement('div');
    ctsc.className = 'customtext_showcase';
    ctsc.appendChild(sccbg);

    var profileCustomBlockDiv = document.createElement('div');
    profileCustomBlockDiv.className = 'profile_customization_block';
    profileCustomBlockDiv.appendChild(ctsc);


    var profileCustomHeaderDiv = document.createElement('div');
    profileCustomHeaderDiv.id = 'profile_customization_header';
    profileCustomHeaderDiv.className = 'profile_customization_header ellipsis';
    profileCustomHeaderDiv.textContent = title;

    var infobox = document.createElement('div');
    infobox.setAttribute("id", "src_profile_customization");
    infobox.className = "profile_customization";
    infobox.appendChild(profileCustomHeaderDiv);
    infobox.appendChild(profileCustomBlockDiv);


    var elements = document.getElementsByClassName('profile_customization_area');

    if (elements.length > 0) {
        elements[0].insertBefore(infobox, elements[0].firstChild)
    } else {
        var customizationAreaDiv = document.createElement('div');
        customizationAreaDiv.className = 'profile_customization_area';

        var leftCol = document.querySelector('.profile_leftcol');

        customizationAreaDiv.appendChild(infobox);
        leftCol.insertBefore(customizationAreaDiv, leftCol.firstElementChild);
    }
}

createInfoBox('SteamRep Checker Report');
getSteamInfo();
