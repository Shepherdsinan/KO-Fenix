window.onpopstate = function (t) {
	var href = $BaseURL + "/" + location.pathname;

	$('#Login-box_container').fadeOut('fast');
	if (href != "#") {
		$("#pageloader").show();
		$("body").css("cursor", "wait");

		$.post(href, { 'data-url': "1" }).done(function (data) {
			var obj = JSON.parse(data);
			if (obj.Redirect !== undefined) {
				window.location.href = $BaseURL + obj.Redirect;
			}
			document.title = obj.title;
			$(".main_side").html(obj.content);
			$("#pageloader").hide();
			$("body").css("cursor", "default");
			window.scrollTo(0, 0);
			PageLoad();
			LoadAll();
		}).fail(function () {
			$("#pageloader").hide();
			$("body").css("cursor", "default");
			$.fn.WarcryAlertBox('open', '<p>Aradığınız içeriğe ulaşılamadı.</p>');
			return;
		});
	}

}

function setLanguage(value) {
	$.post($BaseURL, { lang: value }, function (data, status) {
		location.reload();
	});
}

function setServer(value) {
	$.post($BaseURL, { selectedserver: value }, function (data, status) {
		location.reload();
	});
}

function search() {
	var keyword = $("input[name=keywords]").val();
	if (keyword.length < 4) {
		$.fn.WarcryAlertBox('open', '<p>Arama yaparken en az 4 karakter girmelisiniz.</p>');
	} else if (keyword.length > 20) {
		$.fn.WarcryAlertBox('open', '<p>Arama yaparken en fazla 20 karakter girmelisiniz.</p>');
	} else {
		$("#search").submit();
	}
}
function setupLabel() {
	if ($('.label_check input').length) {
		$('.label_check').each(function () {
			$(this).removeClass('c_on');
		});
		$('.label_check input:checked').each(function () {
			$(this).parent('label').addClass('c_on');
		});
	};
	if ($('.label_radio input').length) {
		$('.label_radio').each(function () {
			$(this).removeClass('r_on');
		});
		$('.label_radio input:checked').each(function () {
			$(this).parent('label').addClass('r_on');
		});
	};
};
function PageLoad() {
	$('a[data-url]').unbind("click");
	$('a[data-url]').bind("click", function (e) {
		e.preventDefault();
		$('#Login-box_container').fadeOut('fast');
		href = $(this).attr("href");
		if (href != "#") {
			$("#pageloader").show();
			$("body").css("cursor", "wait");

			var url = $BaseURL + "/" + $(this).attr("href");

			$.post(url, { 'data-url': "1" }).done(function (data) {
				var obj = JSON.parse(data);
				if (obj.Redirect !== undefined) {
					window.location.href = $BaseURL + "/" + obj.Redirect;
				}
				window.history.pushState({}, null, url);
				document.title = obj.title;
				$(".main_side").html(obj.content);
				$("#pageloader").hide();
				$("body").css("cursor", "default");
				window.scrollTo(0, 0);
				PageLoad();
				LoadAll();
			}).fail(function () {
				$("#pageloader").hide();
				$("body").css("cursor", "default");
				$.fn.WarcryAlertBox('open', '<p>Aradığınız içeriğe ulaşılamadı.</p>');
				return;
			});
		}
	});
}

function getChestContent(pURL, pData) {

	$("#chest_details").append("<div class='dataLoading'>Veriler yükleniyor..<br /><img src='" + $FileURL + "/images/ajax.gif'></div>");
	$("#chest_details .dataLoading").show();
	$.ajax({
		data: pData,

		url: pURL,

		success: function (json) {
			$("#chest_details .dataLoading").hide();

			if (json.cache.length > 0)
				$("#cache_time").html("Bu sayfa " + json.cache + " arayla güncellenmektedir.");
			else
				$("#cache_time").html("");

			for (var k in json.data) {
				$("#chest_details").append("<li><div class='p_left'><img src='" + json.data[k].ItemIcon + "' data-tip='" + json.data[k].ItemTip + "'></div><div class='p_right'><h1><a href='" + $BaseURL + "/Item/" + json.data[k].nExchangeItemNum1 + "'>" + json.data[k].ExchangeItemName1 + "</a></h1><p>Oran: %" + json.data[k].DropPercent + "</p></div></li>");
			}

			LoadAll();

		},
		"dataType": "json"
	});

	var ChestContent = $("#chest_scrollbar").html();
	
	$("#chestdiv").html(ChestContent);
   
}

function setMining(e) {
	$("#pickaxeid").val(e);
	getDataTable($BaseURL + "json/mining", $("#miningform").serialize());
}


function setPremium(e) {
	$("#premiumid").val(e);
	getContent($BaseURL + "json/premiums", $("#premiumform").serialize());
}


function ChangeAvatar(elm, id) {
	$.ajax({
		type: "POST",
		data: { avatarid: id },
		url: $BaseURL + "json/updateavatar",
		success: function (json) {
			$(elm).parent().attr("id", "active");
			$.fn.WarcryAlertBox('open', '<p>' + json.Message + '</p>');
		},
		"dataType": "json"
	});
}
function GetWheelBalance() {
	var ID = $("#character-select").val();
	$.ajax({
		type: "POST",
		data: { charid: ID },
		url: $BaseURL + "json/GetWheelBalance",
		success: function (json) {
			$("#daily").html(json.DailyText);
			$("#current_npoint").html(json.NPoint);
			$("#current_mannerpoint").html(json.MannerPoint);
		},
		"dataType": "json"
	});
}

function getContent(pURL, pData) {

	$("#dataDiv").html("<div class='dataLoading'>Veriler yükleniyor..<br /><img src='" + $FileURL + "/images/ajax.gif'></div>");

	$.ajax({
		data: pData,

		url: pURL,

		success: function (json) {
			/*
			if(json.cache.length > 0)
				$("#cache_time").html("Bu sayfa "+json.cache+" arayla güncellenmektedir.");
			else
				$("#cache_time").html("");
			*/
			$("#dataDiv").empty();
			$("#dataDiv").append(json.Content);

			LoadAll();

		},
		"dataType": "json"
	});

}

var tabs = $("#home_rankings #tabs li a");
var contents = $("#home_rankings #content div");
var selected;

var defaultSelected = $("#General");

$(contents).each(function () {
	$(this).hide();
});
getContentRankings("General");
$(defaultSelected).show();
$(defaultSelected).addClass("selected");

$(tabs).on('click', function (e) {

	e.preventDefault();

	selected = $(this).attr("href");

	$(tabs).each(function () {

		$(this).removeClass("selected");
	});
	$(contents).each(function () {
		$(this).hide();
	});
	var href = selected.replace("#", "");

	getContentRankings(href);

	$(selected).show();
	$(this).addClass("selected");
});

function getContentRankings(tab) {

   

	$.ajax({

		url: $BaseURL + "/JSON/Content/" + tab,

		success: function (json) {
			var tableHeaders = "";

			$.each(json.columns, function (i, val) {
				tableHeaders += "<th>" + val + "</th>";
			});

			$("#" + tab).empty();
			$("#" + tab).append('<table style="margin-top:-5px !important;width:105.6% !important;margin-bottom:-5px !important;" id="' + tab + '_table" class="rankTable"><thead><tr>' + tableHeaders + '</tr></thead></table>');
			$("#" + tab + "_table").dataTable(json);

		},
		"dataType": "json"
	});
}

getContentRankings();


function getDataTable(pURL, pData, pClass) {

	

	$.ajax({
		data: pData,
		url: pURL,
		success: function (json) {

			if (json.errMsg != undefined) {
				$('#dataDiv').html('<div id="json_error">' + json.errMsg + '</div>');
			} else {
				if (json.cache.length > 0)
					$("#cache_time").html("Bu sayfa " + json.cache + " arayla güncellenmektedir.");
				else
					$("#cache_time").html("");

				$("#frmranking").show();
				var tableHeaders = "";

				$.each(json.columns, function (i, val) {
					tableHeaders += "<th>" + val + "</th>";
				});

				$("#dataDiv").empty();
				$("#dataDiv").append('<table id="dataTable" class="rankTable ' + pClass + '"><thead><tr>' + tableHeaders + '</tr></thead></table>');

				$('#dataTable').dataTable(json);
			}
		},
		"dataType": "json"
	});

}

function getContentHTML(pURL, pData) {
	
	$.ajax({
		data: pData,

		url: pURL,

		success: function (data) {
			$("#dataDiv").empty();
			$("#dataDiv").append(data);
			LoadAll();
		}
	});
}


function LoadAll() {

	$(function () {

		//if (window.location.hostname != "monsterko.net" && window.location.hostname != "www.monsterko.net" && window.location.hostname != "localhost") {
		//    window.location = "http://www.monsterko.net";
		//}

		var URLPath = window.location.pathname;

		if (URLPath.indexOf("wheel2spin") > 0) {
			GetWheelBalance();
		}

		$('body').addClass('has-js');

		$('.label_check, .label_radio').click(function () {
			setupLabel();
		});

		setupLabel();


		if (URLPath.indexOf("index") > 0 || URLPath == "/") {
			//updateLogonStatus();
			//updateAnnouncements();
		}

		/*
		if (!Eventscheduler.initialized) {
			Eventscheduler.initialize(new Date());
		}
		*/

		if ($('.register-form').length) {
			Register();
		}

		if ($('.store_body').length) {
			$('.store_body').WarcryStore();
		}

		if ($('#terms-container').length) {
			$('#terms-container').tinyscrollbar();
			$('#terms-container').tinyscrollbar_update();
			setTimeout("$('#terms-container').tinyscrollbar_update();", 200);
		}

		if ($('#chest-container').length) {
			$('#chest-container').tinyscrollbar();
			$('#chest-container').tinyscrollbar_update();
			setTimeout("$('#chest-container').tinyscrollbar_update();", 200);
		}

		if ($('#topik').length) {
			$('#topik').tinyscrollbar();
			$('#topik').tinyscrollbar_update();
			setTimeout("$('#topik').tinyscrollbar_update();", 200);
		}

		if ($('#topik2').length) {
			$('#topik2').tinyscrollbar();
			$('#topik2').tinyscrollbar_update();
			setTimeout("$('#topik2').tinyscrollbar_update();", 200);
		}

		if ($('#left_scrollbable').length) {
			$('#left_scrollbable').tinyscrollbar();
			$('#left_scrollbable').tinyscrollbar_update();
			setTimeout("$('#left_scrollbable').tinyscrollbar_update();", 200);
		}

		WarcryQueue('onload').goNext();
		$(document).find('select').each(function (index, element) {
			if (typeof $(element).attr('styled') != 'undefined' && $(element).attr('modified') != 1) {
				$(element).SelectTransform();
				$(element).attr('modified', 1);
			}
		});

	});

	for (i = 0; i < 15; i++) {
		if (!$.fn.DataTable.isDataTable('#dataTable_' + i)) {
			$('#dataTable_' + i).DataTable({
				"paging": false,
				"info": false,
				"filter": false
			});
		}
	}

	$("#tooltip").remove();
	Tooltip.initialize();
}


function Register() {

	$(function () {

		$.validator.addMethod("az09", function (value, element) {
			return /^[a-zA-Z0-9]+$/.test(value);
		});

		$.validator.addMethod("firstalfaonly", function (value, element) {
			return /^[a-zA-Z]/.test(value);
		});

		$.validator.addMethod("validphone", function (value, element) {
			var phonenumber = value.replace(/[^\d]/g, '');
			if (phonenumber.length < 9 || phonenumber.length > 16) {
				return false;
			} else {
				return true;
			}
		});

		$.validator.setDefaults({
			submitHandler: function (form) {
				form.submit();
			},
			errorClass: 'alert alert-danger m-t-25',
			errorElement: 'div',
			highlight: function (element, errorClass, validClass) {

			},
			unhighlight: function (element, errorClass, validClass) {

			},
			errorPlacement: function (error, element) {
				if (element.attr("name") == "accept_terms") {
					error.insertAfter("#termofuse");
				} else {
					error.insertAfter(element);
				}
			}
		});

		$("#register_form").validate({
			rules: {
				username: {
					required: true,
					minlength: 4,
					maxlength: 14,
					az09: true,
					firstalfaonly: true
				},
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
					minlength: 4,
					maxlength: 14
				},
				password2: {
					equalTo: "input[name=password]"
				},
				phonenumber: "validphone",
				accept_terms: "required"
			},
			messages: {
				username: {
					required: "Kullanıcı adı boş geçilemez.",
					minlength: "Kullanıcı adı en az 4 karakterden oluşmalıdır.",
					maxlength: "Kullanıcı adı en fazla 14 karakterden oluşmalıdır.",
					az09: "Kullanıcı adı alfanumerik ve rakamlardan oluşmalıdır.",
					firstalfaonly: "Kullanıcı adı harf ile başlamalıdır."
				},
				email: {
					required: "Email boş geçilemez.",
					email: "Geçerli bir Email adresi girmelisiniz."
				},
				password: {
					required: "Parola boş geçilemez.",
					minlength: "Parola en az 4 karakterden oluşmalıdır.",
					maxlength: "Parola en fazla 14 karakterden oluşmalıdır.",
					az09: "Parola alfanumerik ve rakamlardan oluşmalıdır."
				}, password2: {
					equalTo: "Parolalarınız birbiriyle eşleşmiyor"
				},
				phonenumber: "Geçerli bir telefon numarası giriniz.",
				accept_terms: "Kullanıcı sözleşmesini kabul etmeden kayıt olamazsınız."
			}
		});
	});
}
function updateLogonStatus() {

	$("#server_status").html('<span class="loading">Yükleniyor..</span>');

	$.ajax({
		url: $BaseURL + "/json/serverstatus",
		success: function (json) {
			if (json.Status == 1) {
				$("#game_status").html('<span class="online">Online</span>');
			} else {
				$("#game_status").html('<span class="offline">Offline</span>');
			}
		},
		"dataType": "json"
	});
}
function updateAnnouncements() {
	$.ajax({
		url: $BaseURL + "/json/gameannouncements",
		success: function (json) {
			if (json.Status == 1) {
				$("#announcements").html(json.Content);
			}
		},
		"dataType": "json"
	});

}
LoadAll();
PageLoad();
