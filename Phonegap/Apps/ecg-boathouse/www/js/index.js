var submitValues = [];

function resizeAll() {
	// resize the content div to fit the page height at a minimum
	var content_div = $("#content");
	var content_mh = $(window).height() - $("#header").height() - $("#footer").height();
	content_div.css("min-height", content_mh);

	// set the dimensions for the popup background
	var popup_bkg = $("#popup-bkg");
	var popup_w = $(window).width();
	var popup_h = $(window).height();
	popup_bkg.width(popup_w);
	popup_bkg.height(popup_h);
}

function sliderRepeater(self, label, units) {
	label.text($(self).val() + " " + units);
	self.timer = window.setTimeout(sliderRepeater, 50, self, label, units);
}

function attachOptionsEvents() {
	var button = $(".ftr-button-right");
	var popup = $("#options-popup");
	var save_btn = popup.children(".popup-lower").children(".popup-button-left");
	var back_btn = popup.children(".popup-lower").children(".popup-button-right");
	var table_btns = $(".pbody-button");
	var table_lookup = [];
	var dest_btns = $(".popup-button");
	var dest_lookup = [];

	table_lookup["Table A"] = $(table_btns[0]);
	table_lookup["Table B"] = $(table_btns[1]);
	table_lookup["Table C"] = $(table_btns[2]);

	dest_lookup[$(dest_btns[0]).attr("url")] = $(dest_btns[0]);
	dest_lookup[$(dest_btns[1]).attr("url")] = $(dest_btns[1]);

	popup.click(function(e) {
		e.stopPropagation();
	});

	button.click(function() {
		table_lookup[submitValues["table"]].trigger("click");
		dest_lookup[submitValues["dest"]].trigger("click");
		showPopup("#options-popup");
	});

	table_btns.click(function() {
		table_btns.removeClass("button-blue").addClass("button-white");
		$(this).removeClass("button-white").addClass("button-blue");
	});

	dest_btns.click(function() {
		dest_btns.removeClass("button-blue").addClass("button-white");
		$(this).removeClass("button-white").addClass("button-blue");
	});

	save_btn.click(function() {
		submitValues["table"] = $(".button-blue.pbody-button").text();
		submitValues["dest"] = $(".button-blue.popup-button").attr("url")
		closePopup();
	});

	back_btn.click(function() {
		closePopup();
	});
}

function attachSubmitEvents() {
	var u_button = $(".ftr-button-left");
	var s_button = $("#success-button");
	var f_button = $("#fail-button");
	var u_popup = $("#submit-popup");
	var s_popup = $("#failed-popup");
	var f_popup = $("#uploaded-popup");

	u_popup.click(function(e) {
		e.stopPropagation();
	});

	s_popup.click(function(e) {
		e.stopPropagation();
	});

	f_popup.click(function(e) {
		e.stopPropagation();
	});

	u_button.click(function() {
		var currentTime = new Date();
		var timestamp = JSON.stringify(currentTime);

		if (submitValues["dest"] === "rsense") {
			showPopup("#submit-popup");
			$("#popup-bkg").data("submit", true);

			$.post("http://rsense-dev.cs.uml.edu/api/v1/projects/504/jsonDataUpload", {
				email: "tyler.puleo22@gmail.com",
				password: "414991@Westland",
				title: submitValues["table"] + " - Data Submission - " + timestamp,
				data: {
					"2260": [timestamp],
					"2261": [submitValues["temp"]],
					"2262": [submitValues["oxy"]],
					"2263": [submitValues["ph"]],
					"2264": [submitValues["phos"]],
					"2265": [0],
					"2266": [0]
				}
			})
			.done(onSubmitSuccess)
			.fail(onSubmitFail);
		} else {
			alert("uploading to iSENSE currently not working");
		}
	});

	s_button.click(function() {
		$("#popup-bkg").removeData("submit");
		detachSubmitEvents();
		closePopup();
	});

	f_button.click(function() {
		$("#popup-bkg").removeData("submit");
		closePopup();
	});
}

function onSubmitSuccess() {
	showPopup("#uploaded-popup");
}

function onSubmitFail() {
	showPopup("#failed-popup");
}

function detachSubmitEvents() {
	submitValues["temp"] = undefined;
	submitValues["ph"] = undefined;
	submitValues["phos"] = undefined;
	submitValues["oxy"] = undefined;

	$("input[type=range]").each(function() {
		var $this = $(this);
		var $labl = $this.parent().parent().children(".popup-value").children(".popup-value-text");

		$this.val(parseFloat($this.attr("ecgdef")));
		$labl.text($this.val() + " " + $labl.attr("units"));
	});

	$(".val-value").text("Please enter a value");
	$(".ftr-button-left").removeClass("button-blue").addClass("button-inactive");
	$(".ftr-button-left").off("click");
}

function attachPopupEvents(name, units) {
	var button = $("#" + name + "-button");
	var btn_lbl = button.children(".val-value");
	var popup = $("#" + name + "-popup");
	var slider = popup.children(".popup-input").children();
	var label = popup.children(".popup-value").children(".popup-value-text");
	var l_adjust = popup.children(".popup-value").children(".slide-button:eq(0)");
	var r_adjust = popup.children(".popup-value").children(".slide-button:eq(1)");
	var save_btn = popup.children(".popup-lower").children(".popup-button-left");
	var back_btn = popup.children(".popup-lower").children(".popup-button-right");

	var savedValue = parseFloat(label.text());

	button.click(function() {
		if (submitValues[name] === undefined) {
			savedValue = parseFloat(label.text());
		}

		slider.val(savedValue);

		label.text(savedValue + " " + units)

		showPopup("#" + name + "-popup");
	});

	popup.click(function(e) {
		e.stopPropagation();
	});

	slider.mousedown(function() {
		sliderRepeater(this, label, units);
	});

	slider.mouseup(function() {
		clearTimeout(this.timer);
	});

	slider.on("touchstart", function() {
		slider.trigger("mousedown");
	});

	slider.on("touchend", function() {
		slider.trigger("mouseup");
	});

	slider.change(function() {
		clearTimeout(this.timer);
		sliderRepeater(this, label, units);
		clearTimeout(this.timer);
	});

	l_adjust.click(function() {
		var newValue = Math.max(parseFloat(slider.attr("min")), parseFloat(slider.val()) - parseFloat(slider.attr("step")));
		slider.val(newValue);
		label.text(newValue + " " + units);
	});

	r_adjust.click(function() {
		var newValue = Math.min(parseFloat(slider.attr("max")), parseFloat(slider.val()) + parseFloat(slider.attr("step")));
		slider.val(newValue);
		label.text(newValue + " " + units);
	});

	save_btn.click(function() {
		savedValue = parseFloat(label.text());
		submitValues[name] = savedValue;
		btn_lbl.text(savedValue + " " + units);
		closePopup();
		canSubmit();
	});

	back_btn.click(function() {
		closePopup();
	});
}

function showPopup(name) {
	$(".popup").each(function() {
		$(this).hide();
	});
	$(name).show();

	$("#popup-bkg").show();
	/*$("#popup-bkg").css({opacity: 0});
	$("#popup-bkg").animate({
		opacity: 1
	}, {
		duration: 100
	});*/
}

function closePopup() {
	/*$("#popup-bkg").animate({
		opacity: 0
	}, {
		duration: 100,
		done: function() {
			if (parseFloat($("#popup-bkg").css("opacity")) === 0) {
				$("#popup-bkg").hide();
			}
		}
	});*/
	var pbkg = $("#popup-bkg");
	if (pbkg.data("submit")) {
		return;
	}
	$("#popup-bkg").hide();
}

function canSubmit() {
	if ($(">ftr-button-left").hasClass("button-blue")) {
		return;
	}

	var ready = true;
	for (var i in submitValues) {
		ready = ready && (submitValues[i] != undefined);
	}

	if (ready) {
		$(".ftr-button-left").removeClass("button-inactive").addClass("button-blue");
		attachSubmitEvents();
	}
}

$(document).ready(function() {
	submitValues["temp"] = undefined;
	submitValues["ph"]   = undefined;
	submitValues["phos"] = undefined;
	submitValues["oxy"]  = undefined;
	submitValues["table"] = $(".button-blue.pbody-button").text();
	submitValues["dest"] = $(".button-blue.popup-button").attr("url");

	resizeAll();

	$("#popup-bkg").hide();
	closePopup();

	$(window).resize(resizeAll);

	$("#popup-bkg").click(closePopup);

	attachPopupEvents("temp", "°C");
	attachPopupEvents("ph", "");
	attachPopupEvents("phos", "ppm");
	attachPopupEvents("oxy", "ppm");
	attachOptionsEvents();
});