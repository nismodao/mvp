
angular.module('Cloud', [])
.controller("TracksController", function ($scope, helper) {
  angular.extend($scope, helper);
})
.factory('helper', function () {
  var service = {};
  service.trackArray = [];

    service.start = function (song) {
      console.log(song);
      song = song.slice(26);
      SC.stream(song)
      .then(function(player){
        player.play();
      })
    };

    service.submit = function (text) { 
      return SC.get('/tracks', {
        q: text, license: 'cc-by-sa'
      })
      .then(function(tracks) {
        tracks.forEach(function(value, index) {
          return service.trackArray.push(value['uri']);
        });
      })
      .catch(function (err) {
        console.log("err is", err);
      })
    };

  return service;
    
});     




  

// [value['artwork_url'],value['description'],


