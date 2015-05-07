/**
 * Object that holds the current addon preferences
 *
 * @type {{prefBackpack: (*|.contentScriptOptions.prefBackpack), prefDotaBP: (*|.contentScriptOptions.prefDotaBP), prefSteamgifts: (*|.contentScriptOptions.prefSteamgifts), prefCSGOValue: (.contentScriptOptions.prefCSGOvalue|*), prefGoogle: (*|.contentScriptOptions.prefGoogle)}}
 */
var Settings = {
    prefBackpack: self.options.prefBackpack,
    prefDotaBP: self.options.prefDotaBP,
    prefSteamgifts: self.options.prefSteamgifts,
    prefCSGOValue: self.options.prefCSGOvalue,
    prefGoogle: self.options.prefGoogle
};

// Update values to reflect preferences changes while the addon is attached to a page
self.port.on("prefBackpack", function (newValue) {
    Settings.prefBackpack = newValue;
});
self.port.on("prefDotaBP", function (newValue) {
    Settings.prefDotaBP = newValue;
});
self.port.on("prefSteamgifts", function (newValue) {
    Settings.prefSteamgifts = newValue;
});
self.port.on("prefCSGOvalue", function (newValue) {
    Settings.prefCSGOValue = newValue;
});
self.port.on("prefGoogle", function (newValue) {
    Settings.prefGoogle = newValue;
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
 * @type {{Loading: string, ShieldGreen: string, ShieldYellow: string, ShieldRed: string, ShieldRedBig: string, faviconTF2Bp: string, faviconDota2bp: string, faviconSteamgifts: string, faviconCsgoValue: string, faviconGoogle: string, faviconSteamrep: string}}
 */
var Icons = {
    Loading: '<image alt="loading" height="16" width="16" class="loading" src="' + self.options.LoadingIcon + '" />',

    ShieldGreen: '<image alt="trusted" height="24" width="24" src="' + self.options.ShieldGreenIcon + '" />',
    ShieldYellow: '<image alt="caution" height="24" width="24" src="' + self.options.ShieldYellowSmall + '" />',
    ShieldRed: '<image alt="scammer" height="24" width="24" src="' + self.options.ShieldRedIcon + '" />',
    ShieldRedBig: '<image alt="scammer" height="128" width="128" src="' + self.options.ShieldRedIconBig + '" style="float:left;" />',

    faviconTF2Bp: '<image alt="Backpack.tf" height="16" width="16" src="' + self.options.faviconTF2Bp + '" />',
    faviconDota2bp: '<image alt="D2.backpack.tf" height="16" width="16" src="' + self.options.faviconDota2bp + '" />',
    faviconSteamgifts: '<image alt="Steamgifts.com" height="16" width="16" src="' + self.options.faviconSteamgifts + '" />',
    faviconCsgoValue: '<image alt="CsgoValue" height="16" width="16" src="' + self.options.faviconCsgoValue + '" />',
    faviconGoogle: '<image alt="Google" height="16" width="16" src="' + self.options.faviconGoogle + '" />',

    faviconSteamrep: '<image alt="Steamrep" height="16" width="16" src="' + self.options.faviconSteamRep + '" class="src_icon" />'
};


/**
 * Create a warning dialog in case the Steam user is a known scammer
 */
function createScammerWarningDialog() {

    var dialog =
        '<div id="dialog-message" title="WARNING: SCAMMER">'
        + '<p>' + Icons.ShieldRedBig + ' This user has been marked as a scammer on SteamRep.com. </p>'
        + '<p>To protect yourself and prevent thieves from profiting, <b style="color: red;">do not trade with this person</b>.'
        + 'Players shouldn\'t be encouraged to steal. Supporting them can hurt your reputation.</p>'
        + '</div>';

    $('body').prepend(dialog);

    $("#dialog-message").dialog({
        modal: true,
        draggable: false,
        height: 285,
        width: 560,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });
}

/**
 * adds a visual feedback according to the steamrep tags
 * @param tagType steamrep tag
 * @param reputation detailed tag
 */
function tagUser(tagType, reputation) {

    switch (tagType) {
        case 'scammer':
            $('#src_rep').html(reputation);
            $('#src_rep').addClass('scammer');

            $('.playerAvatar.profile_header_size').css('background', 'red');
            $('div.profile_header_summary > div.persona_name').addClass('scammer');
            $('div.profile_header_summary > div.persona_name').prepend(Icons.ShieldRed);

            break;
        case 'caution':
            $('#src_rep').text(reputation);
            $('#src_rep').addClass('caution');

            $('.playerAvatar.profile_header_size').css('background', 'orange');
            $('div.profile_header_summary > div.persona_name').addClass('caution');
            $('div.profile_header_summary > div.persona_name').prepend(Icons.ShieldYellow);

            break;
        case 'trusted':
            $('#src_rep').text(reputation);
            $('#src_rep').addClass('trusted');

            $('.playerAvatar.profile_header_size').css('background', 'lime');
            $('div.profile_header_summary > div.persona_name').addClass('trusted');
            $('div.profile_header_summary > div.persona_name').prepend(Icons.ShieldGreen);

            break;
        default:
            $('#src_rep').text('No special rep (there might be pending reports against this user)');
            break;
    }
}

/**
 * Parses the Steamrep response
 */
function handleRep() {
    if (SteamRepInfo.Reputation == '') {
        tagUser('', SteamRepInfo.Reputation);
        findPendingReports(User.SteamID64);
    }
    else if (SteamRepInfo.Reputation.search(/(banned|scammer)/i) > -1) {
        tagUser('scammer', SteamRepInfo.Reputation);
        createScammerWarningDialog();
    }
    else if (SteamRepInfo.Reputation.search(/(admin|middleman|valve employee|trusted)/i) > -1) {
        tagUser('trusted', SteamRepInfo.Reputation);

    }
    else if (SteamRepInfo.Reputation.search(/caution/i) > -1) {
        tagUser('caution', SteamRepInfo.Reputation)
    }
}

/**
 * Queries SteamRep.com for the reputation of a user
 */
function querySteamRep() {
    var sr_api_url = 'https://steamrep.com/api/beta/reputation/' + User.SteamID64 + '?json=1&source=sr-check';

    $.ajax({
        url: sr_api_url,
        dataType: 'json'
    })
        .done(function (xml, textStatus, jqxhr) {
            srResponse = jqxhr.responseJSON;

            SteamRepInfo.Reputation = srResponse.steamrep.reputation;
            SteamRepInfo.SteamID64 = User.SteamID64;

            $('#src_rep').attr('title', SteamRepInfo.Reputation);

            handleRep(SteamRepInfo.Reputation, User.SteamID64);

        })
        .fail(function () {
            $('#src_rep').text('Error communicating with SteamRep.com. Click here to visit the website.');
        });
}

/**
 * Searches the Steamrep forums for pending reports then updates the infobox accordingly
 *
 * @param steamID64 SteamID64 of the user
 */
function findPendingReports(steamID64) {
    var sr_api_url = 'http://forums.steamrep.com/search/search/.json?keywords=' + steamID64 + '&o=date';

    $.ajax({
        url: sr_api_url,
        dataType: 'json'
    })
        .done(function (xml, textStatus, jqxhr) {

            srResponse = jqxhr.responseJSON;

            if (typeof(srResponse.status) !== 'undefined') {
                if ((srResponse.status == 'ok') && (srResponse.message == 'No results found.')) {
                    $('#src_rep').attr('title', "No special rep (0 pending reports)");
                    $('#src_rep').text('No special rep (0 pending reports)');
                }
            } else {
                $('#src_rep').attr('title', "There might be pending reports against this user");
                $('#src_rep').text('No special rep (there might be pending reports against this user)');
            }
        })
}

/**
 * Display the the SteamID64, privacy level and adds links to 3rd party websites
 * to ease the background check
 */
function displaySteamInfo() {
    $('#src_rep').attr('href', 'http://steamrep.com/profiles/' + User.SteamID64);

    var privacy = '';
    switch (User.Privacy) {
        case 'public':
            privacy = 'Public';
            break;
        case 'friendsonly':
            privacy = 'Friends Only';
            break;
        case 'usersonly':
            privacy = 'Users Only';
            break;
        case 'private':
            privacy = 'Private';
            break;
    }

    $('#steamrep_checker').append('<p><b>Profile privacy : </b>' + privacy + '</p>');

    $('#steamrep_checker').append('<p><b>Permalink : </b><a id="src_profile_permalink" href="http://steamcommunity.com/profiles/' + User.SteamID64 + '">http://steamcommunity.com/profiles/' + User.SteamID64 + '</a></p>');
    $('#steamrep_checker').append('<p><b>Pending reports : </b><a id="src_pending_reports" href="http://forums.steamrep.com/search/search/?keywords=' + User.SteamID64 + '&o=date">Search SteamRep Forums</a></p>');
    $('#steamrep_checker').append('<p><label for="src_sid64tb">SteamID64 : </label><input id="src_sid64tb" type="text" value="' + User.SteamID64 + '" readonly /></p>');


    // External websites
    $('#steamrep_checker').append('<p>');
    if (Settings.prefBackpack)
        $('#steamrep_checker').append('<a href="http://backpack.tf/profiles/' + User.SteamID64 + '">' + Icons.faviconTF2Bp + ' backpack.tf</a> | ');
    if (Settings.prefDotaBP)
        $('#steamrep_checker').append('<a href="http://dota2.backpack.tf/profiles/' + User.SteamID64 + '">' + Icons.faviconDota2bp + ' dota2.bp.tf</a> | ');
    if (Settings.prefCSGOValue)
        $('#steamrep_checker').append('<a href="http://www.csgovalue.com/?steamID=' + User.SteamID64 + '">' + Icons.faviconCsgoValue + ' csgovalue.com</a> | ');
    if (Settings.prefSteamgifts)
        $('#steamrep_checker').append('<a href="http://www.steamgifts.com/go/user/' + User.SteamID64 + '">' + Icons.faviconSteamgifts + ' Steamgifts.com</a> | ');
    if (Settings.prefGoogle)
        $('#steamrep_checker').append('<a href="https://www.google.com/search?q=' + User.SteamID64 + '">' + Icons.faviconGoogle + 'google.com</a></p>');
    $('#steamrep_checker').append('</p>');


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
            User.SteamID64 = $(xml).find("steamID64").text();
            User.IsLimitedAccount = $(xml).find("isLimitedAccount").text();
            User.TradeBanState = $(xml).find("tradeBanState").text();
            User.VacBanned = $(xml).find("vacBanned").text();
            User.Privacy = $(xml).find("privacyState").text();

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

    var infoBox =
        '<div id="src_profile_customization" class="profile_customization">'
        + '    <div id="profile_customization_header"  class="profile_customization_header ellipsis">'
        + '    ' + title
        + '    </div>'
        + '    <div class="profile_customization_block">'
        + '        <div class="customtext_showcase">'
        + '            <div class="showcase_content_bg showcase_notes">'
        + '                <div id="steamrep_checker">'
        + '                    <p>'
        + '                        ' + Icons.faviconSteamrep
        + '                        <b>Reputation : </b>'
        + '                        <a href="#" id="src_rep">'
        + '                            ' + Icons.Loading + ' Checking SteamRep...'
        + '                        </a>'
        + '                    </p>'
        + '                </div>'
        + '            </div>'
        + '        </div>'
        + '    </div>'
        + '</div>';

    // Adding the profile info box
    if ($('.profile_customization_area').length > 0) {
        $('.profile_customization_area').prepend(infoBox)
    }
    else {
        $('.profile_leftcol')
            .prepend('<div class="profile_customization_area"></div>')
            .prepend(infoBox);
    }
}

var re = new RegExp("steamcommunity.com/(?:id|profiles)/[a-zA-Z0-9_-]+[/]+$");


if (re.exec(document.location.href)) {
    createInfoBox('SteamRep Checker report');
    getSteamInfo();
}