var enemyspeak = angular.module('enemyspeak', [
  'ngRoute',
  'ngAnimate',
  'enemyServices',
  'enemyControllers'
]);

enemyspeak.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $locationProvider.html5Mode({
      enabled: true
    });
    $routeProvider.
      when('/', {
        templateUrl: '/partials/list.html',
        controller: 'ListPageCtrl'
      }).
/*
      when('/characters',{
        templateUrl: '/partials/imagelist.html',
        controller: 'ImageListPageCtrl'
      }).
      when('/environments',{
        templateUrl: '/partials/imagelist.html',
        controller: 'ImageListPageCtrl'
      }).
      when('/studies',{
        templateUrl: '/partials/imagelist.html',
        controller: 'ImageListPageCtrl'
      }).
*/
      when('/art',{
        templateUrl: '/partials/imagelist.html',
        controller: 'ImageListPageCtrl'
      }).
      when('/games',{
        templateUrl: '/partials/list.html',
        controller: 'ListPageCtrl'
      }).
      when('/games/:gameID', {
        templateUrl: '/partials/detail.html',
        controller: 'DetailPageCtrl'
      }).
      // when('/design',{
      //   templateUrl: '/partials/list.html',
      //   controller: 'ListPageCtrl'
      // }).
      when('/:designID', {
        templateUrl: '/partials/imagegrid.html',
        controller: 'DetailPageCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);


enemyspeak.run(function ($rootScope, $timeout,$interval, $http, $window) {
  $http.get('json/header.json').success(function(data) {
    $rootScope.header = data;
  });
  $http.get('json/footer.json').success(function(data) {
    $rootScope.footer = data;
  });

  // detect mobile..
   var isDesktop = true;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) isDesktop = false;})(navigator.userAgent||navigator.vendor||window.opera);

  $rootScope.imageChangeHandler = function(image,color,textColor) {
    if (image == $rootScope.imageIndex) {
    } else {
      $( "#static-background" ).css("background-image","url("+$rootScope.imageIndex+")");
      $http.get(image).success(function(data) {
        $( '#background' ).removeAttr('style');
        $( "#background" ).css("opacity","0");
        $( "#background" ).css("background-image","url("+image+")");
        $( "#background" ).animate({opacity: 1},{
          duration: 200,
        });
      });       
      $rootScope.imageIndex = image;
      $( '.logoColor' ).removeAttr('style');
      $( '.logoColor' ).css({
        "fill": color
      });
      $('.breadcrumb').css({
        color: textColor
      });
      $('.header h1').css({
        color: textColor
      });
    }
  }; 
  
  // console.log(isDesktop);

  if(isDesktop){
    $('body').niceScroll({
      bouncescroll: false,
        cursorcolor: "#000",
        cursorwidth: "3px",
        cursorborder: "1px solid #000",
        cursorborderradius: "5px",
        railpadding: { top: 5, right: 4, left: 0, bottom: 5 },
    });

    $rootScope.bodyNiceScroll = $('body').getNiceScroll();
    $interval(function(){
      $rootScope.bodyNiceScroll.resize();
    },1000);
  }

  $rootScope.$on('$routeChangeSuccess', function(scope, next, current){
    $timeout(function () {
      $window.scrollTo(0,0);
      if (isDesktop){
        $('body').getNiceScroll().resize();
      }

      // $timeout(function () {
      //   $('body').getNiceScroll().resize();
      // },5000);
    }, 500);
  });
});


enemyspeak.directive('contentItem', function ($compile) {
  var imageTemplate = '<img ng-src="{{content}}">';
  var videoTemplate = '<video src="{{content}}" playsinline autoplay loop muted></video>';
   
  var getTemplate = function(contentType) {
      var template = imageTemplate;
      // console.log(contentType.match('.mp4'),contentType);
      if (contentType && contentType.match('.mp4')) {
        template = videoTemplate; 
      }
      // switch(contentType) {
      //     case 'image':
      //         template = imageTemplate;
      //         break;
      //     case 'video':
      //         template = videoTemplate;
      //         break;
      // }
      return template;
  }
  var linker = function(scope, element, attrs) {
    // console.log(scope,element,attrs);
    element.html(getTemplate(scope.content)).show();
    $compile(element.contents())(scope);
  }
  return {
    restrict: "E",
    link: linker,
    scope: {
        content:'='
    }
  };
});