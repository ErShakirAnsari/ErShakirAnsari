/*!
 * @version : 1.0
 * @date    : Jul 15, 2014, 6:18:20 PM
 * @author  : SKR
 */

//-----------------------------------------------

(function ($) {
   defaults = { };
   $.JaxerAjaxLoader = function(opts) {

      destroy = function() {
         alert('removed');
      };

      opts = $.extend({}, defaults, opts);

      var jID = "JaxerAjaxLoader10";   // 10 is version sign

      function _createElement() {
         if(!document.getElementById(jID)) {
            $('body').append("<div id='" + jID + "' style='display:none;'> </div>");
         }
      };
      function _reposition() {
         //var top = (($(window).height() / 2) - ($("#" + jID).outerHeight() / 2)) - 50;
         var left = (($(window).width() / 2) - ($("#" + jID).outerWidth() / 2));

         //if(top < 0)  { top = 0; }
         if(left < 0) { left = 0; }

         // IE6 fix
         //top = top + $(window).scrollTop();
         //$("#" + jID).css({ top: top + 'px', left: left + 'px' });
         $("#" + jID).css({ top: 0, left: left + 'px' });
      };
      _show();
      function _show() {
         _createElement();
         _reposition();
         $("#" + jID).slideDown(300);
      };

      $(window).resize(function() { _reposition(); });
   }

   // ShortHand
   jLoad   = function() { $.JaxerAjaxLoader(); }
   jUnLoad = function() { $.JaxerAjaxLoader({destroy: function() {}}); }
})(jQuery);