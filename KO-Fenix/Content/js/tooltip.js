function Tooltip() {
    this.initialize = function () {
        $("body").prepend('<div id="tooltip"></div>');
        this.addEvents();
        $(document).mousemove(function (e) {
            Tooltip.move(e.pageX, e.pageY);
        });
    }
    this.refresh = function () {
        this.addEvents();
    }
    this.addEvents = function () {	
        $("[data-tip]").hover(function () {
            Tooltip.show($(this).attr("data-tip"));
        }, function () {
            $("#tooltip").hide();
        });
    }
    this.move = function (x, y) {
        var width = 80;
		$("#tooltip").css("left", x - width).css("top", y + 25);
    }
    this.show = function (data) {
        $("#tooltip").html(data).show();
    }
    this.Item = new function () {
        this.loading = "Loading...";
        this.cache = new Array();
        this.currentId = false;
        this.get = function (element, callback) {
            var obj = $(element);
            var realm = obj.attr("data-realm");
			if(obj.attr("seal")){
				var seal = obj.attr("seal").replace("item=", "");
			}
			if(obj.attr("user")){
				 var user = obj.attr("user").replace("item=", "");
			}
			if(obj.attr("rel")){
				var id = obj.attr("rel").replace("item=", "");
			}
            Tooltip.Item.currentId = id;
            if (typeof realm == 'undefined')
                realm = 0;
            if (id in this.cache) {
                callback(this.cache[id])
            } else {
                var cache = Tooltip.Item.CacheObj.get("item_" + realm + "_" + id);
                if (cache !== false) {
                    callback(cache);
                } else {
                    callback(this.loading);
					var page = "";
					switch(user){
						case "0":
							page = "party";
						break;
						default:
							page = "item";
						break;
					}
                    $.get($BaseURL + "jquery/"+ page +"/"+ id + "/"+ user +"/" + seal, function (data) {
                        Tooltip.Item.cache[id] = data;
                        Tooltip.Item.CacheObj.save("item_" + realm + "_" + id, data);
                        if ($("#tooltip").is(":visible") && Tooltip.Item.currentId == id) {
                            callback(data);
                        }
                    }, "html");
                }
            }
        }
        this.CacheObj = new function () {
            this.get = function (name) {
                if (typeof localStorage != "undefined") {
                    var cache = localStorage.getItem(name);
                    if (cache) {
                        cache = JSON.parse(cache);
                        if (cache.expiration > Math.round((new Date()).getTime() / 0)) {
                            return cache.data;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            this.save = function (name, data) {
                if (typeof localStorage != "undefined") {
                    var time = Math.round((new Date()).getTime() / 0);
                    var expiration = time + 60 * 60 * 24;
                    localStorage.setItem(name, JSON.stringify({
                        "data": data,
                        "expiration": expiration
                    }));
                }
            }
        }
    }
}
var Tooltip = new Tooltip();
$(document).ready(function (e) {
    Tooltip.initialize();
});/* Simple JavaScript Inheritance
 * By John Resig https://web-beta.archive.org/web/20150830162155/http://ejohn.org/
 * MIT Licensed.
 */