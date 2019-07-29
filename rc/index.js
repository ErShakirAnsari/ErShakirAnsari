
var IS_PARAMS = false;
var divParams = $('#idDivParams');
var divHeaders = $('#idDivHeaders');
var divAuthorizations = $('#idDivAuthorizations');

$().ready(function()
{
	$('.card-header').click(function()
	{
		$(this).next('.card-body').toggle('slow');
});

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
	if(variable)
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
		<div class='row my-1'>
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Param key' name='paramKey' id='idParamKey${time}' time-stamp='${time}' />
			</div>
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Param value' name='paramValue' id='idParamValue${time}' />
			</div>
			<div class='col-lg-2 col-sm-2'>
				<button class='btn btn-light' onclick='removeParam(this)'>Remove</button>
			</div>
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
	for(let i = 0; i< paramKeys.length; i++)
	{
		let paramName = paramKeys[i].value;
		let paramValue = document.getElementById("idParamValue" + paramKeys[i].getAttribute("time-stamp")).value;
		
		paramString += paramName + "=" + paramValue + "&";
	}
	
	if(paramString.length !== 0) 
	{
		paramString = paramString.substring(0, paramString.length - 1);
	}
	
	paramString = encodeURI(paramString);
	console.log("paramString: " + paramString);
}
// [END PARAM]


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
				<button class='btn btn-light' onclick='removeHeader(this)'>Remove</button>
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
	for(let i = 0; i< headerKeys.length; i++)
	{
		let paramName = headerKeys[i].value;
		let paramValue = document.getElementById("idHeaderValue" + headerKeys[i].getAttribute("time-stamp")).value;
		
		headerString += paramName + "=" + paramValue + "\n";
	}
	
	if(headerString.length !== 0) 
	{
		headerString = headerString.substring(0, headerString.length - 1);
	}
	
	console.log("headerString: " + headerString);
}
// [END HEADER]

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
				<button class='btn btn-light' onclick='removeAuthorizations(this)'>Remove</button>
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
	$('#idTextRequestBody').val( beautifyAndMinify( $('#idTextRequestBody').val(), 0));
}

function beautifyAndMinify(str, paddingSize)
{
	return JSON.stringify(JSON.parse(str), null, paddingSize);
}
