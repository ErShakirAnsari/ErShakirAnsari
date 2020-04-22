/*!
 * @version : 1.1.0
 * @date    : Jul 14, 2014, 5:51:17 PM
 * @author  : SKR
 */

//-----------------------------------------------
(function($) {
   defaults = {
      title:   'JaxerNotification v1.1.0',
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
      var stack = 'jNotificationsStack';
      function _stackManager() {
         if(!document.getElementById(stack)) {
            $("body").append("<div id='" + stack + "'> &nbsp; </div>");
            $('#' + stack).css({ bottom: options.bottom, left: options.left });
         }
      }

      _show();
      function _show() {
         _stackManager();

         var date = new Date();
         var ids = date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds().toString();
         //var ids = (new Date()).getTime();
         //alert(ids);

         var idm = 'jNotificationContainer' + ids,
             closeID = 'jNotificationsClose' + ids,
             titleID = 'jNotificationsTitle' + ids,
             MessageID = 'jNotificationsMessage' + ids;

         $('#' + stack).append(
                 "<div class='jNotificationsContainer' id=" + idm + " style='display: none'>"
               + "<div class='jNotificationsClose' id=" + closeID + " title='close'> &nbsp; </div>"
               + "<div class='jNotificationsData'>"
               + "<div class='jNotificationsTitle' id=" + titleID + "> </div>"
               + "<div class='jNotificationsMessage' id=" + MessageID + "> </div>"
               + "</div>"
               + "</div>");

         $('#' + titleID).html(options.title.replace(/\n/g, '<br>'));
         $('#' + MessageID).html(options.message.replace(/\n/g, '<br>'));

         var jContainer = $('#' + idm);
         jContainer.css({ minWidth: jContainer.outerWidth(), maxWidth: jContainer.outerWidth() }).show(options.showTime);
         $('#' + stack).css({ minWidth: jContainer.outerWidth(), maxWidth: jContainer.outerWidth() });

         $("#" + closeID).click(function(){ jContainer.hide(options.hideTime, function(){ $(this).remove(); }); });

         if(options.autoHide) {
            setTimeout(function() {
               jContainer.fadeOut(options.autoHideTime, function(){ $(this).remove(); });
            }, options.displayTime)
         }
      };
   };

   // Shortuct functions
   jNF   = function(options) { $.JaxerNotifications(options); }
   $.jNF = function(options) { $.JaxerNotifications(options); }
})(jQuery);