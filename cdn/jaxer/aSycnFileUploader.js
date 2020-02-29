/**
 * @author Shakir Ansari 
 */
var uploadURL = $('#contextPath').val() + '/api/v1/common/upload/orcdoc';
var panNo = $('#panHidden').val();
var bucketName = $('#bucketNameHidden').val();

var signatureFilePathURI = null;

//--------------------------------------------------------------------------------------------------

function aSycnFileUpload(THIS, fileUploadId) {
	
	let input = THIS.files[0];
	
	
	if(fileUploadId === 'signedAOFormFile'){
		$(function(){
			$(".signedAOFormFile").on('change', function(event) {
				var file = event.target.files[0];
   
					if(!file.type.match('application/pdf.*')) {
						alert("Allow only PDF file");
						$(".signedAOFormFile").get(1).reset(); //the tricky part is to "empty" the input file here I reset the form.
						return;
					}
					fileReader.readAsArrayBuffer(file);
			});
		}); 
	}
	
	if (!input) {
		showDefaultModal(genMSG);
	}
	
	let fileName = THIS.value.replace("C:\\fakepath\\", "");
	fileName = shortFileName(fileName);
	
	if(!isFileTypeAllowed(fileName, fileUploadId)) {
		fileName = THIS.value.replace("C:\\fakepath\\", "");
		showDefaultModal("<b>" + fileName + "</b></br>File is not supported.");
		return false;
	}

	let fileSize = THIS.files[0].size / 1024; 	//File size in KB
	if(!isFileSizeAllowed(fileSize, fileUploadId)) {
		showDefaultModal("File is too large.");
		return false;
	}
	
	$('#' + fileUploadId + 'UploadForm').ajaxSubmit(
	{
		beforeSend: function()
		{
			$('#' + fileUploadId + 'ImageTag').hide();
			$('#' + fileUploadId + 'LoaderImage').show();
			$('#' + fileUploadId + 'ParagraphTag').html(fileName).show();
		},

		complete: function(xhr)
		{
			updateFileUploadFlags();
			$('#' + fileUploadId + 'ImageTag').show();
			$('#' + fileUploadId + 'LoaderImage').hide();
			$('#' + fileUploadId + 'ParagraphTag').html('').hide();
		},

	    success: function(resp)
		{
	    	if(resp && resp.status == "success")
			{
	    		$('#' + fileUploadId + 'ViewAnchor').show();
		    	$('#' + fileUploadId + 'ErrorTag').hide();
	    		$('#' + fileUploadId + 'Path').val('' + resp.reasonCode);
	    		if(fileUploadId && ('signedAOFormFile' == fileUploadId))
				{
	    			$('#aoFormDocumentId').val('' + resp.reasonCode);
	    		}
			} else
			{
	    		if(resp.reasonCode && resp.reasonCode.indexOf('After compression file size is still more than 65Kb:') !== -1)
				{
	    			$('#' + fileUploadId + 'ErrorTag').html('File size is too large.');
	    			$('#' + fileUploadId + 'ErrorTag').prop('title', ' ');
				} else
				{
	    			$('#' + fileUploadId + 'ErrorTag').prop('title', resp.reasonCode);
				}
	    		$('#' + fileUploadId + 'ViewAnchor').hide();
		    	$('#' + fileUploadId + 'ErrorTag').show();
			}
    		checkAllUpload();
		},
	    
		uploadProgress: function(event, position, total, percentComplete)
		{
	        //var percentVal = percentComplete + '%';
	        //bar.width(percentVal)
	        //percent.html(percentVal);
			//console.log(percentVal, position, total);
	    },
	    error: function(ed)
		{
	    	$('#' + fileUploadId + 'ViewAnchor').hide();
	    	$('#' + fileUploadId + 'ErrorTag').show();
	    	showDefaultModal(genMSG);
	    }
	}); 	
}

function shortFileName (str)
{
	if(str != null && str.length > 17)
	{
		str = str.substring(0, 13) + ".." + str.substring(str.length - 4);
	}
	return str;
}

function isFileTypeAllowed (fileName, fileUploadId)
{
	if(fileName == undefined
		|| fileName == null
		|| fileUploadId == undefined
		|| fileUploadId == null)
	{
		return false;
	}

	fileName = fileName.toLowerCase();
	
	if (fileUploadId == 'signatureFile')
	{
		let match = false;
		var signatureSupFiles = ["jpg", "jpeg", "png", "gif", "bmp"];
		for(let i = 0; i < signatureSupFiles.length; i++)
		{
			if(fileName.endsWith(signatureSupFiles[i]))
			{
				match = true;
				break;
			}
		}
		return match;
	}

	if (fileUploadId == 'cancelledChequeFile')
	{
		let match = false;
		var cancelledChecqueSupFiles = ["jpg", "jpeg", "png", "gif", "bmp"];
		for(let i = 0; i < cancelledChecqueSupFiles.length; i++)
		{
			if(fileName.endsWith(cancelledChecqueSupFiles[i]))
			{
				match = true;
				break;
			}
		}
		return match;
	}
	
	if (fileUploadId == 'panFile')
	{
		let match = false;
		var panSupFiles = ["jpg", "jpeg", "png", "gif", "bmp"];
		for(let i = 0; i < panSupFiles.length; i++)
		{
			if(fileName.endsWith(panSupFiles[i]))
			{
				match = true;
				break;
			}
		}
		return match;
	}

	if (fileUploadId == 'aadharFile')
	{
		let match = false;
		var aadharSupFiles = ["jpg", "jpeg", "png", "gif", "bmp"];
		for(let i = 0; i < aadharSupFiles.length; i++)
		{
			if(fileName.endsWith(aadharSupFiles[i]))
			{
				match = true;
				break;
			}
		}
		return match;
	}
	
	if (fileUploadId == 'signedAOFormFile')
	{
		let match = false;
		var signedSupFiles = ["pdf"];
		for(let i = 0; i < signedSupFiles.length; i++)
		{
			if(fileName.endsWith(signedSupFiles[i]))
			{
				match = true;
				break;
			}
		}
		return match;
	}
	return true;
}

function isFileSizeAllowed (fileSize, fileUploadId)
{
	if(fileSize == undefined
		|| fileSize == null
		|| fileUploadId == undefined
		|| fileUploadId == null)
	{
		return false;
	}
	
	//-- file size in KB
	var mb5 = 5 * 1024 * 1024;
	var signatureMaxFileSize = mb5;
	var cancelledChecqueMaxFileSize = mb5;
	var panMaxFileSize = mb5;
	var aadharMaxFileSize = mb5;
	
	if (fileUploadId == 'signatureFile')
	{
		return fileSize <= signatureMaxFileSize;
	}

	if (fileUploadId == 'cancelledChequeFile')
	{
		return fileSize <= cancelledChecqueMaxFileSize;
	}

	if (fileUploadId == 'panFile')
	{
		return fileSize <= panMaxFileSize;
	}

	if (fileUploadId == 'aadharFile')
	{
		return fileSize <= aadharMaxFileSize;
	}
	
	return true;
}


