
var IS_PARAMS = false;

$().ready(function(){
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

function addMoreParams(THIS)
{
	
}