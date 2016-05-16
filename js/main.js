var key = "insert your key here";

var server_error_handler = function() {
  console.error('Something went wrong. Please message about the bug in the 7bits company.');
}  

var apiURL = function(path) {
  return 'http://frontend-internship.7bits.it/' + path;
}

// Creates new train.
// If length is undefined then the train has random length.
var createTrain = function(length) {
  var path = key + '/train';
  if (length) {
    path += ('/length/' + length);
  }
  $.ajax({
    type: 'POST',
    url: apiURL(path),
    dataType: 'json',
    async: false,
    xhrFields: {
      withCredentials: true
    },
    success: function(data){
      if (data.success == false) {
        alert(data.message);
      }
    },
    error: server_error_handler
  })
}

// Check prediction about length of current train.
// Returns true if you are right, false - otherwise.
var checkPrediction = function(prediction) {
  var path = key + '/train/check/' + prediction;
  var answer;
  $.ajax({
    type: 'GET',
    url: apiURL(path),
    dataType: 'json',
    async: false,
    xhrFields: {
      withCredentials: true
    },
    success: function(data) {
      if (data.success) {
        answer = data.answer;
      } else {
        alert(data.message);
      }
    },
    error: server_error_handler
  })
  return answer;
}

var algorithm = function() {
  // Implement me
  return 42;
}

$(function() {
  $('#create').on('click', function() {
    createTrain();
  });

  $('#create-with-length').on('click', function() {
    var length = $('#length').val();
    if (length) {
      createTrain(length);
    } else {
      alert('Wrong length');
    }
  });

  $('#go').on('click', function() {
    $('#go-spinner').removeClass('hidden');
    setTimeout(function(){
      var prediction = algorithm();
      var answer = checkPrediction(prediction);
      if (answer == true) {
        alert('Your prediction ' + prediction + ' is right =)');
      } else if (answer == false) {
        alert('Your prediction ' + prediction + ' is wrong =(');
      }
      $('#go-spinner').addClass('hidden');
    }, 500);
  })
});

// Check current wagon state.
// Returns true if light is turned on, false - otherwise.
var checkWagonState = function() {
  var path = key + '/train/state';
  var answer;
  $.ajax({
    type: 'GET',
    url: apiURL(path),
    dataType: 'json',
    async: false,
    xhrFields: {
      withCredentials: true
    },
    success: function(data) {
      if (data.success) {
        answer = data.answer;
      }
    },
    error: server_error_handler
  })
  return answer;
}

// Turns light in current wagon on.
var turnLightOn = function() {
  var path = key + '/train/turn-on';
  $.ajax({
    type: 'POST',
    url: apiURL(path),
    dataType: 'json',
    async: false,
    xhrFields: {
      withCredentials: true
    },
    success: function(data){
      if (data.success == false) {
        alert(data.message);
      }
    },
    error: server_error_handler
  })
}

// Turns light in current wagon off.
var turnLightOff = function() {
  var path = key + '/train/turn-off';
  $.ajax({
    type: 'POST',
    url: apiURL(path),
    dataType: 'json',
    async: false,
    xhrFields: {
      withCredentials: true
    },
    success: function(data){
      if (data.success == false) {
        alert(data.message);
      }
    },
    error: server_error_handler
  })
}

// Go to the next wagon.
var goNextWagon = function() {
  var path = key + '/train/next';
  $.ajax({
    type: 'POST',
    url: apiURL(path),
    dataType: 'json',
    async: false,
    xhrFields: {
      withCredentials: true
    },
    success: function(data){
      if (data.success == false) {
        alert(data.message);
      }
    },
    error: server_error_handler
  })
}

// Go to the previous wagon.
var goPreviousWagon = function() {
  var path = key + '/train/previous';
  $.ajax({
    type: 'POST',
    url: apiURL(path),
    dataType: 'json',
    async: false,
    xhrFields: {
      withCredentials: true
    },
    success: function(data){
      if (data.success == false) {
        alert(data.message);
      }
    },
    error: server_error_handler
  })
}
