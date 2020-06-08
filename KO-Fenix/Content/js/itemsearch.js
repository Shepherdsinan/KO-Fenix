
//var PopupAllowClose = true;

//function isNumberKey(evt) {
//    var charCode = (evt.which) ? evt.which : event.keyCode;
//    if (charCode > 31 && (charCode < 48 || charCode > 57))
//        return false;
//    return true;
//}
//var SearchKeyword = "";
//function monster_info(element) {
//    var ItemName = $("#item_name2").val();
//    var MonsterID = $(element).attr("data-id");

//    $("#itemsearch_result").html('<div class="error">İçerik yükleniyor...</div>');
//    $.post($BaseURL + "/JSON/ItemSearchContent", { mobssid: MonsterID, iname: ItemName }, function (data) {
//        $("#itemsearch_result").html(data);
//        $('#topik').tinyscrollbar();
//        $('#topik2').tinyscrollbar();
//        $("#tooltip").remove();
//        Tooltip.initialize();
//    });
//}
//function store_info(element) {
//    var ItemID = $(element).attr("data-id");
//    $("#itemsearch_result").html('<div class="error">İçerik yükleniyor...</div>');
//    $.post($BaseURL + "/json/getdroplist", { storeid: ItemID, iname: SearchKeyword, searchtype: 1, resulttype: 2 }, function (data) {
//        $("#itemsearch_result").html(data);
//        $('#topik').tinyscrollbar();
//        $('#topik2').tinyscrollbar();
//        $("#tooltip").remove();
//        Tooltip.initialize();
//    });
//    Tooltip.initialize();
//}
//function collection_info(element) {
//    var QuestNum = $(element).attr("data-id");
//    $("#itemsearch_result").html('<div class="error">İçerik yükleniyor...</div>');
//    $.post($BaseURL + "/json/getcollectionlist", { num: QuestNum }, function (data) {
//        $("#itemsearch_result").html(data);
//        $('#topik').tinyscrollbar();
//        $('#topik2').tinyscrollbar();
//        $("#tooltip").remove();
//        Tooltip.initialize();
//    });
//}
//function daily_info(element) {
//    var QuestNum = $(element).attr("data-id");
//    $("#itemsearch_result").html('<div class="error">İçerik yükleniyor...</div>');
//    $.post($BaseURL + "/json/getdailylist", { num: QuestNum }, function (data) {
//        $("#itemsearch_result").html(data);
//        $('#topik').tinyscrollbar();
//        $('#topik2').tinyscrollbar();
//        $("#tooltip").remove();
//        Tooltip.initialize();
//    });
//}
//function mix_info(element) {
//    var QuestNum = $(element).attr("data-id");
//    $("#itemsearch_result").html('<div class="error">İçerik yükleniyor...</div>');
//    $.post($BaseURL + "/json/getmixinfo", { num: QuestNum }, function (data) {
//        $("#itemsearch_result").html(data);
//        $('#topik').tinyscrollbar();
//        $('#topik2').tinyscrollbar();
//        $("#tooltip").remove();
//        Tooltip.initialize();
//    });
//}
(function ($) {
    var methods = {
        defaults: {
            realm: 1,
            character: '',
            activeCategory: -1,
            activeSubCategory: -1,
            search: '',
            quality: -1,
            minlevel: 0,
            maxlevel: 255,
            havecurrency: false,
            selectedItem: 0,
        },
        init: function (options) {
            var $this = $(this);
            if ($this.length < 1) {
                return;
            }
            if (typeof $this.data('WarcryStore') == 'undefined') {
                $this.data('WarcryStore', {
                    config: null
                });
                $this.data('WarcryStore').config = $.extend({}, methods.defaults, config);
            } else {
                $this.data('WarcryStore').config = $.extend({}, $this.data('WarcryStore').config, config);
            }
            $('.store_item_purchase_popup').appendTo('body');
            $('#store_form').submit(function (e) {
                $('.store_body').WarcryStore("ApplyFilters");
                return false;
            });
            $('#store_popup_form').submit(function (e) {
                $('.store_body').WarcryStore("PurchaseItemSubmit");
                return false;
            });
            $('#store_categories .store_category_button').click(function () {
                $('.store_body ').WarcryStore("ActivateCategory", $(this));
                $('.scrollable').tinyscrollbar();
                $('.scrollable').tinyscrollbar_update();                
                return false;
            });
            $('#store_categories .store_sub_category_button').click(function (e) {
                $('.store_body').WarcryStore("ActivateSubCategory", $(this));
                return false;
            });
            $('#store_form #item_name2').on("keyup", function () {
                $('.store_body').data('WarcryStore').config.search = $(this).val();
            });
            $('#store_form #min_level').on("keyup", function () {
                $('.store_body').data('WarcryStore').config.minlevel = $(this).val();
            });
            $('#store_form #max_level').on("keyup", function () {
                $('.store_body').data('WarcryStore').config.maxlevel = $(this).val();
            });
            $('#store_form #item_type').on('change', function () {
                $('.store_body').data('WarcryStore').config.quality = $(this).find('option:selected').val();
            });
            $('#store_form #item_grade').on('change', function () {
                $('.store_body').data('WarcryStore').config.quality = $(this).find('option:selected').val();
            });
            $('#store_form #store_character_select').on('change', function () {
                $('.store_body').data('WarcryStore').config.character = $(this).find('option:selected').val();
            });
            $('#store_form #store_have_currency').on('change', function () {
                if ($(this).prop('checked')) {
                    $('.store_body').data('WarcryStore').config.havecurrency = true;
                } else {
                    $('.store_body').data('WarcryStore').config.havecurrency = false;
                }
            });
            $('.store_item_purchase_popup').click(function () {
                if (PopupAllowClose) {
                    $('.store_body').data('WarcryStore').config.selectedItem = 0;
                    $(this).fadeOut('fast');
                }
            });
            $(".store_popup_box").mouseenter(function () {
                PopupAllowClose = false;
            }).mouseleave(function () {
                PopupAllowClose = true;
            });
            var config = $this.data('WarcryStore').config;
        },
        ActiveSelectCategory: function (element) {
            /*var catId = parseInt($(element).attr('data-id'));			
            $(element).parent(".store_category_button").addClass("active_category");
            $(element).WarcryStore("OpenCategory", catId);
            */
        },
        ActivateCategory: function (element) {
            if ($(element).parent().attr('data-id').length == 0)
                return;
            var config = $(this).data('WarcryStore').config;
            var catId = parseInt($(element).parent().attr('data-id'));
            var current = $("div[data-id='" + config.activeCategory + "']");
            if (catId == config.activeCategory) {
                if (current.hasClass('open_category')) {
                    $(this).WarcryStore("CloseCategory", catId);
                } else {
                    $(this).WarcryStore("OpenCategory", catId);
                }
                return;
            }
            if (current.length > 0) {
                current.find('.store_category_button').removeClass("active_category");
                var subs = current.find('.store_sub_categories');
                if (subs.length > 0) {
                    $(this).WarcryStore("CloseCategory", config.activeCategory);
                    subs.find('.active_category').removeClass("active_category");
                }
            }
            $(element).addClass("active_category");
            $(this).WarcryStore("OpenCategory", catId);
            config.activeSubCategory = -1;
            config.activeCategory = catId;
        },
        ActivateSubCategory: function (element) {
            if ($(element).attr('data-id').length == 0)
                return;
            var config = $(this).data('WarcryStore').config;
            var catId = parseInt($(element).attr('data-id'));
            if (catId == config.activeSubCategory) {
                config.activeSubCategory = -1;
                $(element).removeClass("active_category");
                return;
            }
            $(element).parent().find('.active_category').removeClass("active_category");
            $(element).addClass('active_category');
            config.activeSubCategory = catId;
        },
        CloseCategory: function (id) {
            var category = $("div[data-id='" + id + "']");
            if (category.length > 0) {
                var subs = category.find('.store_sub_categories');
                if (subs.length > 0) {
                    subs.slideUp('fast', function () {
                        $('.scrollable').tinyscrollbar();
                        $('.scrollable').tinyscrollbar_update();
                    });
                }
                category.removeClass('open_category');
            }
        },
        OpenCategory: function (id) {

            var category = $("div[data-id='" + id + "']");
            if (category.length > 0) {
                var subs = category.find('.store_sub_categories');
                if (subs.length > 0) {
                    subs.slideDown('fast', function () {
                        $('.scrollable').tinyscrollbar();
                        $('.scrollable').tinyscrollbar_update();

                  });
               }
               category.addClass('open_category');
            }
        },
        ApplyFilters: function () {
            var $this = $(this);
            var $config = $this.data('WarcryStore').config;
            if ($config.search.length < 3 && $config.activeCategory == -1) {
                $.fn.WarcryAlertBox('open', '<p>En az 3 karakter içerecek şekilde arama yapınız.</p>');
                return;
            }
            $(this).WarcryStore("LoadItems");
        },
        //LoadItems: function () {

        //    var $this = $(this);
        //    var $config = $this.data('WarcryStore').config;
        //    $("#itemsearch_result").html('<div class="error">Arama yapılıyor...</div>');
        //    //$('.store_items_list').tinyscrollbar_update();

        //    var item_name = $("#item_name2").val();

        //    $.post($BaseURL + "/JSON/ItemSearch", { iname: item_name, searchtype: 1 }, function (data) {

        //        var data = JSON.parse(data);

        //        if (data.error !== undefined) {
        //            $.fn.WarcryAlertBox('open', '<p>' + data.error + '</p>');
        //            return;
        //        }

        //        var Found = 0;

        //        for (var k in data) {
        //            $("[data-id=" + data[k].ZoneID + "]").find("#mob_result").html("");
        //            $("[data-id=" + data[k].ZoneID + "]").find("#mob_count").html(Object.keys(data[data[k].ZoneID].ZoneResult).length);

        //            for (var c in data[data[k].ZoneID].ZoneResult) {
        //                $("[data-id=" + data[k].ZoneID + "]").find("#mob_result").append("<a href='javascript:void(0);' onclick='return monster_info(this);' data-id=\"" + data[data[k].ZoneID].ZoneResult[c].sSid + "\" class=\"store_sub_category_button\"><span>" + data[data[k].ZoneID].ZoneResult[c].NpcName + "</span></a>");
        //                var Found = 1;
        //            }

        //            $('.store_body ').WarcryStore("ActiveSelectCategory", $(".mob_div"));
        //        }

        //        $(".store_category").each(function (index) {
        //            var ZoneID = $(this).attr("data-id");
        //            var Founded = 0;
        //            for (var k in data) {
        //                if (data[k].ZoneID == ZoneID) {
        //                    Founded = 1;
        //                }
        //            }
        //            if (Founded) {
        //                if (!$("[data-id=" + ZoneID + "]").find("#mob_result").html().length) {
        //                    $("[data-id=" + ZoneID + "]").find("#mob_result").html('<a href="javascript:void(0);" class="store_sub_category_button"><span>Sonuç yok</span></a>');
        //                    $("[data-id=" + ZoneID + "]").find("#mob_count").html(0);
        //                }
        //            } else {
        //                $("[data-id=" + ZoneID + "]").find("#mob_result").html('<a href="javascript:void(0);" class="store_sub_category_button"><span>Sonuç yok</span></a>');
        //                $("[data-id=" + ZoneID + "]").find("#mob_count").html(0);
        //            }

        //        });

        //        if (Found) {
        //            $("#itemsearch_result").html('<div class="error"><img src="' + $FileURL + '/images/a.png"></li><li class="info2">Sonuçlar sol tarafta listelenmiştir. <br /> Tıklayarak detayları görebilirsiniz.</div>');
        //        } else {
        //            $("#itemsearch_result").html('<div class="error">Sonuç bulunamamıştır.</div>');
        //        }

        //        //$('.store_items_list').tinyscrollbar_update();
        //        Tooltip.refresh();

        //    }, "json");
        //},
        //PurchaseItem: function (element) {
            //var $this = $(this);
            //var $config = $this.data('WarcryStore').config;
            //var id = $(element).attr('data-id');
            //var priceGold = parseInt($(element).attr('data-price-gold'));
            //var priceSilver = parseInt($(element).attr('data-price-silver'));
            //if ($config.character == '') {
            //    $.fn.WarcryAlertBox('open', '<p>Please select a character first.</p>');
            //    return;
            //}
            //var info = $(element).parent().clone(false);
            //info.find('input[type="button"]').detach();
            //info.find('#hover').detach();
            //$('.popup_box_top').html("");
            //$('.popup_box_top').append(info);
            //Tooltip.refresh();
            //if (priceGold > 0) {
            //    $('.popup_currency_choice #gold').css('display', 'inline-block');
            //    $('.popup_currency_choice #gold').attr('data-amount', priceGold);
            //    $('.popup_currency_choice #gold p').html('<font color="#927a4b">' + priceGold + '</font> Gold Coins');
            //} else {
            //    $('.popup_currency_choice #gold').css('display', 'none');
            //    $('.popup_currency_choice #gold').attr('data-amount', 0);
            //}
            //if (priceSilver > 0) {
            //    $('.popup_currency_choice #silver').css('display', 'inline-block');
            //    $('.popup_currency_choice #silver').attr('data-amount', priceSilver);
            //    $('.popup_currency_choice #silver p').html('<font color="#847f7a">' + priceSilver + '</font> Silver Coins');
            //} else {
            //    $('.popup_currency_choice #silver').css('display', 'none');
            //    $('.popup_currency_choice #silver').attr('data-amount', 0);
            //}
            //$config.selectedItem = id;
            //$('.store_item_purchase_popup').fadeIn('fast');
        //},
        //PurchaseItemSubmit: function () {
            //var $this = $(this);
            //var $config = $this.data('WarcryStore').config;
            //if ($config.selectedItem == 0)
            //    return;
            //var currency = $('#store_popup_form input[type="radio"]:checked').val();
            //var amount = $('#store_popup_form input[type="radio"]:checked').parent().attr('data-amount');
            //$('.store_body').WarcryStore("verifyAmount", amount, currency);
        //},
        //verifyAmount: function (amount, currency) {
            /*var $this = $(this);
            var $config = $this.data('WarcryStore').config;
            $.get("ajax.php?phase=4", {
                silver: (currency == 'silver' ? amount : 0),
                gold: (currency == 'gold' ? amount : 0),
                realm: $config.realm,
            }, function(data) {
                if (data == 'OK') {
                    var form = $('<form method="post" action="' + BaseURL + '/execute.php?take=buyItems">' + '<input type="hidden" name="character" value="' + $config.character + '" />' + '<input type="hidden" name="items[0]" value="' + $config.selectedItem + ',' + currency + '" />' + '</form>');
                    form.appendTo('body');
                    form.submit();
                } else {
                    $('.store_body').data('WarcryStore').config.selectedItem = 0;
                    $('.store_item_purchase_popup').fadeOut('fast', function() {
                        $.fn.WarcryAlertBox('open', '<p>' + data + '</p>');
                    });
                }
            });
            */
       // },
    }
    $.fn.WarcryStore = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.WarcryStore');
        }
    };
})(jQuery);