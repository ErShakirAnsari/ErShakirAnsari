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