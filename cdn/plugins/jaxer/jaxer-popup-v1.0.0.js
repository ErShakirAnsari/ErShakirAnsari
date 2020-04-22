/*!
 * @version : 1.0.0
 * @date    : Jul 12, 2014, 2:59:47 PM
 * @author  : SKR
 **/

$.JaxerPopUp = function(options) {
   defaults = {
      message: 'JaxerPopUp &bull; Jaxer.com - the online {code} solutions.. <b>SKR<b>',

      autoHide: false,
      displayTime: 5 * 1000
   };

   options = $.extend({}, defaults, options);

   _show();

   function _destroy(elem) {
      elem.slideUp('slow', function(){ $(this).remove(); });
   }

   function _show() {

      $("#JaxerPopUp").remove();

      options.message = options.message.replace(/\n/g, '.. ').replace("<br>", '.. ').replace("<br/>", '.. ').replace("<br />", '.. ');

      var close = "&nbsp;<div id='JaxerPopUpClose' title='close'> &nbsp; </div>";
      $("body").after("<div id='JaxerPopUp' style='display: none'> " + options.message + close + " </div>");

      var jPopUp = $('#JaxerPopUp');
      jPopUp.slideDown('slow');

      $('#JaxerPopUpClose').click(function() { _destroy(jPopUp) });

      if(options.autoHide) { setTimeout(function() {_destroy(jPopUp) }, options.displayTime) }
   };
};