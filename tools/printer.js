/*!
 * @version : 1.0.0
 * @date    : Jul 29, 2019, 8:40:27 PM
 * @author  : Shakir
 */

function printFooter()
{
	let str = `
		<br><br><br>
		<hr>
		<h6 class="footer m-0 px-5 text-right">
			Written by <em>ErShakirAnsari</em>
			<br>
			&copy; 2018 - ${new Date().getYear() + 1900}
		</h6>
		<hr>
	`;
	document.write(str);
}