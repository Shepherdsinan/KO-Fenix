
$('body').bind('contextmenu', function (e) {
    //return false;
});

$(window).load(function () {
    $("#content_loading").fadeOut("slow");
})

$(function () {
    ItemUpdate();
    Tooltip.initialize();

    //if (window.location.hostname != "oraclegamer.net" && window.location.hostname != "www.oraclegamer.net" && window.location.hostname != "panel.oraclegamer.net") {
    //    window.location = "http://www.oraclegamer.net";
    //}

});
function round(value, precision, mode) {

    var m, f, isHalf, sgn // helper variables
    // making sure precision is intfeger
    precision |= 0
    m = Math.pow(10, precision)
    value *= m
    // sign of the number
    sgn = (value > 0) | -(value < 0)
    isHalf = value % 1 === 0.5 * sgn
    f = Math.floor(value)

    if (isHalf) {
        switch (mode) {
            case 'PHP_ROUND_HALF_DOWN':
                // rounds .5 toward zero
                value = f + (sgn < 0)
                break
            case 'PHP_ROUND_HALF_EVEN':
                // rouds .5 towards the next even integer
                value = f + (f % 2 * sgn)
                break
            case 'PHP_ROUND_HALF_ODD':
                // rounds .5 towards the next odd integer
                value = f + !(f % 2)
                break
            default:
                // rounds .5 away from zero
                value = f + (sgn > 0)
        }
    }

    return (isHalf ? value : Math.round(value)) / m
}

function ItemUpdate() {
    $("#content_x").show();
    $(document).keypress(function (e) {
        if (e.which == 117) {
            if ($("#char").css('display') == 'none') {
                $("#char").show("slow");
            } else {
                $("#char").hide("slow");
            }
        }
        if (e.which == 305) {
            if ($("#items_v2").css('display') == 'none') {
                $("#items_v2").show("items");
            } else {
                $("#items_v2").hide("items");
            }
        }
    });
    
    $(".izone").html(UserData.ZoneName);
    $(".ix").html(parseInt(UserData.PosX / 100));
    $(".iy").html(parseInt(UserData.PosZ / 100));
    $(".iusername").html(UserData.UserName);
    $(".iexp").html(UserData.Exp + " / " + parseInt((UserData.RebirthLevel > 0 ? UserData.RebirthReqExp : UserData.NormalReqExp)));
    var ExpPercent = round(UserData.Exp / (UserData.RebirthLevel ? UserData.RebirthReqExp : UserData.NormalReqExp) * 100, 2);
    $(".exp").html("EXP: " + ExpPercent + " %");
    $(".exp_line").css("width", ExpPercent - ((ExpPercent / 100) * 25) + "%");
    $(".ilevel").html(UserData.Level + (UserData.RebirthLevel > 0 ? " / " + UserData.RebirthLevel : ""));
    $(".imaxhp").html(UserData.Hp);
    $(".imaxmp").html(UserData.Mp);
    $(".ination").html((UserData.Nation == 1 ? 'Karus' : 'El Morad'));
    $(".iattack").html(0);
    $(".idefance").html(0);
    $(".istr").html(UserData.Strong);
    $(".idex").html(UserData.Dex);
    $(".iint").html(UserData.Intel);
    $(".imp").html(UserData.Cha);
    $(".ihp").html(UserData.Sta);
    $(".imanner").html(UserData.MannerPoint);
    $(".iattack").html(0);
    $(".idefance").html(0);
    $(".ipoints").html(UserData.Points);
    $(".iclasstext").html(UserData.ClassText);
    $(".inp").html(UserData.Loyalty + " / " + UserData.LoyaltyMonthly);

    if (UserData.ZoneID == 1) {
        $("#userprofile_content").css('background-image', 'url(' + $FileURL + "/images/inventory/1.png" + ')');
    } else if (UserData.ZoneID == 21) {                                               
        $("#userprofile_content").css('background-image', 'url(' + $FileURL + "/images/inventory/2.png" + ')');
    } else if (UserData.ZoneID == 30) {                                               
        $("#userprofile_content").css('background-image', 'url(' + $FileURL + "/images/inventory/21.png" + ')');
    } else if (UserData.ZoneID == 71) {                                               
        $("#userprofile_content").css('background-image', 'url(' + $FileURL + "/images/inventory/71.png" + ')');
    } else {                                                                         
        $("#userprofile_content").css('background-image', 'url(' + $FileURL + "/images/inventory/21.png" + ')');
    }

    $("#hotup, #hotdown").on("click", function () {
        var num = $("#hotnum").text();
        if (this.id == "hotup") {
            if (num > 1) {
                $("#hot" + num).hide();
                num--;
                $("#hot" + num).show();
            }
        }
        else {
            var tot = 8;
            if (num != tot) {
                $("#hot" + num).hide();
                num++;
                $("#hot" + num).show();
            }
        }
        $("#hotnum").text(num);
    });


    $("A.close, #skillclose").on("click", function () {
        $(this).parent().hide("slow");
    });

    $("A.nav").on("click", function () {
        var name = this.id.replace("btn", "");
        if (name == "loaditems") $("#char").hide();
        if (name == "items") $("#skill").hide();
        if (name == "skill") $("#items_v2").hide();
        if (name == "town") $("#skill,#items_v2,#char,#loaditems").hide();
        else $("#" + name).toggle("normal");
    });

    $("A.taboff, A.tab").on("click", function () {
        if (this.className == "tab") return;
        $("#" + $("A.tab").text()).hide();
        $("A.tab").removeClass("tab").addClass("taboff");
        $(this).removeClass("taboff").addClass("tab");
        $("#" + $(this).text()).show();
    });


    $("A.skilltaboff, A.skilltab").on("click", function () {
        if (this.className == "skilltab") return;
        $("#" + $("A.skilltab").text() + ":visible").hide();
        $("A.skilltab").removeClass("skilltab").addClass("skilltaboff");
        $(this).removeClass("skilltaboff").addClass("skilltab");
        SelTab = this.id.charAt(3);//tab0
        FillSkills();
        ColorSkills();
    });

    $("#pageright, #pageleft").on("click", function () {
        var oPage = $("#pagenum");
        var pages = oPage.text().split("/");
        var selpage = pages[0];
        var totalpages = pages[1];

        if (this.id == "pageleft") {
            if (selpage > 1) {
                $("#page" + selpage).hide();
                selpage--;
                $("#page" + selpage).show();
            }
        }
        else {
            if (selpage != totalpages) {
                $("#page" + selpage).hide();
                selpage++;
                $("#page" + selpage).show();
            }
        }
        oPage.text(selpage + "/" + totalpages);
    });

   // FillFriends();
   // FillBuffs();
   // FillSavedMagics();
    ColorStats();
    LoadItems();

    /* GÖRÜNENLER */
    function LoadItems() {

        ItemSlots = new Array()
        ItemSlots[0] = new Array()
        ItemSlots[0]["Left"] = 375;
        ItemSlots[0]["Top"] = 41;

        ItemSlots[1] = new Array()
        ItemSlots[1]["Left"] = 421;
        ItemSlots[1]["Top"] = 41;

        ItemSlots[2] = new Array()
        ItemSlots[2]["Left"] = 467;
        ItemSlots[2]["Top"] = 41;



        ItemSlots[3] = new Array()
        ItemSlots[3]["Left"] = 375;
        ItemSlots[3]["Top"] = 87;

        ItemSlots[4] = new Array()
        ItemSlots[4]["Left"] = 421;
        ItemSlots[4]["Top"] = 87;

        ItemSlots[5] = new Array()
        ItemSlots[5]["Left"] = 467;
        ItemSlots[5]["Top"] = 87;



        ItemSlots[6] = new Array()
        ItemSlots[6]["Left"] = 375;
        ItemSlots[6]["Top"] = 135;

        ItemSlots[7] = new Array()
        ItemSlots[7]["Left"] = 421;
        ItemSlots[7]["Top"] = 135;

        ItemSlots[8] = new Array()
        ItemSlots[8]["Left"] = 467;
        ItemSlots[8]["Top"] = 135;



        ItemSlots[9] = new Array()
        ItemSlots[9]["Left"] = 375;
        ItemSlots[9]["Top"] = 181;

        ItemSlots[10] = new Array()
        ItemSlots[10]["Left"] = 421;
        ItemSlots[10]["Top"] = 181;

        ItemSlots[11] = new Array()
        ItemSlots[11]["Left"] = 467;
        ItemSlots[11]["Top"] = 181;



        ItemSlots[12] = new Array()
        ItemSlots[12]["Left"] = 375;
        ItemSlots[12]["Top"] = 228;

        ItemSlots[13] = new Array()
        ItemSlots[13]["Left"] = 421;
        ItemSlots[13]["Top"] = 228;


        /*
    	
        */

        ItemSlots[14] = new Array()
        ItemSlots[14]["Left"] = 208;
        ItemSlots[14]["Top"] = 286;

        ItemSlots[15] = new Array()
        ItemSlots[15]["Left"] = 252;
        ItemSlots[15]["Top"] = 286;

        ItemSlots[16] = new Array()
        ItemSlots[16]["Left"] = 295;
        ItemSlots[16]["Top"] = 286;

        ItemSlots[17] = new Array()
        ItemSlots[17]["Left"] = 339;
        ItemSlots[17]["Top"] = 286;

        ItemSlots[18] = new Array()
        ItemSlots[18]["Left"] = 382;
        ItemSlots[18]["Top"] = 286;

        ItemSlots[19] = new Array()
        ItemSlots[19]["Left"] = 426;
        ItemSlots[19]["Top"] = 286;

        ItemSlots[20] = new Array()
        ItemSlots[20]["Left"] = 469;
        ItemSlots[20]["Top"] = 286;

        /*
    	
        */

        ItemSlots[21] = new Array()
        ItemSlots[21]["Left"] = 208;
        ItemSlots[21]["Top"] = 329;

        ItemSlots[22] = new Array()
        ItemSlots[22]["Left"] = 252;
        ItemSlots[22]["Top"] = 329;

        ItemSlots[23] = new Array()
        ItemSlots[23]["Left"] = 295;
        ItemSlots[23]["Top"] = 329;

        ItemSlots[24] = new Array()
        ItemSlots[24]["Left"] = 339;
        ItemSlots[24]["Top"] = 329;

        ItemSlots[25] = new Array()
        ItemSlots[25]["Left"] = 382;
        ItemSlots[25]["Top"] = 329;

        ItemSlots[26] = new Array()
        ItemSlots[26]["Left"] = 426;
        ItemSlots[26]["Top"] = 329;

        ItemSlots[27] = new Array()
        ItemSlots[27]["Left"] = 469;
        ItemSlots[27]["Top"] = 329;

        /*
    	
        */

        ItemSlots[28] = new Array()
        ItemSlots[28]["Left"] = 208;
        ItemSlots[28]["Top"] = 373;

        ItemSlots[29] = new Array()
        ItemSlots[29]["Left"] = 252;
        ItemSlots[29]["Top"] = 373;

        ItemSlots[30] = new Array()
        ItemSlots[30]["Left"] = 295;
        ItemSlots[30]["Top"] = 373;

        ItemSlots[31] = new Array()
        ItemSlots[31]["Left"] = 339;
        ItemSlots[31]["Top"] = 373;

        ItemSlots[32] = new Array()
        ItemSlots[32]["Left"] = 382;
        ItemSlots[32]["Top"] = 373;

        ItemSlots[33] = new Array()
        ItemSlots[33]["Left"] = 426;
        ItemSlots[33]["Top"] = 373;

        ItemSlots[34] = new Array()
        ItemSlots[34]["Left"] = 469;
        ItemSlots[34]["Top"] = 373;

        /*
    	
        */

        ItemSlots[35] = new Array()
        ItemSlots[35]["Left"] = 208;
        ItemSlots[35]["Top"] = 416;

        ItemSlots[36] = new Array()
        ItemSlots[36]["Left"] = 252;
        ItemSlots[36]["Top"] = 416;

        ItemSlots[37] = new Array()
        ItemSlots[37]["Left"] = 295;
        ItemSlots[37]["Top"] = 416;

        ItemSlots[38] = new Array()
        ItemSlots[38]["Left"] = 339;
        ItemSlots[38]["Top"] = 416;

        ItemSlots[39] = new Array()
        ItemSlots[39]["Left"] = 382;
        ItemSlots[39]["Top"] = 416;

        ItemSlots[40] = new Array()
        ItemSlots[40]["Left"] = 426;
        ItemSlots[40]["Top"] = 416;

        ItemSlots[41] = new Array()
        ItemSlots[41]["Left"] = 469;
        ItemSlots[41]["Top"] = 416;


        /* GÖRÜNMEYENLER */


        ItemSlots[42] = new Array()
        ItemSlots[42]["Left"] = 72;
        ItemSlots[42]["Top"] = 64;

        ItemSlots[43] = new Array()
        ItemSlots[43]["Left"] = 72;
        ItemSlots[43]["Top"] = 18;

        ItemSlots[44] = new Array()
        ItemSlots[44]["Left"] = 25;
        ItemSlots[44]["Top"] = 64;

        ItemSlots[45] = new Array()
        ItemSlots[45]["Left"] = 119;
        ItemSlots[45]["Top"] = 64;

        ItemSlots[46] = new Array()
        ItemSlots[46]["Left"] = 72;
        ItemSlots[46]["Top"] = 112;

        ItemSlots[47] = new Array()
        ItemSlots[47]["Left"] = 49;
        ItemSlots[47]["Top"] = 180;

        ItemSlots[48] = new Array()
        ItemSlots[48]["Left"] = 98;
        ItemSlots[48]["Top"] = 180;

        ItemSlots[49] = new Array()
        ItemSlots[49]["Left"] = 119;
        ItemSlots[49]["Top"] = 18;

        ItemSlots[50] = new Array()
        ItemSlots[50]["Left"] = 25;
        ItemSlots[50]["Top"] = 18;

        ItemSlots[51] = new Array()
        ItemSlots[51]["Left"] = 26;
        ItemSlots[51]["Top"] = 261;

        ItemSlots[52] = new Array()
        ItemSlots[52]["Left"] = 71;
        ItemSlots[52]["Top"] = 261;

        ItemSlots[53] = new Array()
        ItemSlots[53]["Left"] = 117;
        ItemSlots[53]["Top"] = 261;


        ItemSlots[54] = new Array()
        ItemSlots[54]["Left"] = 26;
        ItemSlots[54]["Top"] = 309;

        ItemSlots[55] = new Array()
        ItemSlots[55]["Left"] = 71;
        ItemSlots[55]["Top"] = 309;

        ItemSlots[56] = new Array()
        ItemSlots[56]["Left"] = 117;
        ItemSlots[56]["Top"] = 309;

        ItemSlots[57] = new Array()
        ItemSlots[57]["Left"] = 26;
        ItemSlots[57]["Top"] = 352;

        ItemSlots[58] = new Array()
        ItemSlots[58]["Left"] = 71;
        ItemSlots[58]["Top"] = 352;

        ItemSlots[59] = new Array()
        ItemSlots[59]["Left"] = 117;
        ItemSlots[59]["Top"] = 352;

        ItemSlots[60] = new Array()
        ItemSlots[60]["Left"] = 26;
        ItemSlots[60]["Top"] = 398;

        ItemSlots[61] = new Array()
        ItemSlots[61]["Left"] = 71;
        ItemSlots[61]["Top"] = 398;

        ItemSlots[62] = new Array()
        ItemSlots[62]["Left"] = 117;
        ItemSlots[62]["Top"] = 398;


        /*				
        */
        ItemSlots[63] = new Array()
        ItemSlots[63]["Left"] = 26;
        ItemSlots[63]["Top"] = 261;

        ItemSlots[64] = new Array()
        ItemSlots[64]["Left"] = 71;
        ItemSlots[64]["Top"] = 261;

        ItemSlots[65] = new Array()
        ItemSlots[65]["Left"] = 117;
        ItemSlots[65]["Top"] = 261;


        ItemSlots[66] = new Array()
        ItemSlots[66]["Left"] = 26;
        ItemSlots[66]["Top"] = 309;

        ItemSlots[67] = new Array()
        ItemSlots[67]["Left"] = 71;
        ItemSlots[67]["Top"] = 309;

        ItemSlots[68] = new Array()
        ItemSlots[68]["Left"] = 117;
        ItemSlots[68]["Top"] = 309;

        ItemSlots[69] = new Array()
        ItemSlots[69]["Left"] = 26;
        ItemSlots[69]["Top"] = 352;

        ItemSlots[70] = new Array()
        ItemSlots[70]["Left"] = 71;
        ItemSlots[70]["Top"] = 352;

        ItemSlots[71] = new Array()
        ItemSlots[71]["Left"] = 117;
        ItemSlots[71]["Top"] = 352;

        ItemSlots[72] = new Array()
        ItemSlots[72]["Left"] = 26;
        ItemSlots[72]["Top"] = 398;

        ItemSlots[73] = new Array()
        ItemSlots[73]["Left"] = 71;
        ItemSlots[73]["Top"] = 398;

        ItemSlots[74] = new Array()
        ItemSlots[74]["Left"] = 117;
        ItemSlots[74]["Top"] = 398;


        var firer = icer = lightr = magicr = curser = posionr = daggerac = swordac = axeac = clubac = jamadarac = spearac = arrowac = 0;
        var istrb = idexb = iintb = impb = ihpb = 0;
        var weight = 0;

        for (var r = 0; r < UserData.Items.length; r++) {

            var ItemCount = '';
            var Flag = '';

            if (UserData.Items[r].ItemInfo != null) {

                if (UserData.Items[r].ItemInfo.Countable == 1) {
                    ItemCount = UserData.Items[r].ItemCount;
                }

                if (UserData.Items[r].ItemInfo.Countable == 0 && UserData.Items[r].ItemInfo.Effect1 > 0 && UserData.Items[r].ItemInfo.Kind != 151) {
                    ItemCount = UserData.Items[r].ItemDuration;
                }

            }
            if (UserData.Items[r].ItemFlag == 8)
                Flag = '<div class="binded"></div>';

            if (UserData.Items[r].ItemFlag == 4)
                Flag = '<div class="sealed"></div>';

            if (UserData.Items[r].ItemFlag == 1)
                Flag = '<div class="rented"></div>';

            if (UserData.Items[r].ItemFlag == 3)
                Flag = '<div class="dublicated"></div>';


            if (UserData.Items[r].ItemInfo != null) {
                if (UserData.Items[r].SlotID >= 51 && UserData.Items[r].SlotID <= 62) {
                    $("#items_v2 .corpse_page .bag1").append('<div data-tip="' + ItemDetail(r, UserData) + '" style="left:' + ItemSlots[UserData.Items[r].SlotID]["Left"] + 'px;top:' + ItemSlots[UserData.Items[r].SlotID]["Top"] + 'px;background-image:url(' + UserData.Items[r].ItemInfo.ItemIconImg + ');" class="iconx">' + Flag + '<span class="itemcount">' + ItemCount + '</span></div>');
                } else if (UserData.Items[r].SlotID >= 63) {
                    $("#items_v2 .corpse_page .bag2").append('<div data-tip="' + ItemDetail(r, UserData) + '" style="left:' + ItemSlots[UserData.Items[r].SlotID]["Left"] + 'px;top:' + ItemSlots[UserData.Items[r].SlotID]["Top"] + 'px;background-image:url(' + UserData.Items[r].ItemInfo.ItemIconImg + ');" class="iconx">' + Flag + '<span class="itemcount">' + ItemCount + '</span></div>');
                } else if (UserData.Items[r].SlotID >= 42) {
                    $("#items_v2 .corpse_page").append('<div data-tip="' + ItemDetail(r, UserData) + '" style="left:' + ItemSlots[UserData.Items[r].SlotID]["Left"] + 'px;top:' + ItemSlots[UserData.Items[r].SlotID]["Top"] + 'px;background-image:url(' + UserData.Items[r].ItemInfo.ItemIconImg + ');" class="iconx">' + Flag + '<span class="itemcount">' + ItemCount + '</span></div>');
                } else {
                    $("#items_v2").append('<div data-tip="' + ItemDetail(r, UserData) + '" style="left:' + ItemSlots[UserData.Items[r].SlotID]["Left"] + 'px;top:' + ItemSlots[UserData.Items[r].SlotID]["Top"] + 'px;background-image:url(' + UserData.Items[r].ItemInfo.ItemIconImg + ');" class="iconx">' + Flag + '<span class="itemcount">' + ItemCount + '</span></div>');
                }
            }

            if (UserData.Items[r].SlotID <= 13) {
                // Resistance
                if (UserData.Items[r].ItemInfo != null) {
                    if (UserData.Items[r].ItemInfo.FireR > 0)
                        firer += parseInt(UserData.Items[r].ItemInfo.FireR);
                    if (UserData.Items[r].ItemInfo.ColdR > 0)
                        icer += parseInt(UserData.Items[r].ItemInfo.ColdR);
                    if (UserData.Items[r].ItemInfo.LightningR > 0)
                        lightr += parseInt(UserData.Items[r].ItemInfo.LightningR);
                    if (UserData.Items[r].ItemInfo.MagicR > 0)
                        magicr += parseInt(UserData.Items[r].ItemInfo.MagicR);
                    if (UserData.Items[r].ItemInfo.CurseR > 0)
                        curser += parseInt(UserData.Items[r].ItemInfo.CurseR);
                    if (UserData.Items[r].ItemInfo.PoisonR > 0)
                        posionr += parseInt(UserData.Items[r].ItemInfo.PoisonR);

                    // Antidefs
                    if (UserData.Items[r].ItemInfo.DaggerAc > 0)
                        daggerac += parseInt(UserData.Items[r].ItemInfo.DaggerAc);
                    if (UserData.Items[r].ItemInfo.SwordAc > 0)
                        swordac += parseInt(UserData.Items[r].ItemInfo.SwordAc);
                    if (UserData.Items[r].ItemInfo.SpearAc > 0)
                        spearac += parseInt(UserData.Items[r].ItemInfo.SpearAc);
                    if (UserData.Items[r].ItemInfo.AxeAc > 0)
                        axeac += parseInt(UserData.Items[r].ItemInfo.AxeAc);
                    if (UserData.Items[r].ItemInfo.ClubAc > 0)
                        clubac += parseInt(UserData.Items[r].ItemInfo.ClubAc);
                    if (UserData.Items[r].ItemInfo.JamadarAc > 0)
                        jamadarac += parseInt(UserData.Items[r].ItemInfo.JamadarAc);
                    if (UserData.Items[r].ItemInfo.ArrowAc > 0)
                        arrowac += parseInt(UserData.Items[r].ItemInfo.ArrowAc);

                    // Stats 
                    if (UserData.Items[r].ItemInfo.StrB > 0)
                        istrb += parseInt(UserData.Items[r].ItemInfo.StrB);
                    if (UserData.Items[r].ItemInfo.StaB > 0)
                        ihpb += parseInt(UserData.Items[r].ItemInfo.StaB);
                    if (UserData.Items[r].ItemInfo.DexB > 0)
                        idexb += parseInt(UserData.Items[r].ItemInfo.DexB);
                    if (UserData.Items[r].ItemInfo.IntelB > 0)
                        iintb += parseInt(UserData.Items[r].ItemInfo.IntelB);
                    if (UserData.Items[r].ItemInfo.ChaB > 0)
                        impb += parseInt(UserData.Items[r].ItemInfo.ChaB);

                    // Stats
                    //if (UserData.Items[r].SetItem != null) {
                    //    if (UserData.Items[r].SetItem.StrengthBonus > 0)
                    //        istrb += parseInt(UserData.Items[r].SetItem.StrengthBonus);
                    //    if (UserData.Items[r].SetItem.StaminaBonus > 0)
                    //        ihpb += parseInt(UserData.Items[r].SetItem.StaminaBonus);
                    //    if (UserData.Items[r].SetItem.DexterityBonus > 0)
                    //        idexb += parseInt(UserData.Items[r].SetItem.DexterityBonus);
                    //    if (UserData.Items[r].SetItem.IntelBonus > 0)
                    //        iintb += parseInt(UserData.Items[r].SetItem.IntelBonus);
                    //    if (UserData.Items[r].SetItem.CharismaBonus > 0)
                    //        impb += parseInt(UserData.Items[r].SetItem.CharismaBonus);


                    //}
                }
            }
            if (UserData.Items[r].ItemInfo != null) {
                weight += parseInt(UserData.Items[r].ItemInfo.Weight);
            }
        }


        $(".slot_47").click(function () {
            $(".bag2").hide("slow");
            $(".bag1").show("slow");
        });

        $(".slot_48").click(function () {
            $(".bag2").show("slow");
            $(".bag1").hide("slow");
        });

        var istr = $(".istr").text();
        var idex = $(".idex").text();
        var iint = $(".iint").text();
        var imp = $(".imp").text();
        var ihp = $(".ihp").text();

        $(".ifirer").html(firer);
        $(".iicer").html(icer);
        $(".ilightr").html(lightr);
        $(".imagicr").html(magicr);
        $(".icurser").html(curser);
        $(".iposionr").html(posionr);
        $(".idaggerac").html(daggerac);
        $(".ijamadarac").html(jamadarac);
        $(".iswordac").html(swordac);
        $(".iclubac").html(clubac);
        $(".iaxeac").html(axeac);
        $(".ispearac").html(spearac);
        $(".iarrowac").html(arrowac);

        if (istrb > 0)
            $(".istr").html(istr + "(+" + istrb + ")");

        if (idexb > 0)
            $(".idex").html(idex + "(+" + idexb + ")");

        if (iintb > 0)
            $(".iint").html(iint + "(+" + iintb + ")");

        if (impb > 0)
            $(".imp").html(imp + "(+" + impb + ")");

        if (ihpb > 0)
            $(".ihp").html(ihp + "(+" + ihpb + ")");


        var m_bMaxWeightAmount = 100;
        var totalweight = ((((parseInt(istr) + parseInt(istrb)) + parseInt(hpbar.Lv)) * 50) * (m_bMaxWeightAmount <= 0 ? 1 : m_bMaxWeightAmount / 100));
        $("#weight").html((weight / 10) + " / " + (totalweight / 10));
    }

}
function ItemDetail(Index, UserData) {


    var item = UserData.Items[Index];

    var strUserID = 'test';

    if (item.ItemInfo == null) {
        return 'Item doesnt exist.';
    }

    var strName = item.ItemInfo.strName.replace("<selfname>", strUserID).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

    var result = '';

    if (item.ItemInfo.Race > 100 && item.ItemInfo.Race < 200 && item.ItemInfo.ItemType == 5) {
        result += '<div id="item_v2"><h1 class="type_setitem">' + strName + '</h1>';
    } else {
        result += '<div id="item_v2"><h1 class="type_' + item.ItemInfo.ItemType + '">' + strName + '</h1>';
    }

    item.ItemInfo.ItemType = parseInt(item.ItemInfo.ItemType);

    if (item.ItemInfo.Race > 100 && item.ItemInfo.Race < 200 && item.ItemInfo.ItemType == 5) {
        result += '<h2 class="type_setitem">(Set Item)</h1>';
    } else {
        switch (item.ItemInfo.ItemType) {
            case 1:
                result += '<h2 class="type_' + item.ItemInfo.ItemType + '">(Magic Item)</h1>';
                break;
            case 2:
                result += '<h2 class="type_' + item.ItemInfo.ItemType + '">(Rare Item)</h1>';
                break;
            case 3:
                result += '<h2 class="type_' + item.ItemInfo.ItemType + '">(Craft Item)</h1>';
                break;
            case 4:
                result += '<h2 class="type_' + item.ItemInfo.ItemType + '">(Unique Item)</h1>';
                break;
            case 5:
                result += '<h2 class="type_' + item.ItemInfo.ItemType + '">(Upgrade Item)</h1>';
                break;
            case 6:
                result += '<h2 class="type_' + item.ItemInfo.ItemType + '">(Event Item)</h1>';
                break;
            case 7:
                result += '<h2 class="type_' + item.ItemInfo.ItemType + '">(Familliar Item)</h1>';
                break;
            case 8:
            case 9:
                result += '<h2 class="type_' + item.ItemInfo.ItemType + '">(Cospre Item)</h1>';
                break;
            case 11:
                result += '<h2 class="type_' + item.ItemInfo.ItemType + '">(Reverse upgrade Item)</h1>';
                break;
            case 12:
                result += '<h2 class="type_' + item.ItemInfo.ItemType + '">(Reverse unique Item)</h1>';
                break;
        }
    }

    item.ItemInfo.Kind = parseInt(item.ItemInfo.Kind);

    switch (item.ItemInfo.Kind) {
        case 120:
            result += '<h3>Arrow</h1>';
            break;
        case 94:
            result += '<h3>Belt</h1>';
            break;
        case 70:
            result += '<h3>Bow</h1>';
            break;
        case 71:
            result += '<h3>Crossbow</h1>';
            break;
        case 11:
            result += '<h3>Dagger</h1>';
            break;
        case 91:
            result += '<h3>Earring</h1>';
            break;
        case 130:
            result += '<h3>Javelin</h1>';
            break;
        case 95:
            result += '<h3>Lune Item</h1>';
            break;
        case 230:
            result += '<h3>Magician Armor</h1>';
            break;
        case 92:
            result += '<h3>Necklace</h1>';
            break;
        case 31:
            result += '<h3>One-handed Axe</h1>';
            break;
        case 41:
            result += '<h3>One-handed Club</h1>';
            break;
        case 51:
            result += '<h3>One-handed Spear</h1>';
            break;
        case 21:
            result += '<h3>One-handed Sword</h1>';
            break;
        case 255:
            result += '<h3>PUS Item</h1>';
            break;
        case 240:
            result += '<h3>Priest Armor</h1>';
            break;
        case 0:
            result += '<h3>Rewards</h1>';
            break;
        case 93:
            result += '<h3>Ring</h1>';
            break;
        case 220:
            result += '<h3>Rogue Armor</h1>';
            break;
        case 98:
            result += '<h3>Scroll</h1>';
            break;
        case 60:
            result += '<h3>Shield</h1>';
            break;
        case 110:
            result += '<h3>Staff</h1>';
            break;
        case 97:
            result += '<h3>Sundries</h1>';
            break;
        case 32:
            result += '<h3>two-handed Axe</h1>';
            break;
        case 42:
            result += '<h3>Two-handed Club</h1>';
            break;
        case 52:
            result += '<h3>Two-handed Spear</h1>';
            break;
        case 22:
            result += '<h3>Two-handed Sword</h1>';
            break;
        case 210:
            result += '<h3>Warrior Armor</h1>';
            break;
        default:

            break;
    }

    item.ItemInfo.Class = parseInt(item.ItemInfo.Class);
    switch (item.ItemInfo.Class) {
        case 1:
            result += '<h3>Warrior</h1>';
            break;
        case 2:
            result += '<h3>Rogue</h1>';
            break;
        case 3:
            result += '<h3>Magician</h1>';
            break;
        case 4:
            result += '<h3>Priest</h1>';
            break;
        case 10:
            result += '<h3>Pet Magician</h1>';
            break;
        case 12:
            result += '<h3>Cursing Priest</h1>';
            break;
        case 13:
            result += '<h3>Porutu Army</h1>';
            break;
        case 8:
            result += '<h3>Assassin</h1>';
            break;
        case 6:
            result += '<h3>Defansive Warrior</h1>';
            break;
        case 21:
            result += '<h3>Excusively for 2nd Job Change</h1>';
            break;
        case 15:
            result += '<h3>Dafne Hero/Bureka Master Army</h1>';
            break;
        default:

            break;
    }

    result += '<ul>';

    if (item.ItemInfo.Damage > 0)
        result += '<li>Attack Power: ' + item.ItemInfo.Damage + '</li>';

    item.ItemInfo.Delay = parseInt(item.ItemInfo.Delay);
    switch (item.ItemInfo.Delay) {
        case 200:
        case 164:
            result += '<li>Attack Speed: Very Slow</li>';
            break;
        case 150:
        case 149:
        case 139:
            result += '<li>Attack Speed: Slow</li>';
            break;
        case 129:
        case 119:
        case 114:
            result += '<li>Attack Speed: Normal</li>';
            break;
        case 109:
            result += '<li>Attack Speed: Fast</li>';
            break;
    }

    if (item.ItemInfo.Range != 0)
        result += '<li>Effective Range: ' + item.ItemInfo.Range + '</li>';

    if (item.ItemInfo.Weight != 0)
        result += '<li>Weighgt: ' + item.ItemInfo.Weight + '</li>';

    if (item.ItemInfo.Duration > 1) {
        var percent = '(%' + parseInt((((item.ItemInfo.Duration - item.ItemDuration) / item.ItemInfo.Duration) * 100)) + ')';
        result += '<li>Max durability: ' + item.ItemInfo.Duration + ' ' + (percent > 0 ? percent : '') + '</li>';
    }

    if (item.ItemInfo.Ac != 0)
        result += '<li>Defense Ability: ' + item.ItemInfo.Ac + '</li>';

    if (item.ItemInfo.DaggerAc != 0)
        result += '<li class="type_3">Defense Ability (Dagger): ' + item.ItemInfo.DaggerAc + '</li>';

    if (item.ItemInfo.SwordAc != 0)
        result += '<li class="type_3">Defense Ability (Sword): ' + item.ItemInfo.SwordAc + '</li>';

    if (item.ItemInfo.MaceAc != 0)
        result += '<li class="type_3">Defense Ability (Club): ' + item.ItemInfo.MaceAc + '</li>';

    if (item.ItemInfo.AxeAc != 0)
        result += '<li class="type_3">Defense Ability (Axe): ' + item.ItemInfo.AxeAc + '</li>';

    if (item.ItemInfo.SpearAc != 0)
        result += '<li class="type_3">Defense Ability (Spear): ' + item.ItemInfo.SpearAc + '</li>';

    if (item.ItemInfo.BowAc != 0)
        result += '<li class="type_3">Defense Ability (Arrow): ' + item.ItemInfo.BowAc + '</li>';

    if (item.ItemInfo.FireDamage != 0)
        result += '<li class="type_3">Flame Damage: ' + item.ItemInfo.FireDamage + '</li>';

    if (item.ItemInfo.IceDamage != 0)
        result += '<li class="type_3">Glacier Damage: ' + item.ItemInfo.IceDamage + '</li>';

    if (item.ItemInfo.LightningDamage != 0)
        result += '<li class="type_3">Lightning Damage: ' + item.ItemInfo.LightningDamage + '</li>';

    if (item.ItemInfo.PoisonDamage != 0)
        result += '<li class="type_3">Poison Damage: ' + item.ItemInfo.PoisonDamage + '</li>';

    if (item.ItemInfo.HPDrain != 0)
        result += '<li class="type_3">HP Recovery: ' + item.ItemInfo.HPDrain + '</li>';

    if (item.ItemInfo.MPDrain != 0)
        result += '<li class="type_3">MP Recovery: ' + item.ItemInfo.MPDrain + '</li>';

    if (item.ItemInfo.MirrorDamage != 0)
        result += '<li class="type_3">Repel Physical Attack: ' + item.ItemInfo.MirrorDamage + '</li>';

    if (item.ItemInfo.StrB != 0)
        result += '<li class="type_3">Strength Bonus: ' + item.ItemInfo.StrB + '</li>';

    if (item.ItemInfo.StaB != 0)
        result += '<li class="type_3">Health Bonus: ' + item.ItemInfo.StaB + '</li>';

    if (item.ItemInfo.DexB != 0)
        result += '<li class="type_3">Dextery Bonus: ' + item.ItemInfo.DexB + '</li>';

    if (item.ItemInfo.IntelB != 0)
        result += '<li class="type_3">Intelligence Bonus: ' + item.ItemInfo.IntelB + '</li>';

    if (item.ItemInfo.ChaB != 0)
        result += '<li class="type_3">Magic Power Bonus: ' + item.ItemInfo.ChaB + '</li>';

    if (item.ItemInfo.MaxHpB != 0)
        result += '<li class="type_3">HP Bonus: ' + item.ItemInfo.MaxHpB + '</li>';

    if (item.ItemInfo.MaxMpB != 0)
        result += '<li class="type_3">MP Bonus: ' + item.ItemInfo.MaxMpB + '</li>';

    if (item.ItemInfo.FireR != 0)
        result += '<li class="type_3">Resistance to Flame: ' + item.ItemInfo.FireR + '</li>';

    if (item.ItemInfo.ColdR != 0)
        result += '<li class="type_3">Resistance to Glacier: ' + item.ItemInfo.ColdR + '</li>';

    if (item.ItemInfo.LightningR != 0)
        result += '<li class="type_3">Resistance to Lightning: ' + item.ItemInfo.LightningR + '</li>';

    if (item.ItemInfo.MagicR != 0)
        result += '<li class="type_3">Resistance to Magic: ' + item.ItemInfo.MagicR + '</li>';

    if (item.ItemInfo.PoisonR != 0)
        result += '<li class="type_3">Resistance to Poison: ' + item.ItemInfo.PoisonR + '</li>';

    if (item.ItemInfo.CurseR != 0)
        result += '<li class="type_3">Resistance to Curse: ' + item.ItemInfo.CurseR + '</li>';

    if (item.ItemInfo.ReqStr != 0)
        result += '<li>Required Strength: ' + item.ItemInfo.ReqStr + '</li>';

    if (item.ItemInfo.ReqSta != 0)
        result += '<li>Required Health: ' + item.ItemInfo.ReqSta + '</li>';

    if (item.ItemInfo.ReqDex != 0)
        result += '<li>Required Dextery: ' + item.ItemInfo.ReqDex + '</li>';

    if (item.ItemInfo.ReqIntel != 0)
        result += '<li>Required Intelligence: ' + item.ItemInfo.ReqIntel + '</li>';

    if (item.ItemInfo.ReqCha != 0)
        result += '<li>Required Magic Power: ' + item.ItemInfo.ReqCha + '</li>';

    if (item.SetItem != null) {

        if (item.SetItem.XPBonusPercent > 0)
            result += '<li class="type_3">Cospre option : EXP+%' + item.SetItem.XPBonusPercent + '</li>';

        if (item.SetItem.CoinBonusPercent > 0)
            result += '<li class="type_3">Cospre option : Noah+%' + item.SetItem.CoinBonusPercent + '</li>';

        if (item.SetItem.ACBonus > 0)
            result += '<li class="type_3">Cospre option : Defense +' + item.SetItem.ACBonus + '</li>';

        if (item.SetItem.HPBonus > 0)
            result += '<li class="type_3">Cospre option : HP+' + item.SetItem.HPBonus + '</li>';

        if (item.SetItem.APBonusPercent > 0)
            result += '<li class="type_3">Cospre option : Damage +%' + item.SetItem.APBonusPercent + ' increase</li>';

        if (item.SetItem.NPBonus > 0)
            result += '<li class="type_3">Cospre option : CONT +' + item.SetItem.NPBonus + 'e</li>';

        if (item.SetItem.APBonusClassType > 0) {
            if (item.SetItem.APBonusClassType == 1)
                result += '<li class="type_3">Cospre option : Damage to Warrior +%' + item.SetItem.APBonusClassPercent + ' increase</li>';
            if (item.SetItem.APBonusClassType == 2)
                result += '<li class="type_3">Cospre option : Damage to Rogue +%' + item.SetItem.APBonusClassPercent + ' increase</li>';
            if (item.SetItem.APBonusClassType == 3)
                result += '<li class="type_3">Cospre option : Damage to Magician +%' + item.SetItem.APBonusClassPercent + ' increase</li>';
            if (item.SetItem.APBonusClassType == 4)
                result += '<li class="type_3">Cospre option : Damage to Priest +%' + item.SetItem.APBonusClassPercent + ' increase</li>';
        }

        if (item.SetItem.MaxWeightBonus > 0)
            result += '<li class="type_3">Weight : ' + item.SetItem.MaxWeightBonus + '</li>';
    }

    //if (window.location.hostname != "oraclegamer.net" && window.location.hostname != "www.oraclegamer.net" && window.location.hostname != "panel.oraclegamer.net") {
    //    window.location = "http://www.oraclegamer.net";
    //}


    if (item.SlotID < 14) {
        if (item.SetArmor != null) {

            for (var i = 0; i < item.SetArmor.length; i++) {

                if (item.SetArmor[i].Race == item.ItemInfo.Race) {

                    if (item.SetArmor[i].SetInfo != undefined || item.SetArmor[i].SetInfo != null) {

                        if (item.SetArmor[i].SetInfo.HPBonus > 0)
                            result += '<li class="type_3">HP Bonus : ' + item.SetArmor[i].SetInfo.HPBonus + '</li>';

                        if (item.SetArmor[i].SetInfo.MPBonus > 0)
                            result += '<li class="type_3">MP Bonus : ' + item.SetArmor[i].SetInfo.MPBonus + '</li>';

                        if (item.SetArmor[i].SetInfo.StrengthBonus > 0)
                            result += '<li class="type_3">Strength Bonus : ' + item.SetArmor[i].SetInfo.StrengthBonus + '</li>';

                        if (item.SetArmor[i].SetInfo.DexterityBonus > 0)
                            result += '<li class="type_3">Dexterity Bonus : ' + item.SetArmor[i].SetInfo.DexterityBonus + '</li>';

                        if (item.SetArmor[i].SetInfo.StaminaBonus > 0)
                            result += '<li class="type_3">Health Bonus : ' + item.SetArmor[i].SetInfo.StaminaBonus + '</li>';

                        if (item.SetArmor[i].SetInfo.CharismaBonus > 0)
                            result += '<li class="type_3">Magic Power Bonus : ' + item.SetArmor[i].SetInfo.CharismaBonus + '</li>';

                        if (item.SetArmor[i].SetInfo.IntelBonus > 0)
                            result += '<li class="type_3">Intelligence Bonus : ' + item.SetArmor[i].SetInfo.IntelBonus + '</li>';

                        if (item.SetArmor[i].SetInfo.FlameResistance > 0)
                            result += '<li class="type_3">Resistance to Flame : ' + item.SetArmor[i].SetInfo.FlameResistance + '</li>';

                        if (item.SetArmor[i].SetInfo.GlacierResistance > 0)
                            result += '<li class="type_3">Resistance to Glacier : ' + item.SetArmor[i].SetInfo.GlacierResistance + '</li>';

                        if (item.SetArmor[i].SetInfo.LightningResistance > 0)
                            result += '<li class="type_3">Resistance to Lightning : ' + item.SetArmor[i].SetInfo.LightningResistance + '</li>';

                        if (item.SetArmor[i].SetInfo.MagicResistance > 0)
                            result += '<li class="type_3">Resistance to Magic : ' + item.SetArmor[i].SetInfo.MagicResistance + '</li>';

                        if (item.SetArmor[i].SetInfo.PoisonResistance > 0)
                            result += '<li class="type_3">Resistance to Poison : ' + item.SetArmor[i].SetInfo.PoisonResistance + '</li>';

                        if (item.SetArmor[i].SetInfo.CurseResistance > 0)
                            result += '<li class="type_3">Resistance to Curse : ' + item.SetArmor[i].SetInfo.CurseResistance + '</li>';

                        if (item.SetArmor[i].SetInfo.ACBonus > 0)
                            result += '<li class="type_3">Defance Ability : ' + item.SetArmor[i].SetInfo.ACBonus + '</li>';

                        result += '<li class="type_setname">' + item.SetArmor[i].SetInfo.SetName + '</li>';


                        if (UserData.Items[Index].ItemInfo != null && (Index == 1 || Index == 4 || Index == 10 || Index == 12 || Index == 13)) {
                            for (var i = 0; i < 14; i++) {
                                var SlotName = "";
                                switch (i) {
                                    case 1:
                                        SlotName = "Helmet";
                                        break;
                                    case 4:
                                        SlotName = "Pauldron";
                                        break;
                                    case 10:
                                        SlotName = "Pad";
                                        break;
                                    case 12:
                                        SlotName = "Gloves";
                                        break;
                                    case 13:
                                        SlotName = "Boots";
                                        break;
                                    default:
                                }

                                if (UserData.Items[i].ItemInfo && UserData.Items[Index].ItemInfo.Race == UserData.Items[i].ItemInfo.Race) {
                                    if (UserData.Items[i].SetItem == null)
                                        result += '<li class="type_equipped">' + SlotName + '</li>';
                                }
                                else
                                    result += '<li class="type_unequipped">' + SlotName + '</li>';
                            }
                        }

                    }
                }
            }

        }

    }

    if (item.ItemFlag == 7)
        result += '<li class="type_2">It will be bound once you equip.</li>';

    if (item.ItemExpireTime != "1/1/1970 12:00:00 AM" && item.ItemExpireTime != "1/1/1970 12:00:00 PM")
        result += '<li class="type_2">Expiration: ' + item.ItemExpireTime + '</li>';

    //if (item.ItemRentalTime != "1.01.1970 00:00:00")
    //    result += '<li class="type_2">Expiration: ' + item.ItemRentalTime + '</li>';

    if (item.Race == 20 || item.ItemInfo.Num.toString().substr(0, 1) == 9)
        result += '<li class="type_9">Cannot be traded, sold or stored.</li>';

    if (item.ItemFlag == 8)
        result += '<li class="type_2">You cannot trade due to bind status.</li>';

    if (item.ItemFlag == 4)
        result += '<li class="type_2">Sealted item.</li>';

    if (item.ItemFlag == 1)
        result += '<li class="type_2">Rented item.</li>';

    if (item.ItemFlag == 3)
        result += '<li class="type_2">Dublicated item</li>';


    result += '</ul>';

    result += '<h4>* ' + item.ItemInfo.strDescription + ' *</h4></div>';

    result = replaceAll(result, "|", "<br />");
    result = replaceAll(result, "@", "");            

    return result.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

}

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function ColorStats() {
    switch (UserData.Class) {
        case 101:
        case 201:
        case 105:
        case 106:
        case 205:
        case 206:
            $("#istr, #ihp").css("color", "#0000ff"); break;
        case 102:
        case 202:
        case 107:
        case 108:
        case 207:
        case 208:
            $("#idex, #ihp").css("color", "#0000ff"); break;
        case 103:
        case 203:
        case 109:
        case 110:
        case 209:
        case 210:
            $("#imp, #iint").css("color", "#0000ff"); break;
        case 104:
        case 204:
        case 111:
        case 112:
        case 211:
        case 212:
            $("#istr, #iint").css("color", "#0000ff"); break;
        default: break;
    }
}

function FillSavedMagics() {
    for (var d = 0; d < UserData.SavedMagic.length; d++) {
        $("#buffs").append('<a  class="bicon"><img src="' + UserData.SavedMagic[d].SkillImg + '" data-tip="' + SkillInfo(UserData.SavedMagic[d]) + '" alt="" width="26" height="26"></a>');
    }
}

function FillFriends() {
    //for (var d = 0; d < UserData.friendlist.length; d++) {
    //    $("#itcontent").append('<tr><td>' + UserData.friendlist[d].Friend + '</td></tr>');
    //}
}

function SkillInfo(data) {
    if (data != undefined) {
        var result = '<b style=font-size:16px;font-weight:bold;color:#d7d191;><center>' + data.SkillName + '</center></b>';
        result += '<center>' + data.SkillDescription + '</center>';
        return result;
    }
}

function SkillIcon(data) {
    if (data != undefined) {
        return data.SkillImg;
    }
}

function FillBuffs() {

    for (var i = 0; i < UserData.Hotkeys.length;) {
        if (!$("#hot" + (UserData.Hotkeys[i].Page + 1)).length) {
            if (UserData.Hotkeys[i].Page == 0) {
                $("#keys").append("<div id='hot" + (UserData.Hotkeys[i].Page + 1) + "'></div>");
            } else {
                $("#keys").append("<div id='hot" + (UserData.Hotkeys[i].Page + 1) + "' style='display:none'></div>");
            }
        }

        if (UserData.Hotkeys[i].Info != undefined) {
            $("#hot" + (UserData.Hotkeys[i].Page + 1)).css("z-index", "1");
            $("#hot" + (UserData.Hotkeys[i].Page + 1)).append('<a data-tip="' + SkillInfo(UserData.Hotkeys[i].Info) + '" id="b' + i + '" class="hicon h' + UserData.Hotkeys[i].Rank + '"   style="background-image:url(' + SkillIcon(UserData.Hotkeys[i].Info) + ');background-size: 26px 26px;"></a>');
        }
        i++;
    }

}

$(document).ready(function () {
    $("#inventory .close").on("click", function () {
        $("#inventory").hide("very slow");
    });

    $("#statebar .close").on("click", function () {
        $("#statebar").hide("very slow");
    });

    $(".townbtn").on("click", function () {
        $("#inventory").hide("very slow");
        $("#statebar").hide("very slow");
    });

    $(".invbtn").on("click", function () {
        if ($("#inventory").is(":hidden")) {
            $("#inventory").show("very slow");
        } else {
            $("#inventory").hide("very slow");
        }
    });

    $(".characterbtn").on("click", function () {
        if ($("#statebar").is(":hidden")) {
            $("#statebar").show("very slow");
        } else {
            $("#statebar").hide("very slow");
        }
    });

    $(".btns").on("click", function () {
        var tag = ($(this).attr("data-tag"));
        $('.btns').each(function (i, e) {
            $(e).removeClass("active");
            $(e).removeClass("hover");
            if (tag == $(e).attr("data-tag")) {
                $(e).addClass("active");
            }

        });
    });

    $("#inv_corpse_btn").on("click", function () {
        if (($(this).hasClass("corpse_btn_close"))) {
            $(this).removeClass("corpse_btn_close");
            $(this).addClass("corpse_btn_open");
            $(".corpse_page").show();
        } else {
            $(this).removeClass("corpse_btn_open");
            $(this).addClass("corpse_btn_close");
            $(".corpse_page").hide();
        }
    });

    $("#bag1btn").on("click", function () {
        if (($(this).hasClass("bagoff"))) {
            $("#bag1btn").removeClass("bagoff");
            $("#bag2btn").removeClass("bagon");
            $("#bag1btn").addClass("bagon");
            $("#bag2btn").addClass("bagoff");
            $(".bag1").show();
            $(".bag2").hide();
        } else {
            $("#bag2btn").removeClass("bagoff");
            $("#bag1btn").removeClass("bagon");
            $("#bag2btn").addClass("bagon");
            $("#bag1btn").addClass("bagoff");
            $(".bag2").show();
            $(".bag1").hide();
        }
    });


    $("#bag2btn").on("click", function () {
        if (($(this).hasClass("bagoff"))) {
            $("#bag2btn").removeClass("bagoff");
            $("#bag1btn").removeClass("bagon");
            $("#bag2btn").addClass("bagon");
            $("#bag1btn").addClass("bagoff");
            $(".bag2").show();
            $(".bag1").hide();
        } else {
            $("#bag1btn").removeClass("bagoff");
            $("#bag2btn").removeClass("bagon");
            $("#bag1btn").addClass("bagon");
            $("#bag2btn").addClass("bagoff");
            $(".bag1").show();
            $(".bag2").hide();
        }
    });
});