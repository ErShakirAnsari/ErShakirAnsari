function doHtmlDiffs() {
	let text1 = $('#text1').val();
	let text2 = $('#text2').val();

	$('#out1').html("" + htmldiff(text1, text2));
	$('#out2').html("" + htmldiff(text2, text1));
}

$().ready(function(){
	let originalHTML = `
    <p>Hello Mr. Wayne, decide what to do:</p>
    <ul>
        <li>Call Alfred</li>
        <li>Take Thalia Al Gul to the cinema</li>
        <li>Save Gotham</li>
    </ul>
    <span>Use the mouse to choose an option.</span>
	`;

	let newHTML = `
	<p>Hello Batman, decide what to do:</p>
	<ul>
		<li>Kill The Joker</li>
		<li>Save Thalia Al Gul</li>
		<li>Save Gotham</li>
	</ul>
	<span>Use the batarang to choose an option.</span>
	`;

	// Diff HTML strings
	//var output = htmldiff(originalHTML, newHTML);
	//alert(output);

	// Show HTML diff output as HTML (crazy right?)!
	//document.getElementById("output").innerHTML = output;
	//$('#output').html("" + output);
	//console.log("output: ", output);
});

