
var IS_PARAMS = false;
var divParams = $('#idDivParams');
var divHeaders = $('#idDivHeaders');
var divAuthorizations = $('#idDivAuthorizations');
var divResponseBox = $('#idDivResponseBox');

class Request { }

$().ready(function ()
{
	$('.card-header').click(function ()
	{
		$(this).next('.card-body').toggle('slow');
	});

	$('#idAnchorPayloads').click(function ()
	{
		$('#idDivPayloads').toggle('slow');
	});

	let requestObj = getLocal('requestObj');
	if (requestObj)
	{
		//requestObj = new Request();
		$('#idSelectMethod').val(requestObj.method);
		$('#idInputUrl').val(requestObj.url);
		$('#idTextRequestBody').val(requestObj.requestBody);
	}

	/**
	$("#idTextRequestBody").bcralnit(
	{
		width: '50px',
		background: '#75BAFF',
		color: '#fff'
	});
	*/
});

function _toggle(THIS, tableId, variable)
{
	if (variable)
	{
		$(THIS).text('Disable').removeClass('btn-primary').addClass('btn-light');
		$('#' + tableId).fadeIn(333);
	} else
	{
		$(THIS).text('Enable').removeClass('btn-light').addClass('btn-primary');
		$('#' + tableId).fadeOut(333);
	}
}
function toggleParams(THIS)
{
	IS_PARAMS = !IS_PARAMS;
	_toggle(THIS, 'idTableParams', IS_PARAMS);
}
// [START PARAM]
function addParam()
{
	let time = new Date().getTime();
	let str = `
		<div>
			<input class='form-control' placeholder='Param key' name='paramKey' id='idParamKey${time}'	time-stamp='${time}' />
		</div>
		<div>
			<input class='form-control' placeholder='Param value' name='paramValue' id='idParamValue${time}' />
		</div>
		<div>
			<button class='btn btn-light' onclick='removeParam(this)'>
				<i class='fa fa-trash'></i>
			</button>
		</div>
	`;
	divParams.append(str);
}
function removeParam(THIS)
{
	$(THIS).parent().parent().remove();
}
function getParams()
{
	let paramKeys = document.getElementsByName("paramKey");

	let paramString = "";
	for (let i = 0; i < paramKeys.length; i++)
	{
		let paramName = paramKeys[i].value;
		let paramValue = document.getElementById("idParamValue" + paramKeys[i].getAttribute("time-stamp")).value;

		paramString += paramName + "=" + paramValue + "&";
	}

	if (paramString.length !== 0)
	{
		paramString = paramString.substring(0, paramString.length - 1);
	}

	paramString = encodeURI(paramString);
	console.log("paramString: " + paramString);
	return paramString;
}

// [START HEADER]
function addHeader()
{
	let time = new Date().getTime();

	let str = `
		<div class='row my-1'>
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Header key' name='headerKey' id='idHeaderKey${time}' time-stamp='${time}' />
			</div>
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Header value' name='headerValue' id='idHeaderValue${time}' />
			</div>
			<div class='col-lg-2 col-sm-4'>
				<button class='btn btn-light' onclick='removeHeader(this)'>
					<i class='fa fa-trash'></i>
				</button>
			</div>
		</div>
	`;

	divHeaders.append(str);
}
function removeHeader(THIS)
{
	$(THIS).parent().parent().remove();
}
function getHeaders()
{
	let headerKeys = document.getElementsByName("headerKey");

	let headerString = "";
	for (let i = 0; i < headerKeys.length; i++)
	{
		let paramName = headerKeys[i].value;
		let paramValue = document.getElementById("idHeaderValue" + headerKeys[i].getAttribute("time-stamp")).value;

		headerString += paramName + "=" + paramValue + "\n";
	}

	if (headerString.length !== 0)
	{
		headerString = headerString.substring(0, headerString.length - 1);
	}

	console.log("headerString: " + headerString);
}

// [START AUTHORIZATIONS]
function addAuthorizations()
{
	let time = new Date().getTime();
	let str = `
		<div class='row my-1'>
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Authorizations key' name='authorizationKey' id='idAuthorizationKey${time}' time-stamp='${time}' />
			</div>
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Authorizations value' name='authorizationValue' id='idAuthorizationValue${time}' />
			</div>
			<div class='col-lg-2 col-sm-4'>
				<button class='btn btn-light' onclick='removeAuthorizations(this)'>
					<i class='fa fa-trash'></i>
				</button>
			</div>
		</div>
	`;

	divAuthorizations.append(str);
}
function removeAuthorizations(THIS)
{
	$(THIS).parent().parent().remove();
}

function disableButton(obj)
{
	disableThis(obj);
	$(obj).addClass("disabled");
}
function enableButton(obj)
{
	$(obj).removeClass("disabled");
	enableThis(obj);
}
function disableThis(obj)
{
	$(obj).prop("disabled", true);
}
function enableThis(obj)
{
	$(obj).prop("disabled", false);
}

function beautifyRequestBody()
{
	$('#idTextRequestBody').val(beautifyAndMinify($('#idTextRequestBody').val(), 3));
}

function minifyRequestBody()
{
	$('#idTextRequestBody').val(beautifyAndMinify($('#idTextRequestBody').val(), 0));
}

function beautifyAndMinify(str, paddingSize)
{
	return JSON.stringify(JSON.parse(str), null, paddingSize);
}

// -------------------------------
// -------------------------------
function createCORSRequest(method, url)
{
	var xhr = new XMLHttpRequest();

	if ("withCredentials" in xhr)
	{
		// Check if the XMLHttpRequest object has a "withCredentials" property.
		// "withCredentials" only exists on XMLHTTPRequest2 objects.
		xhr.open(method, url, true);
	} else
		if (typeof XDomainRequest != "undefined")
		{
			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else
		{
			// Otherwise, CORS is not supported by the browser.
			xhr = null;
		}
	return xhr;
}
function preRequest(THIS)
{
	requestObj = new Request();
	requestObj.method = $('#idSelectMethod').val();
	requestObj.url = $('#idInputUrl').val();
	requestObj.requestBody = $('#idTextRequestBody').val();
	setLocal('requestObj', requestObj);

	disableButton(THIS);
	divResponseBox.hide(function ()
	{
		$(this).empty();
	});
}
function sendRequest(THIS)
{
	preRequest(THIS);

	var data = JSON.stringify(
		{
			"ACTION": "scl_testApi",
			"APP_VERSION": "500",
			"APP_TYPE": "CUSTOMER",
			"REQ_SOURCE": "ANDROID",
			"param0": "10",
			"param1": "20",
			"ACCESS_TOKEN": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNTY0NDAyNzkyLCJpc3MiOiI2OWEyNDM5Mjk3OWI0YzI1ZGQyYjU4ZGM4ODJmOTJhNiJ9.Dra7JCCQcs0uFZfTq67k44FvSu9c4hX_pmpNFJya64Q"
		});

	if ($('#idTextRequestBody').val() === '')
	{
		data = null;
	} else
	{
		data = JSON.stringify(JSON.parse($('#idTextRequestBody').val()));
	}

	var method = $('#idSelectMethod').val();
	var params = getParams();
	params = !params || params === '' ? '' : '?' + params;
	var url = $('#idInputUrl').val() + params;

	//var xhr = new XMLHttpRequest();
	//xhr.withCredentials = true;

	var xhr = createCORSRequest(method, url);
	if (!xhr)
	{
		throw new Error('CORS not supported');
	}

	xhr.addEventListener("readystatechange", function ()
	{
		if (this.readyState === 4)
		{
			enableButton(THIS);
			xhrResponseHandler(xhr, this.responseText);
		}
	});

	//xhr.setRequestHeader("Content-Type", "application/json");
	//xhr.setRequestHeader("Accept", "*/*");
	//xhr.setRequestHeader("Cache-Control", "no-cache");
	//xhr.setRequestHeader("Host", "localhost:8080");
	//xhr.setRequestHeader("Cookie", "X-XSRF-TOKEN=SuhelKhan");
	//xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
	//xhr.setRequestHeader("Content-Length", "335");
	//xhr.setRequestHeader("Connection", "keep-alive");
	//xhr.setRequestHeader("cache-control", "no-cache");

	// [DO NOT ADD]
	//xhr.setRequestHeader("Access-Control-Allow-Origin", null);
	// [DO NOT ADD]

	xhr.send(data);
}
function xhrResponseHandler(xhr, responseText)
{
	console.log(responseText);
	console.log('heradersString: ' + xhr.getAllResponseHeaders());

	let heradersString = xhr.getAllResponseHeaders();

	if (isHtmlResponse(heradersString))
	{
		divResponseBox.html(responseText);
	}
	else if (isJsonResponse(heradersString))
	{
		//divResponseBox.html(`<pre>${JSON.stringify(JSON.parse(responseText), null, 3)}</pre>`);
		try
		{
			var input = eval('(' + responseText + ')');
		}
		catch (error)
		{
			return alert("Cannot eval JSON: " + error);
		}

		var options = {
			collapsed: false,
			rootCollapsable: false,
			withQuotes: true,
			withLinks: false
		};
		$('#json-renderer').jsonViewer(input, options);

	}
	//divResponseBox.fadeIn('slow');
}

function isHtmlResponse(heradersString)
{
	return heradersString.indexOf('text/html') > 0;
}
function isJsonResponse(heradersString)
{
	let response = heradersString.includes('text/json') || heradersString.includes('application/json')
	return response;
}

function setLocal(key, valueObj)
{
	localStorage.setItem(key, JSON.stringify(valueObj));
}
function getLocal(key)
{
	if (localStorage.getItem(key) && localStorage.getItem(key) !== 'undefined')
	{
		return JSON.parse(localStorage.getItem(key));
	}
	return null;
}