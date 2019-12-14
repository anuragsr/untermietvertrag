var l = console.log.bind(window.console)
var getFloatBoxRightPos = function(){
  if(window.innerWidth <= 1366){
    return 25
  }else{
    return 125 
  }
}

$(function(){
  $(window).resize(function(){
    $(".ctn-float-box").css({
      right: getFloatBoxRightPos() + "px"
    })
  })
  
  $(window).scroll(function(){
    // l($(this).scrollTop())
    if($(this).scrollTop() > $(".ctn-page").height() - (130 + 80 + 80) - 60){
      $(".ctn-float-box").css({
        position: "absolute",
        top: "unset",
        bottom: "80px",
        // right: "115px"
        right: getFloatBoxRightPos() - 15 + "px"
      })
    }else{
      $(".ctn-float-box").css({
        position: "fixed",
        top: (130 + 80 + 80) + "px",
        bottom: "unset",
        // right: "125px"
        right: getFloatBoxRightPos() + "px"
      })
    }
  })
})

var app = angular.module('app', ['ui.router', 'ngSanitize'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })
  .state('load', {
    url: '/l/:lId',
    templateUrl: 'templates/load.html',
    controller: 'LoadCtrl'
  })
  // Add more states here
})