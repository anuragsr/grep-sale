var app = angular.module('grepSale', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
      .state('home', {
          url: "/home",
          templateUrl: "components/home.html"
      });
}]);
app.controller('grepCtrl', function($scope, $http) {  
  $scope.user = {contact:"", city: ""};  
  $scope.reset = function(){
    $scope.emptyError = false;
    $scope.contError = false;
    $scope.showResponse = false;
  };
  $scope.scrollDown = function(i){
    TweenMax.to(".home-page", 1, {scrollTo:i*window.innerHeight});
  };  
  $scope.getStarted = function(){
    $scope.reset();
    if($scope.user.contact == "" || $scope.user.city == ""){
      $scope.emptyError = true;
    }else if(!$scope.validateContact($scope.user.contact)){
      $scope.contError = true;
    }else{
      $scope.reset();
      $http({
          url: "http://104.199.157.144:8888/saveUser",
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          data: $scope.user
        }).success(function(data, status, headers, config) {
            if(data.message){
                $scope.response = data.message;
                $scope.showResponse = true;
            }
        }).error(function(data, status, headers, config) {
            this.status = status;
      });   
    }
  };
  $scope.validateContact = function(contact) {
    var emVal = false, phVal = false;
    var emRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emVal = emRegx.test(contact);
    var phRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    phVal = phRegx.test(contact);
    return (emVal || phVal);
  };
});
app.service('mapService', function () {
    var getAutoComplete = function(element, options){
        autocomplete = new google.maps.places.Autocomplete(element, options);            
        return autocomplete;
    }
    return {
        getAutoComplete:getAutoComplete
    }
});
app.directive('phoneContain', function($timeout) {    
    var animate = function(){    
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if(isAndroid) {
          TweenMax.set(".home-panel", {css:{height:$(".home-panel").height()}});
        }
        $(".ov-text").blast({ delimiter: "letter" }); 
        $(".fr-text").blast({ delimiter: "letter" }); 
        $(".tv-text").blast({ delimiter: "letter" }); 
        $(".lp-text").blast({ delimiter: "letter" }); 
        TweenMax.set(".blast", {css:{opacity:0, display:"none"}});
        function tlComplete(tl){
          $timeout(function(){
            tl.restart();
          }, 1000);
        };
        var tl = new TimelineMax({
          onComplete:tlComplete, 
          onCompleteParams:["{self}"]
        });
        tl.to($(".ov-text").find(".blast"), 0.1, {display:"inline-block"})
          .add("ovAnim", 1)
          .staggerTo(".pointer-img", 0.25, {opacity:0.8, top:"+=20px", ease:Back.easeInOut}, 0.1, "ovAnim")
          .staggerTo($(".ov-text").find(".blast"), 0.1, {opacity:1}, 0.1, "ovAnim")
          .add("ovExit", 4)
          .staggerTo($(".ov-text").find(".blast").toArray().reverse(), 0.1, {opacity:0}, 0.1, "ovExit")
          .staggerTo($(".pointer-img").toArray().reverse(), 0.25, {opacity:0, top:"-=20px", ease:Back.easeInOut}, 0.1, "ovExit")
          .to(".phone-container", 1, {rotationY:360, ease:Back.easeInOut})
          .to($(".ov-text").find(".blast"), 0.1, {display:"none"})
          .to($(".fr-text").find(".blast"), 0.1, {display:"inline-block"})
          .to(".pointer-img", 0.1, {"background-image":"url(img/fr-ic.png)", "background-size":"cover"})
          .add("frAnim", 7)
          .staggerTo(".pointer-img", 0.25, {opacity:0.8, top:"+=20px", ease:Back.easeInOut}, 0.15, "frAnim")
          .staggerTo($(".fr-text").find(".blast"), 0.1, {opacity:1}, 0.1, "frAnim")
          .add("frExit", 10)
          .staggerTo($(".fr-text").find(".blast").toArray().reverse(), 0.1, {opacity:0}, 0.1, "frExit")
          .staggerTo($(".pointer-img").toArray().reverse(), 0.25, {opacity:0, top:"-=20px", ease:Back.easeInOut}, 0.15, "frExit")
          .to(".phone-container", 1, {rotationY:0, ease:Back.easeInOut})
          .to($(".fr-text").find(".blast"), 0.1, {display:"none"})
          .to($(".tv-text").find(".blast"), 0.1, {display:"inline-block"})
          .to(".pointer-img", 0.1, {"background-image":"url(img/tv-ic.png)", "background-size":"cover"})
          .add("tvAnim", 13)
          .staggerTo(".pointer-img", 0.25, {opacity:0.8, top:"+=20px", ease:Back.easeInOut}, 0.15, "tvAnim")
          .staggerTo($(".tv-text").find(".blast"), 0.1, {opacity:1}, 0.1, "tvAnim")
          .add("tvExit", 16)
          .staggerTo($(".tv-text").find(".blast").toArray().reverse(), 0.1, {opacity:0}, 0.1, "tvExit")
          .staggerTo($(".pointer-img").toArray().reverse(), 0.25, {opacity:0, top:"-=20px", ease:Back.easeInOut}, 0.15, "tvExit")
          .to(".phone-container", 1, {rotationY:360, ease:Back.easeInOut})
          .to($(".tv-text").find(".blast"), 0.1, {display:"none"})
          .to($(".lp-text").find(".blast"), 0.1, {display:"inline-block"})
          .to(".pointer-img", 0.1, {"background-image":"url(img/lp-ic.png)", "background-size":"cover"})
          .add("lpAnim", 19)
          .staggerTo(".pointer-img", 0.25, {opacity:0.8, top:"+=20px", ease:Back.easeInOut}, 0.15, "lpAnim")
          .staggerTo($(".lp-text").find(".blast"), 0.1, {opacity:1}, 0.1, "lpAnim")
          .add("lpExit", 22)
          .staggerTo($(".lp-text").find(".blast").toArray().reverse(), 0.1, {opacity:0}, 0.1, "lpExit")
          .staggerTo($(".pointer-img").toArray().reverse(), 0.25, {opacity:0, top:"-=20px", ease:Back.easeInOut}, 0.15, "lpExit")
          .to([".data-one",".pointer-img"], 1, {delay:1, opacity:0})
          .to(".phone-container", 1, {rotationY:20, rotationZ:20, ease:Back.easeInOut})
          .to(".data-one", 0.1, {display:"none"})
          .to(".data-two", 0.1, {display:"inline-block"})
          .fromTo($(".data-two").find(".text-add"), 1, {left:"-50px"},{left:"0px",opacity:1})
          .add("showHot", 27)
          .to($(".data-two").find(".hotlist-contain"), 1, {rotationX:360, opacity:1, ease:Back.easeOut}, "showHot")
          .to(".hot-ptr-img", 1, {opacity:1}, "showHot")
          .to($(".pointer-img")[2], 1, {rotationZ:-20, rotationY:-20, top:"-=20px", opacity:1, ease:Back.easeOut}, "showHot")
          .fromTo($(".data-two").find(".text-price"), 1, {right:"-50px"},{delay:0.5, right:"0px",opacity:1,ease:Back.easeOut})
          .add("animExit", 31)
          .to(".phone-container", 1, {rotationY:0, rotationZ:0, ease:Back.easeInOut}, "animExit")
          .to([".data-two", $(".pointer-img")[2] ], 1, {opacity:0}, "animExit")
        ;
    }     
    return {
        restrict : 'E',
        templateUrl: 'components/animate.html',
        link: function($scope, element, attrs) {
            animate(); 
        }
    };
}); 
app.directive('googleplace', function(mapService) {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '='
        },
        link: function(scope, element, attrs, model) {     
            var options = {
                types: [],
                componentRestrictions: {}
            };              
            var tempPlace;          
            scope.gPlace = mapService.getAutoComplete(element[0], options); 
            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    scope.details = scope.gPlace.getPlace();
                    tempPlace = element.val().split(",")[0];
                    model.$setViewValue(tempPlace);
                });
            });
        }
    };
});