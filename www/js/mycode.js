//mycode.js
(function(){
	document.addEventListener('deviceready', onDeviceReady);
	function onDeviceReady() {
		document.querySelector('#scanit').addEventListener('click', e => {
			funScan();
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
		$("#url-got").html(result.text);
		$( "#dialog-confirm-follow-url" ).dialog({
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"用瀏覽器打開": function() {
					var ref = cordova.InAppBrowser.open(result.text, '_system', 'location=yes');
					$( this ).dialog( "close" );
				},
				"用App打開": function() {
					var ref = cordova.InAppBrowser.open(result.text, '_blank', 'location=yes');
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
})();
