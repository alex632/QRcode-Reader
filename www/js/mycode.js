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
		$( "#dialog-confirm-follow-url" ).dialog({
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
				/*
				,
				Cancel: function() {
					$( this ).dialog( "close" );
				}
				*/
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
		QRScanner.show();
		// Make the webview transparent so the video preview is visible behind it.
		// Be sure to make any opaque HTML elements transparent here to avoid covering the video.
		$('body').css('background-color', 'transparent');
		$('.app').css('display', 'none');
		$('.footer').css('display', 'block');
	}

	function hideScanner() {
		QRScanner.hide();
		$('body').css('background-color', '');
		$('.app').css('display', '');
		$('.footer').css('display', '');
	}

	/*
	 * Try another plug-in
	 */
	function scan2(){
		// Start a scan. Scanning will continue until something is detected or `QRScanner.cancelScan()` is called.
		QRScanner.scan(function(err, contents){
			if(err){
				if(err.name === 'SCAN_CANCELED') {
					//alert(err._message);	// Scan was canceled.
				} else {
					alert(err._message);
				}
			} else {
				//alert('Scan returned: ' + contents);
				jump(contents);
			}
			hideScanner();
		});
		showScanner();
	}

})();
