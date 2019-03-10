/*!
 * @version : 1.0
 * @date    : Oct 8, 2014, 4:40:04 PM
 * @author  : SKR
 */

//-----------------------------------------------

(function($) {

   defaults = {
      alertType: 'alert',                                      //- alert/confirm/prompt
      title: 'JaxerAlerts|SKR',                                //- Title of alerts box
      message: 'Custome message\nthis is JaxerAlerts v2.0',    //- Message of alerts box
      inputType: 'text',                                       //- <input type='email/text/password' in prompt
      value: '',

      closeButton: 'Close',
      okButton: 'OK',

      response: null,

      //draggable: true,
      resetOnScroll: true,
      verticalOffset: -75,                                     // vertical offset of the dialog from center screen, in pixels
      horizontalOffset: 0                                      // horizontal offset of the dialog from center screen, in pixels/
   };

   $.JaxerAlerts = function(options) {
      var opts = $.extend({}, defaults, options);

      show();

      function _hide() {
         $(".JaxerOverlay").fadeOut('slow', function(){ $(this).remove() });
         _overlay('hide');
      };
      function _overlay(status) {
         switch(status) {
            case 'show':
               _overlay('hide');
               $("body").append('<div id="jaxerPopUpOverlay" style="display:none"> </div>');
               $("#jaxerPopUpOverlay").css({
                  position: 'absolute',
                  zIndex: 99998,
                  top: '0px',
                  left: '0px',
                  width: '100%',
                  height: $(document).height(),
                  background: '#FFF',
                  opacity: 0.3
               });
               $('#jaxerPopUpOverlay').fadeIn('slow');
               break;
            case 'hide': $("#jaxerPopUpOverlay").fadeOut('slow', function(){ $(this).remove() }); break;
         }
      }

      function _reposition() {
         var top = (($(window).height() / 2) - ($(".JaxerOverlay").outerHeight() / 2)) + opts.verticalOffset;
         var left = (($(window).width() / 2) - ($(".JaxerOverlay").outerWidth() / 2)) + opts.horizontalOffset;
         if(top < 0) { top = 0; }
         if(left < 0) { left = 0; }

         // IE6 fix
         top = top + $(window).scrollTop();
         $(".JaxerOverlay").css({ top: top + 'px', left: left + 'px' });
         $("#jaxerPopUpOverlay").height($(document).height());
      }

      function show() {
         _hide();
         _overlay('show');

         var okButton = "<input type='button' class='fb large special' id='jaxerOKButton' value='" + opts.okButton + "'>";
         var closeButton = "<input type='button' class='fb large' id='jaxerCloseButton' value='" + opts.closeButton + "'>";
         var inputFeild = "<center> <input type='" + opts.inputType + "' class='JaxerInput' value='" + opts.value + "' id='jaxerInputFeild'> </center>";

         $("body").append(
            '<div class="JaxerOverlay" style="display: none">'
               + '<div class="JaxerContainer">'
                  + '<div class="JaxerTitle"> &nbsp; </div>'
                  + '<div class="JaxerMessage"> &nbsp; </div>'
                  + '<div class="JaxerButtonBar"> &nbsp; </div>'
               + '</div>'
         + '</div>');



      // IE6 Fix
      //var pos = ($.browser.msie && parseInt($.browser.version) <= 6) ? 'absolute' : 'fixed';
      var pos = 'absolute';
      //var pos = 'fixed';

      $(".JaxerOverlay").css({ position: pos, zIndex: 99998, padding: 0, margin: 0 });
      $(".JaxerContainer").css({ zIndex: 99999 });

      $(".JaxerTitle").html(opts.title.substring(0, 50).replace(/\n/g, '<br>'));
      $(".JaxerMessage").html(opts.message.substring(0, 500).replace(/\n/g, '<br>'));

      $(".JaxerOverlay").css({ minWidth: $(".JaxerOverlay").outerWidth(), maxWidth: $(".JaxerOverlay").outerWidth() }).fadeIn('slow');


      _reposition();

      switch(opts.alertType) {
         case 'alert':
            $(".JaxerButtonBar").html(closeButton);
            $("#jaxerCloseButton")
            .click(function(){ _hide(); opts.response(true); })
            .focus()
            .keypress(function(e){ if(e.keyCode === 13 || e.keyCode === 27){ $("#jaxerCloseButton").trigger('click'); } });
            break;

         case 'confirm':
            $(".JaxerButtonBar").html(okButton + closeButton);
            $("#jaxerOKButton").click(function(){ _hide(); if(opts.response){ opts.response(true); } });
            $("#jaxerCloseButton").click(function(){ _hide(); if(opts.response){ opts.response(false); } }).focus();
            $("#jaxerOKButton, #jaxerCloseButton").keypress(function(e){
               if(e.keyCode === 13){ $("#jaxerOKButton").trigger('click'); }
               if(e.keyCode === 27){ $("#jaxerCloseButton").trigger('click'); }
            });
            break;

         case 'prompt':
            $(".JaxerMessage").append('<br>' + inputFeild);
            $(".JaxerButtonBar").html(okButton + closeButton);
            $("#jaxerOKButton").click(function(){ var val = $("#jaxerInputFeild").val(); _hide(); if(opts.response){ opts.response(val); } });
            $("#jaxerCloseButton").click(function(){ _hide(); if(opts.response){ opts.response(null); } });
            $("#jaxerOKButton, #jaxerCloseButton").keypress(function(e){
               if(e.keyCode === 13){ $("#jaxerOKButton").trigger('click'); }
               if(e.keyCode === 27){ $("#jaxerCloseButton").trigger('click'); }
            });
            //if(value){ $("#jaxerInputFeild").val(value).focus().select(); }
            $("#jaxerInputFeild").focus().select();
            break;
         }

         $(window).resize(function(){
            _reposition();
         });

          // Make draggable requires jQuery UI draggables
          // if(opts.draggable){ alerts('OK'); try{$(".JaxerOverlay").draggable({handle:$(".JaxerTitle")});$(".JaxerTitle").css({cursor:'move'});}catch(e){alert('error' + e);}}

       }
   }

   // Shortuct functions
   jAlert      = function(options) { defaults.alertType = 'alert'; $.JaxerAlerts(options); }
   jConfirm    = function(options) { defaults.alertType = 'confirm'; $.JaxerAlerts(options); }
   jPrompt     = function(options) { defaults.alertType = 'prompt'; defaults.inputType = 'text'; $.JaxerAlerts(options); }
   jPromptPass = function(options) { defaults.alertType = 'prompt'; defaults.inputType = 'password'; $.JaxerAlerts(options); }
})(jQuery);