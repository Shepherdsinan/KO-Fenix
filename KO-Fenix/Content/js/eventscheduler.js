var Eventscheduler = {
	Lang: {
		"IN_PROGRESS"	:	"Aktif",
		"OPEN"		:	"Açık",
		"CLOSED"	:	"Kapalı",
		"STATUS"	:	"Durum",
		"TIME_LEFT"	:	"Süre",
		"EVENT_NOTE_TAG" : "Etkinlik Hakkında"
	},
    initialize: function(strDate) {		
        this.m_Date = new Date(strDate);
        this.clock();				
    },
    clock: function() {		
        var object = document.getElementById("server-time-cloack");
        if (object) {
            var hour = Zero(Eventscheduler.m_Date.getHours());
            var minute = Zero(Eventscheduler.m_Date.getMinutes());
            var second = Zero(Eventscheduler.m_Date.getSeconds());
            object.innerHTML = hour + ":" + minute + ":" + second;
        }      
		Eventscheduler.next_event.Run();
        Eventscheduler.m_Date.setSeconds(Eventscheduler.m_Date.getSeconds() + 1);
        setTimeout("Eventscheduler.clock()", 1000);
    },
    innerfade: {
        elements: 0,
        length: 0,
        speed: 0,
        pos: 0,
        initialize: function(container, speed) {
            this.elements = $(container).children();
            this.length = this.elements.length;
            this.speed = speed;
           
        },
        timer: {
            start: function() {
                this.handle = setTimeout(function() {
                    Eventscheduler.innerfade.next();
                }, Eventscheduler.innerfade.speed);
            },
            stop: function() {
                clearTimeout(this.handle);
            }
        },
        next: function(pos) {
            $(this.elements[this.pos]).fadeOut('normal');
            this.pos = (typeof(pos) == "undefined" ? (this.pos < this.length - 1 ? (parseInt(this.pos) + 1) : 0) : pos);
            $(this.elements[this.pos]).fadeIn('normal', function() {
                Eventscheduler.innerfade.removeFilter($(this)[0]);
            });
            $("#home_main_news .switch a").removeClass("on").addClass("off");
            $("#home_main_news .switch a[rel=" + this.pos + "]").removeClass("off").addClass("on");
            this.timer.start();
        },
        removeFilter: function(element) {
            if (element.style.removeAttribute) element.style.removeAttribute('filter');
        }
    }
};
Eventscheduler.next_event = {
	
    Schedule:EventList,
    Language: {},
    Selected: 0,
    Main: 0,
    Day: 0,
    OnClick: function(o, a) {		       
		$("#home_next_event div.event_container ").attr("class", "event_container").addClass("sa").addClass("border_box");
        $("#home_next_event .event_name").text(this.Schedule[a]["EventName"]);
        $("#home_next_event li").text(this.Schedule[a]["EventNote"]);
        $("#home_next_event a").removeClass("selected");
        $(o).addClass("selected");
        this.Selected = a;
        this.Run();
    },
    GenerateBlock: function(i) {				
        for (var a = i, b = 0, c = 0, d = ""; a <= EventCount; a++) {
            if (this.Schedule[a]["EventDay"] && $.inArray(Eventscheduler.m_Date.getDay(), this.Schedule[a]["EventDay"]) == -1) {
                if (a == EventCount) {
                    a = 1;
                    b = 1;
                }
                continue;
            }
            if (a >= i || b == 1) {
				
                if (c++ == 7) {							
					var innerHTML =  '<div id="event_container">' +
						'<div class="event_container ' + this.Schedule[i]["EventType"] + ' border_box">' +
							'<span class="border_box overflow_ellipsis box1">' +
								'<div class="event_text">' +
									'<div class="event_name">' + this.Schedule[i]["EventName"] + '</div>' +
									'<div class="event_time"></div>' +
								'</div>' +
								'<div id="home_next_event">' +
									'<div class="event_pagination">' +
										'<span class="box2">' + d + '</span>' +
									'</div>' +
								'</div>' +	
							'</span>' +
						'</div>' +
					'</div>';
                    return $("#home_next_event").html(innerHTML);
                }
                d += ('<a onclick="Eventscheduler.next_event.OnClick(this,' + a + ');"' + (c == 1 ? ' class="selected"' : '') + '></a>');
            }
            if (a == EventCount) {
                a = 1;
                b = 1;
            }
        }
    },
    Run: function() {
        for (var a = 0; a < 2; a++) {
            for (var i = 1; i <= EventCount; i++) {
				
                if (this.Selected == 0 && (this.Schedule[i]["EventDay"] && $.inArray(Eventscheduler.m_Date.getDay(), this.Schedule[i]["EventDay"]) != -1 || (!this.Schedule[i]["EventDay"] && (this.Schedule[i]["EventHour"] >= Eventscheduler.m_Date.getHours() || a != 0)))) {
                    this.GenerateBlock(i);
                    this.Selected = i;
                    this.Main = i;
                    this.Day = a;
                }
                if (this.Main != 0) {
                    var duration = this.Schedule[this.Selected]["EventTime"];
                    var hour = this.Schedule[this.Selected]["EventHour"];
                    var temp_date = new Date(Eventscheduler.m_Date);
                    var status = Eventscheduler.Lang.CLOSED;
					
                    if (this.Schedule[this.Selected]["EventDay"]) {
                        if (this.Schedule[this.Selected]["EventHour"] + 1 == Eventscheduler.m_Date.getHours()) {
                            this.Schedule[this.Selected]["EventHour"] = Eventscheduler.m_Date.getHours();
                            this.Schedule[this.Selected]["EventTime"] = 60;
                        }
                    }
                    if (this.Schedule[this.Selected]["EventHour"] == Eventscheduler.m_Date.getHours()) {
                        if (Eventscheduler.m_Date.getMinutes() < this.Schedule[this.Selected]["EventMinute"]) status = Eventscheduler.Lang.CLOSED;
                        else if (Eventscheduler.m_Date.getMinutes() < (this.Schedule[this.Selected]["EventMinute"] + this.Schedule[this.Selected]["EventTime"])) status = Eventscheduler.Lang.IN_PROGRESS;
                    }
                    if (this.Selected < this.Main) temp_date.setDate(Eventscheduler.m_Date.getDate() + 1);
                    if (this.Day != 0) temp_date.setDate(Eventscheduler.m_Date.getDate() + 1);
                    if (status == Eventscheduler.Lang.IN_PROGRESS) temp_date.setHours(this.Schedule[this.Selected]["EventHour"], this.Schedule[this.Selected]["EventMinute"] + this.Schedule[this.Selected]["EventTime"], 0);
                    else if (status == Eventscheduler.Lang.OPEN) temp_date.setHours(this.Schedule[this.Selected]["EventHour"], this.Schedule[this.Selected]["EventMinute"], 0);
                    else {
                        temp_date.setHours(this.Schedule[this.Selected]["EventHour"], 0, 0);
                    }
                    if (this.Schedule[this.Selected]["EventDay"]) {
                        this.Schedule[this.Selected]["EventTime"] = duration;
                        this.Schedule[this.Selected]["EventHour"] = hour;
                    }
                    var time_difference = (temp_date.getTime() / 1000) - (Eventscheduler.m_Date.getTime() / 1000);
                    if (time_difference < 0) {
                        this.Selected = 0;
                        this.Main = 0;
                        continue;
                    }
                    var days = Zero(Math.floor(time_difference / 86400));
                    var hours = Zero(Math.floor(time_difference / 3600));
                    var minutes = Zero(Math.floor(time_difference % 3600 / 60));
                    var seconds = Zero(Math.floor(time_difference % 3600 % 60));
                    $("#home_next_event .event_time").html(Eventscheduler.Lang.TIME_LEFT + " " +hours + ":" + minutes + ":" + seconds );
                    $("#home_next_event .status").html(Eventscheduler.Lang.STATUS + " : " + status);
                    return;
                }
            }
        }
    }
};
function Zero(val) {
    return (val < 10 ? "0" + val : val);
}