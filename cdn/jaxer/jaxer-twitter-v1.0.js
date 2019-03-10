/*!
 * @version : 1.0
 * @date    : Oct 8 2014, 5:08:03 PM
 * @author  : SKR
 */

//-----------------------------------------------

function twitter(a) {
   var defaults = {
      url:      'https://www.twitter.com/@SKR',
      title:    '@twitter',

      //-- Dont change them...
      target:   '_blank',
      position: 'fixed',
      right:    '1%',
      top:      '0px'

   };

   var opts = $.extend({}, defaults, a);

   var id = 'idTwitterSKR';

   $('body').prepend('<a href="' + opts.url + '" target="' + opts.target + '" title="' + opts.title + '" id="' + id + '"> &nbsp; </a>');

   $('#' + id).css({
      'background-color':  'transparent',
      'background-image':  'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAABeCAYAAABcmyb2AAAFFElEQVR42u3XbUxTVxgH8INDNDrmUCfQIhQoBeRdmfMFMzYmLwqsI+AU3xgoE0WBoYBgRQTECQKRSRdAF0KYLzGCvBS2sYFT5hY/bcmyLH5YsuzDvuzDlmVZtizPnufOkgIFzi1t6V3uSf5N0957zu+c+5x7W6btfAJSDJPhMlyGOyg89YPvQYphOzu+BSmGJei/BimGxV15DFIMe/nyI5BiWEz9Q5Bi2JaL90GKYZsujIIUwzZWj4AUw6KrPgYphq2vHAYphkXqDCDFsIgzgyDFsPCKAZBiWFj5AEgxMtzu8FB8kWJkuN3hIfgixcjw/yXc90A9KHYcB/e4HCEe8UfAZ3cVrCvtmTgmqPg2+GU388PX4QtvlCnvgKawm/v4YITROV7pFeCbdRn8DrUI8UWg95tV4JF0FFQ4KTrGIyEPturucPfNDSew6sAlHKSIG6/KrBbOMYKnhiZAk6JjtlXchPUlN7j75oZHFHdPDEZ4/8Otsx5Pl55WdSb0tEnsrQXVLh1E6/qtC6fVMF0ppfYUeL1RKgDNHR+Ye5UbTQk/0Q579Q8gXDfIBw+mWuTIS+cGpw3ms69OqE1v3Gj+ee2Tjo8qaOdGh+S3QSaiwxDN6+GGU6dUh+YGppJQ0AbDu8Xa9DPChgvKaeCGRxV0iEKLggdiSbxW0weRhddn3Ww+mTXChqOrwV0mx/Si0KLgIUVdoNhZAOrsRlG1y5OY8g9tB39Rd29iVa0N31zWbTt4VOXQjDU+7xU/P2A7OCW16bNZa9ySUH+0KDaF086n25Y1Vz6hplc0WoAH0VNORNRH9KKeiHPdv2Pf/RTEGoIsgdNAEVYql+RLgxahLYJT0ppHQIMrPx/0ptJuiKn7xL7w6KpheKtjXKh1SyZAVyztypjFaIvhlFDcqNqWzyGhtlcUntB7cIPT+XaHB+BvZnoQeeK/Gq+0Mu6HUvTJTqugueEEVeJPWM+nf788k/L/A5v8q5ktdEW2V/fAnvfHrYLmhlNN06CJF/pE3VHodkdg2g9JjaNWAZvAaQX4QrfC/e2PIKvtIaTWG+CVyjvC5TcNbdgddX2wr3UMsq59ieAxXGUDiBmHJ8ySkyIrh4VJJDffxyvxxaRoWx7A9oZRvEofWR07b7gjRIYvAJw2jvQiw+0OD8QXKUaGLwB8CKQYGS7DZbgMl+EyXIbLcBkuw2W4DHcMeMDJu7+sjj14lULvHR9+2vD32sy6ocUr1mQzxnwozsvdsugz+s4h4f7Hu564Bm87i9iNmMX4GfWNb5kzfUbf+R3r/M5h4JqSe7+5J+ZfR1wqxs0Inhr6DpO8Jj6vI+BUz68LCvc+2DTmslL5NoICZgKbmYAaz8n13t8wElhu+MeucHXhzR9XRMTXIiIG48KLNsG7YLY8FxZ33v9E9w82h2tK+//wfL3khpOzSwYOvFos2MwEVmG0HinFXZrSvt9tAlcdav1qqSKwAAcKwTjNF22Cpxa85AWfo6qc98atBlcX3f555eaMRuz8Vcwya4GnwKktwcQ+vyHlorrw1k8WwzVlA38p08/efWbps5nYocLaYDNwY3PHUtyl0Jbd0pT1/ykK7pt37ZvlfhtKsJNIzCJboWeAU3PChGJpFqoO6x/PCTc+qvGkRIyrLcFzwI1tGSZu1dbdTVSyk+GnDdMe1fYAc8KNzYtKVplxrpdKWID75raNm3tUOxic2iJMFJUwlTJ7erdwszfYArixuVIp/wu/zSiZft+uMAAAAABJRU5ErkJggg==)',
      'background-repeat': 'no-repeat',
      'color':             '#FFF',
      'height':            '94px',
      'position':          opts.position,
      'right':             opts.right,
      'top':               opts.top,
      'width':             '46px',
      'z-index':           99999
   });
}