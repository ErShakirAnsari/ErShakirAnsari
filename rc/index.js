
var IS_PARAMS = false;
var divParams = $('#idDivParams');

$().ready(function(){
});

function sendRequest() {
	alert('sendRequest()');
}

function getAllParams()
{
	divParams
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
	let str = `
		<div class="row my-1">
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Param key' name='paramKey'/>
			</div>
			<div class='col-lg-5 col-sm-4'>
				<input class='form-control' placeholder='Param value' name='paramValue'/>
			</div>
			<div class='col-lg-2 col-sm-4'>
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
