class Options { };
const LOCAL_OPTIONS = 'options';
var OPT = null;
var IMAGE_TYPES = ['.png', '.jpg', '.jpeg', '.gif'];

$('#myModal').on('show.bs.modal', function (e)
{
	initOptionModal();
});

function initOptionModal()
{
	if (!getLocal(LOCAL_OPTIONS))
	{
		return false;
	}

	OPT = getLocal(LOCAL_OPTIONS);
	console.log(LOCAL_OPTIONS, [JSON.stringify(OPT)]);

	let form = document.formCdnOptions;

	form.cdnType.value = OPT.cdnType;
	form.onlyMinified.checked = OPT.onlyMinified
	form.resourceType.value = OPT.resourceType;
	form.maxResult.value = OPT.maxResult;
}
initOptionModal();

function saveOptions()
{
	let form = document.formCdnOptions;
	OPT = new Options();

	OPT.cdnType = form.cdnType.value;
	OPT.onlyMinified = form.onlyMinified && form.onlyMinified.checked;
	OPT.resourceType = form.resourceType.value;
	OPT.maxResult = form.maxResult.value;

	console.log(LOCAL_OPTIONS, [JSON.stringify(OPT)]);
	setLocal(LOCAL_OPTIONS, OPT);
}

var typed = new Typed("#typed",
	{
		strings: [
			'NO WARRANTY EXPRESSED OR IMPLIED.',
			'USE AT YOUR OWN RISK.',
			'USE YOUR OWN COPY.',
			'IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO NOT CONTROL.'
		],
		typeSpeed: 30,
		backSpeed: 30,
		backDelay: 5000,
		startDelay: 1000,
		loop: true,
		cursorChar: '_'
	});

var SEARCH_RESULT_SELECT = $('#idSelectResultSize');
var files = null;

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

function copyAsHtml(text)
{
	let textLowerCase = text.toLowerCase();
	if (text.endsWith(".css"))
	{
		text = "<link href='" + text + "' rel='stylesheet' type='text/css'>";
	} else if (text.endsWith(".js"))
	{
		text = "<script src='" + text + "' type='text/javascript'></script" + ">";
	} else if (textLowerCase.endsWith(".jpeg")
		|| textLowerCase.endsWith(".jpg")
		|| textLowerCase.endsWith(".gif")
		|| textLowerCase.endsWith(".png"))
	{
		text = "<img '" + text + "' alt='" + text.substring(text.lastIndexOf("/") + 1, text.length) + "' />";
	}
	window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function copy(url)
{
	window.prompt("Copy to clipboard: Ctrl+C, Enter", url);
}

function search(THIS)
{
	var query = $(THIS).val();
	if (!query || query === "")
	{
		$('#idDivSearchResult').empty();
		return false;
	}

	if (!files)
	{
		getFileListFromServer();
	}
		
	OPT = getLocal(LOCAL_OPTIONS);
	let searchResultSize = OPT.maxResult;
	let resourceType = OPT.resourceType;
	let lableStr = "";
	let matchCount = 0;
	
	if (resourceType)
	{
		resourceType = resourceType.toLowerCase();
		
		for(let i = 0; i < files.length; i++)
		{
			let matchFound = false;
			let singleFile = files[i].toLowerCase();
			
			if(resourceType === 'all')
			{
				matchFound = isFileNameContainsSearchQuery(singleFile, query);
			} else if(resourceType === 'css' || resourceType === 'js')
			{
				if(singleFile.endsWith(resourceType))
				{
					matchFound = isFileNameContainsSearchQuery(singleFile, query);
				}
			} else if(resourceType === 'image')
			{
				for(let j = 0; j < IMAGE_TYPES.length; j++)
				{
					if(singleFile.endsWith(IMAGE_TYPES[j]))
					{
						matchFound = isFileNameContainsSearchQuery(singleFile, query);
					}
				}
			}

			if (matchFound)
			{
				lableStr += createLable(singleFile);
				if (++matchCount == searchResultSize)
				{
					break;
				}
			}
		};
	}
	
	lableStr = lableStr.length === 0 ? "<br>No data found!" : lableStr;
	$('#idDivSearchResult').empty().html('<hr>' + lableStr);
}

function isFileNameContainsSearchQuery(singleFile, searchQuery)
{
	let allSubQueriesFound = true;
	let subQueries = searchQuery.toLowerCase().split(" ");	
	for(let j = 0; j < subQueries.length; j++)
	{
		if (singleFile.indexOf(subQueries[j]) === -1)
		{
			allSubQueriesFound = false;
			break;
		}
	}
	return allSubQueriesFound;
}

function createLable(fileName)
{
	let url = '';
	let version = $('#idSelectVersion').val();
	
	if (OPT.cdnType === 'gitHub')
	{
		url = 'https://ershakiransari.github.io/cdn/' + fileName;
	} else
	{
		url = 'https://cdn.jsdelivr.net/gh/ershakiransari/ErShakirAnsari.github.io@' + version + '/cdn/' + fileName;
	}

	var str = `
			<div class='row resultRow'>
				<i class='fa fa-copy' title='Copy to clipboard' onclick="copy('${url}')"></i>
				&nbsp;
				<i class='fa fa-clipboard' title='Copy to clipboard as HTML' onclick="copyAsHtml('${url}')"></i>
				&nbsp;&nbsp;
				<a href='${url}' target='_blank'>${fileName}</a>
			</div>
		`;
	return str;
}

function getFileListFromServer()
{
	debugger;
	let localTimestamp = getLocal('timestamp');
	let localfileList = getLocal('fileList');

	if (localTimestamp && localfileList && localTimestamp === timestamp)
	{
		files = localfileList;
		console.log('getFileListFromServer - data found returning without contacting server..');
		return false;
	}

	$.ajax({
		url: 'fileList.json',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (response)
		{
			console.log('getFileListFromServer - response: ' + response);
			if (response)
			{
				setLocal('fileList', response);
				setLocal('timestamp', timestamp);
				files = JSON.stringify(response);
			}
		}
	});
}
getFileListFromServer();