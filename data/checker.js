/**
 * Crate a warning dialog in case the Steam user is a known scammer
 */
function createScammerWarningDialog() {
    var scammer_big_icon = '<img alt="scammer" width="128" height="128"  style="float:left;" src="'+ self.options.shieldRedBig +'" />';

    var dialog =
        '<div id="dialog-message" title="WARNING: SCAMMER">'
            + '<p>' + scammer_big_icon + ' This user has been marked as a scammer on SteamRep.com. </p>'
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

    // Shield Icons
    // by paomedia (https://github.com/paomedia/small-n-flat)
    // licensed under CC0 which is available here: https://github.com/paomedia/small-n-flat/blob/master/LICENSE
    var caution_icon = '<img alt="caution" width="24" height="24" src="'+ self.options.shieldYellowSmall +'" />';
    var trusted_icon = '<img alt="trusted" width="24" height="24"  src="'+ self.options.shieldGreenSmall +'" />';
    var scammer_icon = '<img alt="scammer" width="24" height="24"  src="'+ self.options.shieldRedSmall +'" />';

    switch (tagType) {
        case 'scammer':
            $('#src_rep').html(reputation);
            $('#src_rep').addClass('scammer');

            $('.playerAvatar.profile_header_size').css('background', 'red');
            $('div.profile_header_summary > div.persona_name').addClass('scammer');
            $('div.profile_header_summary > div.persona_name').prepend(scammer_icon);

            break;
        case 'caution':
            $('#src_rep').text(reputation);
            $('#src_rep').addClass('caution');

            $('.playerAvatar.profile_header_size').css('background', 'orange');
            $('div.profile_header_summary > div.persona_name').addClass('caution');
            $('div.profile_header_summary > div.persona_name').prepend(caution_icon);

            break;
        case 'trusted':
            $('#src_rep').text(reputation);
            $('#src_rep').addClass('trusted');

            $('.playerAvatar.profile_header_size').css('background', 'lime');
            $('div.profile_header_summary > div.persona_name').addClass('trusted');
            $('div.profile_header_summary > div.persona_name').prepend(trusted_icon);

            break;
        default:
			$('#src_rep').text('No special rep (there might be pending reports against this user)');
			break;
    }
}

/**
 * Parses the Steamrep response
 * @param reputation Steamrep response
 * @param steamID64 SteamID64 of the user
 */
function handleRep(reputation, steamID64) {
    if (reputation == '') {
        tagUser('', reputation);
		findPendingReports(steamID64);
    }
    else if (reputation.search(/(banned|scammer)/i) > -1) {
        tagUser('scammer', reputation);
        createScammerWarningDialog();
    }
    else if (reputation.search(/(admin|middleman|valve employee|trusted)/i) > -1) {
        tagUser('trusted', reputation);

    }
    else if (reputation.search(/caution/i) > -1) {
        tagUser('caution', reputation)
    }
}

/**
 * Queries SteamRep.com for the reputation of a user
 *
 * @param steamID64 SteamID64 of the user
 */
function querySteamRep(steamID64) {
    var sr_api_url = 'https://steamrep.com/api/beta/reputation/' + steamID64 + '?json=1&source=sr-check';

    $.ajax({
        url: sr_api_url,
        dataType: 'json'
    })
        .done(function (xml, textStatus, jqxhr) {
            srResponse = jqxhr.responseJSON;

            $('#src_rep').attr('title', srResponse.steamrep.reputation);

            handleRep(srResponse.steamrep.reputation, steamID64);

        })
        .fail(function (e) {
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
			
			if (typeof(srResponse.status) !== 'undefined'){
				if((srResponse.status == 'ok') && (srResponse.message == 'No results found.'))
				{
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
 *
 * @param steamID64 SteamID64 of the user
 * @param privacy privacy level of the profile
 */
function displaySteamInfo(steamID64, privacy)
{
    $('#src_rep').attr('href', 'http://steamrep.com/profiles/' + steamID64);

    switch (privacy){
        case 'public':
            $('#steamrep_checker').append('<p><b>Profile privacy : </b>Public</p>');
            break;
        case 'friendsonly':
            $('#steamrep_checker').append('<p><b>Profile privacy : </b>Friends Only</p>');
            break;
        case 'usersonly':
            $('#steamrep_checker').append('<p><b>Profile privacy : </b>Users Only</p>');
            break;
        case 'private':
            $('#steamrep_checker').append('<p><b>Profile privacy : </b>Private</p>');
            break;
    }

    $('#steamrep_checker').append('<p><b>Permalink : </b><a id="src_profile_permalink" href="http://steamcommunity.com/profiles/' + steamID64 + '">http://steamcommunity.com/profiles/' + steamID64 + '</a></p>');
    $('#steamrep_checker').append('<p><b>Pending reports : </b><a id="src_pending_reports" href="http://forums.steamrep.com/search/search/?keywords=' + steamID64 + '&o=date">Search SteamRep Forum</a></p>');
    $('#steamrep_checker').append('<p><label for="src_sid64tb">SteamID64 : </label><input id="src_sid64tb" type="text" value="' + steamID64 + '" readonly /></p>');


    // website icons
    var tf2bp_icon = '<img alt="backpack.tf" width="16" height="16" class="src_icon" src="'+ self.options.backpackTF2 +'" />';
    var dota2bp_icon = '<img alt="dota2.backpack.tf" width="16" height="16" class="src_icon" src="'+ self.options.backpackD2 +'" />';
    var st_icon = '<img alt="steamtrades.com" width="16" height="16" class="src_icon" src="'+ self.options.steamTrades +'" />';
    var csgovalue_icon = '<img alt="csgovalue.com" width="16" height="16" class="src_icon" src="'+ self.options.csgoValue +'" />';
    var google_icon = '<img alt="google.com" width="16" height="16" class="src_icon" src="'+ self.options.google +'" />';


    $('#steamrep_checker').append('<p>' + tf2bp_icon + '<a href="http://backpack.tf/profiles/' + steamID64 + '">backpack.tf</a> | '
        + dota2bp_icon + '<a href="http://dota2.backpack.tf/profiles/' + steamID64 + '">dota2.bp.tf</a> | '
        + csgovalue_icon + '<a href="http://www.csgovalue.com/?id=' + steamID64 + '">csgovalue.com</a> | '
        + st_icon + '<a href="http://www.steamtrades.com/user/id/' + steamID64 + '">steamtrades.com</a> | '
        + google_icon + '<a href="https://www.google.com/search?q=' + steamID64 + '">google.com</a></p>');
}

/**
 * retrieve the SteamID64 and the privacy level of a Steam profile
 */
function getSteamInfo()
{
    var url = document.location.origin + document.location.pathname + '/?xml=1';

    $.ajax({
        url: url,
        dataType: 'xml'
    })
    .done(function (xml) {
        var steamID64 = $(xml).find("steamID64").text();
        var privacy = $(xml).find("privacyState").text();

        displaySteamInfo(steamID64, privacy);
        querySteamRep(steamID64);
    })
    .fail(function (e) {
        $('#src_rep').text('Error getting the SteamID64');
    });
}

/**
 * Create a custom info box on a Steam profile
 *
 * @param title title of the infobox
 */
function createInfoBox(title){

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
            + '                        <img alt="steamrep.com" width="16" height="16" class="src_icon" src="'+ self.options.steamRep +'" />'
            + '                        <b>Reputation : </b>'
            + '                        <a href="#" id="src_rep">'
            + '                            <img alt="loading" width="16" height="16" class="loading" src="'+ self.options.loading +'" /> Checking SteamRep...'
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

var re = new RegExp("steamcommunity.com/(?:id|profiles)/[a-zA-Z0-9_]+[/]{0,1}$");


if (re.exec(document.location.origin + document.location.pathname)) {
    createInfoBox('SteamRep Check report');
    getSteamInfo();
}