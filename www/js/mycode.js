//mycode.js
(function(){
	document.addEventListener('deviceready', onDeviceReady);
	function onDeviceReady() {
		document.querySelector('#scanit').addEventListener('click', e => {
			funScan();
		});
		document.getElementById('scan2').addEventListener('click', e => {
			scan2();
		});

		$("#scan-cancel").click(function(){
			QRScanner.cancelScan();
			//hideScanner();
		});

		$("#scan-light-toggle").click(function(){
			if ( $(this).attr("state")==="1" ) {
				QRScanner.disableLight();
				$(this).attr("state", "0");
				$(this).html("開燈");
			} else {
				QRScanner.enableLight();
				$(this).attr("state", "1");
				$(this).html("關燈");
			}
		});
	}

	/*
	 * From maduka的技術日記
	 */
	function funScan()
	{
		var scanOption =
		{
			"preferFrontCamera": false, // iOS and Android
			"showFlipCameraButton": true, // iOS and Android
			"prompt": "Place a barcode inside the scan area", // supported on Android only
			"formats": "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
			"orientation": "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
		};

		cordova.plugins.barcodeScanner.scan(funScanSuccess, funScanFail, scanOption);
	}

	function jump(result) {
		$("#url-got").html(result);
		$("#dialog-confirm-follow-url").dialog({
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"用瀏覽器打開": function() {
					var ref = cordova.InAppBrowser.open(result, '_system', 'location=yes');
					$( this ).dialog( "close" );
				},
				"用App打開": function() {
					var ref = cordova.InAppBrowser.open(result, '_blank', 'location=yes');
					setTimeout(function(){ref.close();}, 11000);	//NOTE: no effect on '_system'?
					$( this ).dialog( "close" );
				},
				"取消": function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}
	
	function funScanSuccess(result)
	{
		if (result.cancelled)
			return;
		/*
		alert("We got a barcode\n" +
				"Result: " + result.text + "\n" +
				"Format: " + result.format + "\n" +
				"Cancelled: " + result.cancelled);
		*/
		jump(result.text);

		/*
		if ( confirm(result.text+"\nGo ahead?") ) {
			var ref = cordova.InAppBrowser.open(result.text, '_system', 'location=yes');
			setTimeout(function(){ref.close();}, 19000);	//NOTE: no effect on '_system'?
		}
		*/
	}

	function funScanFail(error)
	{
		alert("Scanning failed: " + error);
	}

	function showScanner() {
 		QRScanner.show(function(status){
			// Make the webview transparent so the video preview is visible behind it.
			// Be sure to make any opaque HTML elements transparent here to avoid covering the video.
			$('.app').css('display', 'none');
			$('.footer').css('display', 'block');
			$('body').css('background-color', 'transparent');
			//$('body').addClass('nobody');
		});
	}

	function hideScanner() {
		QRScanner.hide(function(status){
			$('.app').css('display', '');
			$('.footer').css('display', '');
			$('body').css('background-color', '');
			//$('body').removeClass('nobody');
		});
	}
	/*
	function turnOffLight() {
		QRScanner.getStatus(function(status){
			if (status.lightEnabled) {
				QRScanner.disableLight();
				$("#scan-light-toggle").attr("state", "0");
			}
		});
	}
     */

	/*
	 * Try another plug-in
	 */
	function scan2(){
		// Start a scan. Scanning will continue until something is detected or `QRScanner.cancelScan()` is called.
		QRScanner.scan(function(err, contents){
            QRScanner.disableLight();
            $("#scan-light-toggle").attr("state", "0");
			//turnOffLight();
			if (err) {
				if (err.name === 'SCAN_CANCELED') {
					//alert(err._message);	// Scan was canceled.
				} else
				if (err.name === 'CAMERA_ACCESS_DENIED') {	// err._message = The user denied camera access.
					if (confirm("Would you like to enable QR code scanning? You can allow camera access in your settings.")) {
						QRScanner.openSettings();
					}
				} else {
                    // Implicit call to prepare() failed won't generate error here. Bug!
					alert(err._message);
				}
			} else {
				//navigator.notification.beep(1);	// 3 tones too long
				navigator.vibrate(500);	// 500 ms, but ignored in iOS
                //navigator.notification.alert("掃到了", function(){}, "Yeah!", "Done");
				jump(contents);
			}
			hideScanner();
		});
		showScanner();
	}

})();
