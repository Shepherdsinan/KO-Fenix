$(function () {

    if (!flux.browser.supportsTransitions) {
        $('#warn').text('Flux Slider requires a browser that supports CSS3 transitions').show();
    }

    window.mf = new flux.slider('#slider', {
        autoplay: true,
        pagination: true,
        captions: true,
        delay: 5000
    });

    $(document).find('input[type=checkbox]').each(function (index, element) {
        $(element).iCheck();
    });


	/*
	$(".login-box-close").on("click",function () {
		if ($('#Login-box_container').is(':visible')) {
			$('#Login-box_container').fadeOut('fast');
		}
	});
					
		
		$LoginBox.closeEvent = false;
		$('#login1,#login2').on('click', function () {

			if (!$LoginBox.isLoaded) {
				
				$('body').append('<div id="Login-box_container" align="center"><div class="login-box-holder container_3"></div></div>');
				$('#Login-box_container > .login-box-holder').on('mouseenter', function () {
					$LoginBox.closeEvent = false;
				});
				setTimeout(function () {
					$('#Login-box_container').on('click', function () {
						if ($LoginBox.closeEvent) {
							$('#Login-box_container').fadeOut('fast');
						}
					});
					$(document).keyup(function (e) {
						if (e.keyCode == 27) {
							if ($('#Login-box_container').is(':visible')) {
								$('#Login-box_container').fadeOut('fast');
							}
						}
					});
					
				}, 1500);
				$('#Login-box_container').stop().animate({
					opacity: 1
				}, "fast", function () {
					$('#temp-login-form > .login-box').appendTo('#Login-box_container > .login-box-holder');
					$LoginBox.isLoaded = true;
					$LoginBox.closeEvent = true;
					$('#Login-box_container > .login-box-holder').on('mouseleave', function () {
						$LoginBox.closeEvent = true;
					});
					$('#js-login-box_urlbl').attr('value', window.location.href);
				});
			} else {
				$('#Login-box_container').stop().fadeIn('fast');
			}
			return false;
		});*/


});

function UI() {
    this.initialize = function () {
        if ($("#slider").length > 0) {
            UI.slider();
        }
        if (Config.voteReminder) {
            UI.voteReminder();
        }
        $('input[placeholder], textarea[placeholder]').placeholder();
        UI.dropdown.initialize();
        Tooltip.initialize();
    }
    this.voteReminder = function () {
        $("#popup_bg").fadeTo(200, 0.5);
        $("#vote_reminder").fadeTo(200, 1);
        $("#popup_bg").bind('click', function () {
            UI.hidePopup();
        });
    }
    this.slider = function () {
        var config = {
            autoplay: true,
            controls: true,
            captions: true,
            delay: Config.Slider.interval
        };
        if (Config.Slider.effect.length > 0) {
            config.transitions = new Array(Config.Slider.effect);
        }
        window.myFlux = new flux.slider('#slider', config);
    }
    this.alert = function (question, time) {
        $("#alert_message").html(question);
        $("#popup_bg").fadeTo(200, 0.5);
        $("#alert").fadeTo(200, 1);
        if (typeof time == "undefined") {
            $("#alert_message").css({
                marginBottom: "10px"
            });
            $(".popup_links").show();
            $("#alert_button").bind('click', function () {
                UI.hidePopup();
            });
        } else {
            $("#alert_message").css({
                marginBottom: "0px"
            });
            $(".popup_links").hide();
            setTimeout(function () {
                UI.hidePopup();
            }, time);
        }
        $("#popup_bg").bind('click', function () {
            UI.hidePopup();
        });
        $(document).keypress(function (event) {
            if (event.which == 13) {
                UI.hidePopup();
            }
        });
    }
    this.confirm = function (question, button, callback, callback_cancel, width) {
        var normalWidth = $("#confirm").css("width");
        var normalMargin = $("#confirm").css("margin-left");
        if (width) {
            $("#confirm").css({
                width: width + "px"
            });
            $("#confirm").css({
                marginLeft: "-" + (width / 2) + "px"
            });
        }
        $(".popup_links").show();
        $("#confirm_question").html(question);
        $("#confirm_button").html(button);
        $("#popup_bg").fadeTo(200, 0.5);
        $("#confirm").fadeTo(200, 1);
        $("#confirm_button").bind('click', function () {
            $("#confirm").css({
                width: normalWidth
            });
            $("#confirm").css({
                marginLeft: normalMargin
            });
            callback();
            UI.hidePopup();
        });
        $("#popup_bg").bind('click', function () {
            $("#confirm").css({
                width: normalWidth
            });
            $("#confirm").css({
                marginLeft: normalMargin
            });
            UI.hidePopup();
        });
        $(document).keypress(function (event) {
            if (event.which == 13) {
                $("#confirm").css({
                    width: normalWidth
                });
                $("#confirm").css({
                    marginLeft: normalMargin
                });
                callback();
                UI.hidePopup();
            }
        });
    }
    this.hidePopup = function () {
        $("#popup_bg").hide();
        $("#confirm").hide();
        $("#alert").hide();
        $("#vote_reminder").hide();
        $("#confirm_button").unbind('click');
        $("#alert_button").unbind('click');
        $(document).unbind('keypress');
    }
    this.limitCharacters = function (field, indicator) {
        var max = field.maxLength;
        var length = field.value.length;
        document.getElementById(indicator).innerHTML = length + " / " + max;
    }
    this.dropdown = {
        initialize: function () {
            $(document).ready(function () {
                UI.dropdown.create('.dropdown');
            });
        },
        create: function (element) {
            $(element).not('[data-dropdown-initialized]').attr('data-dropdown-initialized', 'true').children('h3').bind('click', function () {
                $(this).next('div').slideToggle(200, function () {
                    if ($(this).is(':visible'))
                        $(this).parent('.dropdown').addClass('active');
                    else
                        $(this).parent('.dropdown').removeClass('active');
                });
            });
        }
    }
}
var UI = new UI();