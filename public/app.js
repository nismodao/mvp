var audioContext = new AudioContext();

angular.module('Cloud', [])
.controller("TracksController", function ($scope, helper) {
  angular.extend($scope, helper);
})
.factory('helper', function () {
  var service = {};
  service.trackObj = {};
    service.submit = function (text) {
      text = text || ""; 
      return SC.get('/tracks', {
        q: text, license: 'cc-by-sa'
      })
      .then(function(tracks) {
        tracks.forEach(function(value, index) {
          service.trackObj[value['title']] = value['stream_url'];
          return service.trackObj;
        });
      })
      .catch(function (err) {
        console.log("err is", err);
      })
    };

    service.processAudio = function (song) {
      var analyser, source, freqByteData;
      var audio = new Audio();
      audio.crossOrigin = "Anonymous";
      song = song + '?client_id=' + window.client;      
      analyser = audioContext.createAnalyser();
      analyser.minDecibels = -85;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.77;
      analyser.fftSize = 2048;
      audio.src = song;
      source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      source.mediaElement.play();
      freqByteData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(freqByteData);
      window.audioData = freqByteData;
    };
  return service;   
});     




