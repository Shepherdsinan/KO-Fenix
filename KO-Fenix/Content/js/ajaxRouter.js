
function ajaxRoute(controller, arg1, arg2, arg3) {

    var url = window.location.href;
    var segments = url.split('/');

    switch (controller) {
        case "KingSystem":
        case "ForbidUsers":
        case "UserRankings":
        case "ClanRankings":
            getDataTable($BaseURL + "/JSON/" + controller, $("#frmranking").serialize());
            break;
        case "ClanProfile":
            getDataTable($BaseURL + "/JSON/" + controller + "/" + segments[4]);
            break;
        case "ValuableItems":
            if (arg1 != undefined)
                getChestContent($BaseURL + "/JSON/" + controller, "itemid=" + arg1);
            break;
        case "Upgrade":
            if (arg1 == undefined) arg1 = 1;
            getDataTable($BaseURL + "/JSON/" + controller, "upgradeid=" + arg1);
            break;
        case "Fishing":
            if (arg1 != undefined) {
                $("#pickaxeid").val(arg1);
            }
            getDataTable($BaseURL + "/JSON/" + controller, $("#frmranking").serialize());
            break;
        case "Premiums":
            if (arg1 == undefined) arg1 = 100;
            getContentHTML($BaseURL + "/JSON/" + controller + "/" + arg1);
            break;
        default:
    }
}

$(document).ready(function () {
    var url = window.location.href;
    var segments = url.split('/');
    var controller = segments[3];

    ajaxRoute(controller);
});