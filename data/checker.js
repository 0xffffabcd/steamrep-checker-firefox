/**
 * # The MIT License (MIT)
 *
 * Copyright (c) 2014 Nasreddine HOURIA
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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
 * @type {{ShieldGreen: {height: number, width: number, src: *, alt: string}, ShieldYellow: {height: number, width: number, src: *, alt: string}, ShieldRed: {height: number, width: number, src: *, alt: string}, Loading: {height: number, width: number, src: *, alt: string, className: string}, fiTF2Bp: {height: number, width: number, src: *, alt: string, className: string}, fiDota2bp: {height: number, width: number, src: *, alt: string, className: string}, fiSteamgifts: {height: number, width: number, src: *, alt: string, className: string}, fiCSGOValue: {height: number, width: number, src: *, alt: string, className: string}, fiGoogle: {height: number, width: number, src: *, alt: string, className: string}, fiBazaar: {height: number, width: number, src: *, alt: string, className: string}, fiCsgoLounge: {height: number, width: number, src: *, alt: string, className: string}, fiDota2Lounge: {height: number, width: number, src: *, alt: string, class: string}, fiTf2Outpost: {height: number, width: number, src: *, alt: string, class: string}, fiTradingPost: {height: number, width: number, src: *, alt: string, class: string}, fiSteamrep: {height: number, width: number, src: *, alt: string, class: string}, ShieldRedBig: {height: number, width: number, src: *, alt: string, style: string}}}
 */
var Icons = {
    ShieldGreen: {
        height: 24, width: 24,
        src: self.options.ShieldGreenIcon,
        alt: "trusted"
    },
    ShieldYellow: {
        height: 24, width: 24,
        src: self.options.ShieldYellowSmall,
        alt: "caution"
    },
    ShieldRed: {
        height: 24, width: 24,
        src: self.options.ShieldRedIcon,
        alt: "scammer"
    },
    Loading: {
        height: 16, width: 16,
        src: self.options.LoadingIcon,
        alt: "loading",
        className: "loading"
    },
    fiTF2Bp: {
        height: 16, width: 16,
        src: self.options.faviconTF2Bp,
        alt: "Backpack.tf",
        className: "src_icon"
    },
    fiDota2bp: {
        height: 16, width: 16,
        src: self.options.faviconDota2bp,
        alt: "D2.backpack.tf",
        className: "src_icon"
    },
    fiSteamgifts: {
        height: 16, width: 16,
        src: self.options.faviconSteamgifts,
        alt: "Steamgifts",
        className: "src_icon"
    },
    fiCSGOValue: {
        height: 16, width: 16,
        src: self.options.faviconCSGOValue,
        alt: "CSGOValue",
        className: "src_icon"
    },
    fiGoogle: {
        height: 16, width: 16,
        src: self.options.faviconGoogle,
        alt: "Google",
        className: "src_icon"
    },
    fiBazaar: {
        height: 16, width: 16,
        src: self.options.faviconBazaar,
        alt: "Bazaar.tf",
        className: "src_icon"
    },
    fiCsgoLounge: {
        height: 16, width: 16,
        src: self.options.faviconCsgoLounge,
        alt: "CSGO Lounge",
        className: "src_icon"
    },
    fiDota2Lounge: {
        height: 16, width: 16,
        src: self.options.faviconDota2Lounge,
        alt: "Dota 2 Lounge",
        class: "src_icon"
    },
    fiTf2Outpost: {
        height: 16, width: 16,
        src: self.options.faviconTf2Outpost,
        alt: "Outpost",
        class: "src_icon"
    },
    fiTradingPost: {
        height: 16, width: 16,
        src: self.options.faviconTradingPost,
        alt: "Tf2 Trading Post",
        class: "src_icon"
    },
    fiSteamrep: {
        height: 16, width: 16,
        src: self.options.faviconSteamRep,
        alt: "Steamrep",
        class: "src_icon"
    },
    ShieldRedBig: {
        height: 128, width: 128,
        src: self.options.ShieldRedIconBig,
        alt: "scammer",
        style: "left"
    }
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
    imageElement.className = image.className || "";
    imageElement.style.float = image.style || "";
    return imageElement;
}

/**
 * Create a warning dialog in case the Steam user is a known scammer
 */
function createScammerWarningDialog() {

    var scammerWarningDialog = document.createElement('div');
    scammerWarningDialog.id = "openModal";
    scammerWarningDialog.setAttribute("class", "modalDialog");

    var warningDialogInnerDiv = document.createElement('div');

    var dialogCloseLink = document.createElement('a');
    dialogCloseLink.setAttribute("class", "close");
    dialogCloseLink.href = "javascript:";
    dialogCloseLink.title = "Close";
    dialogCloseLink.textContent = "\u2716";
    dialogCloseLink.addEventListener('click', function () {
        document.getElementById("openModal").style.opacity = 0;
        document.getElementById("openModal").style.pointerEvents = "none";
    });

    var dialogTitle = document.createElement('h2');
    dialogTitle.textContent = 'WARNING: SCAMMER';

    var dialogFirstParag = document.createElement('p');
    dialogFirstParag.textContent = ' This user has been marked as a scammer on SteamRep.com. ';
    dialogFirstParag.insertBefore(createImageElement(Icons.ShieldRedBig), dialogFirstParag.firstChild);

    warningDialogInnerDiv.appendChild(dialogCloseLink);
    warningDialogInnerDiv.appendChild(dialogTitle);
    warningDialogInnerDiv.appendChild(dialogFirstParag);
    var dialogSecondParag = document.createElement('p');
    dialogSecondParag.textContent = "To protect yourself and prevent thieves from profiting, do not trade " +
        "with this person. Players shouldn't be encouraged to steal. Supporting them can hurt your reputation";
    warningDialogInnerDiv.appendChild(dialogSecondParag);

    scammerWarningDialog.appendChild(warningDialogInnerDiv);

    document.body.insertBefore(scammerWarningDialog, document.body.children[0]);
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
            srcRepElement.textContent = " " + reputation;
            srcRepElement.className = "scammer";

            document.querySelector('.playerAvatar.profile_header_size').style.border = "2px solid #F00";
            personaName.className = personaName.className + " scammer";
            personaName.insertBefore(createImageElement(Icons.ShieldRed), personaName.firstElementChild);
            break;
        case "caution":
            srcRepElement.textContent = " " + reputation;
            srcRepElement.className = "caution";

            document.querySelector('.playerAvatar.profile_header_size').style.border = "2px solid orange";
            personaName.className = personaName.className + " caution";
            personaName.insertBefore(createImageElement(Icons.ShieldYellow), personaName.firstElementChild);
            break;
        case "trusted":
            srcRepElement.textContent = " " + reputation;
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
    var src_rep = document.getElementById('src_rep');

    $.ajax({
        url: sr_api_url,
        dataType: "json"
    }).done(function (xml, textStatus, jqxhr) {
        var srResponse = jqxhr.responseJSON;
        SteamRepInfo.Reputation = srResponse.steamrep.reputation;
        SteamRepInfo.SteamID64 = User.SteamID64;
        src_rep.title = SteamRepInfo.Reputation;

        handleRep(SteamRepInfo.Reputation, User.SteamID64);
    }).fail(function () {
        src_rep.textContent = "Error communicating with SteamRep.com. Click here to visit the website.";
    });
}

/**
 * Searches the Steamrep forums for pending reports then updates the infobox accordingly
 *
 * @param steamID64 SteamID64 of the user
 */
function findPendingReports(steamID64) {
    var sr_reports_url = "http://forums.steamrep.com/search/search/.json?keywords=" + steamID64 + "&o=date";
    var src_rep = document.getElementById('src_rep');

    $.ajax({
        url: sr_reports_url,
        dataType: "json"
    }).done(function (xml, textStatus, jqxhr) {

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
    }).fail(function () {
        src_rep.textContent = "Error communicating with SteamRep.com. Click here to visit the website.";
    });
}


/**
 * Display the the SteamID64, privacy level and adds links to 3rd party websites
 * to ease the background check
 */
function displaySteamInfo() {
    var src_rep = document.getElementById('src_rep');
    src_rep.href = "http://steamrep.com/profiles/" + User.SteamID64;

    var privacy = "";
    switch (User.Privacy) {
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
    var privacyBold = document.createElement('b');
    privacyBold.textContent = 'Profile privacy : ';
    privacyParag.appendChild(privacyBold);
    privacyParag.appendChild(document.createTextNode(privacy));

    var permalinkParag = document.createElement('p');

    var permalinkBold = document.createElement('b');
    permalinkBold.textContent = 'Permalink : ';

    permalinkParag.appendChild(permalinkBold);

    var permalink = document.createElement('a');
    permalink.textContent = 'https://steamcommunity.com/profiles/' + User.SteamID64;
    permalink.href = 'https://steamcommunity.com/profiles/' + User.SteamID64;
    permalink.id = 'src_profile_permalink';

    permalinkParag.appendChild(permalink);

    var pendingReportsParag = document.createElement('p');

    var boldPendingReports = document.createElement('b');
    boldPendingReports.textContent = 'Pending reports : ';

    pendingReportsParag.appendChild(boldPendingReports);

    var pendingReportsLink = document.createElement('a');
    pendingReportsLink.textContent = 'Search SteamRep Forums';
    pendingReportsLink.id = 'src_pending_reports';
    pendingReportsLink.href = 'http://forums.steamrep.com/search/search/?keywords=' + User.SteamID64 + '&o=date';

    pendingReportsParag.appendChild(pendingReportsLink);

    var id64Box = document.createElement('p');

    var id64Label = document.createElement('label');
    id64Label.textContent = 'SteamID64 : ';
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
            document.getElementById('src_rep').textContent = 'Error getting the SteamID64';
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

        var clearDiv = document.createElement('div');
        clearDiv.style.clear = 'both';

        document.querySelector('.profile_content_inner').appendChild(clearDiv);
    }
}

createInfoBox('SteamRep Checker Report');
getSteamInfo();
