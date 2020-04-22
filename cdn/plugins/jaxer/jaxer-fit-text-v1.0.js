/*!
 * @version  : 1.0
 * @date     : Jul 14, 2014, 4:48:37 PM
 * @licensed : Private
 * @author   : SKR
 */

//-----------------------------------------------

(function($) {
   $.fn.fitText = function(kompressor, options) {
      // Setup options
      var compressor = kompressor || 1;
      var settings = $.extend({
         'minFontSize' : Number.NEGATIVE_INFINITY,
         'maxFontSize' : Number.POSITIVE_INFINITY
      }, options);
      return this.each(function() {
         // Store the object
         var $this = $(this);

         // Resizer() resizes items based on the object width divided by the compressor * 10
         var resizer = function () {
            $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
         };

         // Call once to set.
         resizer();

         // Call on resize. Opera debounces their resize by default.
         $(window).on('resize.fittext orientationchange.fittext', resizer);
      });
   };
})(jQuery);