var config = null;

function add_wifi(ssid, psk)
{
	var fields = {
		'ssid': ssid,
		'psk': psk
	};

	clone_template("networks", fields);
}

function load_wifi_setup(){
	if (config == null) {
		$.ajax({
			 method: "GET",
			 dataType: "json",
			 retry_count: 3,
			 url: get_url("config"),
			 success: function(data) {
			 debugger;
				 config = data;

				 $("#networks-list").html("");

				 $("#reportInterval").val(config.reportInterval);
				 $("#measureInterval").val(config.measureInterval);

				 $.each(data.networks, function(ssid, psk){
					 add_wifi(ssid, psk);
				 });

				 add_message("INFO: config.json loaded!");
			 },
			 error: function(data) {
				 add_message("ERROR: config.json is corrupted!");
			 }
		});
	}
}

function config_init() {
	var form = $("#wifi-config-form");

	form.find("#add-wifi").click(function() {
		add_wifi("", "");
	});

	form.find("#config-save").click(function() {
		var reportInterval = $("#reportInterval").val();
		var measureInterval = $("#measureInterval").val();
		var error = false;

		$("#wifi-config-form").find(":input").each(function(){
			$(this).removeClass("is-invalid");
			$(this).addClass("is-valid");
		});

		if (!checkInt(measureInterval, 300, 1000)) {
			$("#measureInterval").addClass("is-invalid");
			error = true;
		}
		if (!checkInt(reportInterval, 10, 10000)) {
			$("#reportInterval").addClass("is-invalid");
			error = true;
		}

		if (error) {
			add_message("WARNING: Form contains errors, please check");
			return;
		}

		config.reportInterval = parseInt(reportInterval);
		config.measureInterval = parseInt(measureInterval);

		config.networks = {};
		 $("#networks-list").find(".template-section").each(function(){
			 var ssid = template_field(this, "ssid", checkEmpty);
			 var psk = template_field(this, "psk");
			 config.networks[ssid] = psk;
		 });

		 $.ajax({
			 method: "POST",
			 dataType: "json",
			 url: get_url("config"),
			 data: JSON.stringify(config, null, 1),
			 contentType: "application/json; charset=utf-8",
			 success: function(data) {
				 add_message(data.msg);
			 },
			 error: function(data) {
				 add_message("ERROR: failed saving config.json !");
			 }
		 });
	});

	form.find("#config-load").click(function() {
		config = null;
		load_wifi_setup();
	});

	form.find("#config-reboot").click(function() {
		ws.send("REBOOT");
	});
}
