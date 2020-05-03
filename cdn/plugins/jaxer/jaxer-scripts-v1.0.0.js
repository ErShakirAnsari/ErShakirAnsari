/*!
 * document    : jaxer-scripts-v1.0.0.js
 *
 * @version    : 1.0.0
 * @date       : Mar 01, 2020, 14:24:45
 * @copyright  : Jaxer
 * @author     : SKR
 **/


function getQueryParameter(name)
{
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

	var results = regex.exec(location.search);

	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function addQueryString(key, value)
{
	key = encodeURIComponent(key);
	value = encodeURIComponent(value);

	let urlWithoutQueryString = window.location.protocol + "//" + window.location.host + window.location.pathname;

	if (document.location.search === '')
	{
		// document.location.search = '?' + key + '=' + value;
		urlWithoutQueryString = urlWithoutQueryString + '?' + key + '=' + value;
		window.history.pushState({ path: urlWithoutQueryString }, '', urlWithoutQueryString);
		return;
	}

	//kvp = key value pair
	var kvp = document.location.search.substr(1).split('&');
	var i = kvp.length;
	var x;

	while (i--)
	{
		x = kvp[i].split('=');

		if (x[0] == key)
		{
			x[1] = value;
			kvp[i] = x.join('=');
			break;
		}
	}

	if (i < 0)
	{
		kvp[kvp.length] = [key, value].join('=');
	}

	//without refresh
	let queryString = '';
	kvp.forEach(pair =>
	{
		let x = pair.split('=');
		queryString += x[0] + '=' + x[1] + '&';
	});

	if (queryString.endsWith('&'))
	{
		queryString = queryString.substring(0, queryString.length - 1);
	}

	urlWithoutQueryString = urlWithoutQueryString + '?' + queryString;
	window.history.replaceState(null, null, urlWithoutQueryString);
}
