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
