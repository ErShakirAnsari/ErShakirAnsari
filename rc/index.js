
var IS_PARAMS = false;
var divParams = $('#idDivParams');

$().ready(function(){
});

function sendRequest() {
	alert('sendRequest()');
	getParams();
}

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

function addParam()
{
	let time = new Date().getTime();
	
	let str = "";
	str += "<div class='row my-1'>";
	str += "<div class='col-lg-5 col-sm-4'>";
	str += "<input class='form-control' placeholder='Param key' name='paramKey' id='idParamKey" + time + "' time-stamp='" + time + "' />";
	str += "</div>";
	str += "<div class='col-lg-5 col-sm-4'>";
	str += "<input class='form-control' placeholder='Param value' name='paramValue'  id='idParamValue" + time + "'/>";
	str += "</div>";
	str += "<div class='col-lg-2 col-sm-4'>";
	str += "<button class='btn btn-light' onclick='removeParam(this)'>Remove</button>";
	str += "</div>";
	str += "</div>";

	divParams.append(str);
}

function removeParam(THIS)
{
	 $(THIS).parent().parent().remove();
}

function getParams()
{
	//divParams;
	let paramKeys = document.getElementsByName("paramKey");
	
	for(let i = 0; i< paramKeys.length; i++)
	{
		let time = paramKeys[i].getAttribute("time-stamp");
		let str = "param: " + paramKeys[i].value + ", value: " + document.getElementById("idParamValue" + time).value;
		alert(str);
	}
}
 
function addHeader()
{
	let str = `
		<div class="row my-1">
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Header key'/>
			</div>
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Header value'/>
			</div>
			<div class='col-lg-2 col-sm-4'>
				<button class='btn btn-light' onclick='removeHeader(this)'>Remove</button>
			</div>
		</div>
	`;
	$('#idDivHeaders').append(str);	 
 }
 
function removeHeader(THIS)
{
	$(THIS).parent().parent().remove();
}

function addAuthorizations()
{
	let str = `
		<div class="row my-1">
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Authorizations key'/>
			</div>
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Authorizations value'/>
			</div>
			<div class='col-lg-2 col-sm-4'>
				<button class='btn btn-light' onclick='removeAuthorizations(this)'>Remove</button>
			</div>
		</div>
	`;
	$('#idDivAuthorizations').append(str);	 
}

function removeAuthorizations(THIS)
{
	$(THIS).parent().parent().remove();
}
