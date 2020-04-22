/*!
 * @version : 1.0
 * @date    : Jul 9, 2014, 1:52:46 PM
 * @author  : SKR
 */

//-----------------------------------------------
(function($) {
   defaults = {
      title: 'JaxerNotification',
      message: 'the online {code} solutions..<br> <b>SKR<b>',

      showTime: 333,
      hideTime: 333,

      displayTime: 10 * 1000,
      autoHide: true,
      autoHideTime: 2000,

      //--
      bottom: '8%',
      left: '5%'
   };

   $.JaxerNotifications = function(options) {
      options = $.extend({}, defaults, options);
      _show();

      function _show() {
         $("#jNotificationsContainer").remove();

         //<editor-fold defaultstate="collapsed" desc="stub">
         $("body").append(
                 "<div id='jNotificationsContainer' style='display: none'>"
                 + "<div id='jNotificationsClose' title='close'> &nbsp; </div>"
                 + "<div id='jNotificationsData'>"
                 + "<div id='jNotificationsTitle'> </div>"
                 + "<div id='jNotificationsMessage'> </div>"
                 + "</div>"
                 + "</div>");
         //</editor-fold>

         var jContainer = $('#jNotificationsContainer');

         $("#jNotificationsTitle").html(options.title.replace(/\n/g, '<br>'));
         $("#jNotificationsMessage").html(options.message.replace(/\n/g, '<br>'));

         $("#jNotificationsContainer").css({
            minWidth: jContainer.outerWidth(),
            maxWidth: jContainer.outerWidth(),

            bottom: options.bottom,
            left: options.left
         });

         jContainer.show(options.showTime);

         $("#jNotificationsClose").click(function(){ jContainer.hide(options.hideTime, function(){ $(this).remove(); }); });

         if(options.autoHide) {
            setTimeout(function() {
               jContainer.fadeOut(options.autoHideTime, function(){ $(this).remove(); });
            }, options.displayTime)
         }
      };};

   // Shortuct functions
   jNF   = function(options) { $.JaxerNotifications(options); }
   $.jNF = function(options) { $.JaxerNotifications(options); }
})(jQuery);