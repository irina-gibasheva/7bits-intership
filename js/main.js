var key = "va4804";

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

  var movesForward = 0;
  var movesBackward = 0;
  var duplicationFound = false;

  // Turn light on in the initial wagon.
  turnLightOn();

  // Check if there is one wagon in the train
  goPreviousWagon();
  turnLightOff();
  goNextWagon();
  if (!checkWagonState()) {
    // Return 1, because there is one wagon in the train.
    return 1;
  }

  do{
    movesForward++;
    // Move forward with the current step for this iteration.
    for (var i = 0; i < movesForward; i++) {
      goNextWagon();

      // If it is a wagon before the last wagon on current iteration, check if it was changed when went backward (duplication reached).
      if (i == (movesForward - 2) && !checkWagonState()) {
        duplicationFound = true;
        break;
      }

      // If this is the last wagon on current iteration turn light on.
      if (i == (movesForward - 1)) {
        turnLightOn();
      }
    }

    // If duplication was reached when going forward there is no need to make more steps.
    if (!duplicationFound) {
      // Move backward to the initial wagon
      for (var i = 0; i < movesForward; i++) {
        goPreviousWagon();
      }

      movesBackward++;
      // Move backward with the current step for this iteration.
      for (var j = 0; j < movesBackward; j++) {
        goPreviousWagon();

        // If it is a wagon before the last wagon on current iteration, check if it was changed when went forward (duplication reached).
        if (j == (movesBackward - 2) && checkWagonState()) {
          duplicationFound = true;
          break;
        }

        // If this is the last wagon on current iteration turn light off.
        if (j == (movesBackward - 1)) {
          turnLightOff();
        }
      }

      // If duplication was reached when going backward there is no need to return to the initial wagon.
      if (!duplicationFound) {
        // Move back to the initial wagon
        for (var j = 0; j < movesBackward; j++) {
          goNextWagon();
        }
      }
    }

  } while (!duplicationFound);

  // Deduct 1, because when duplication is detected the step was performed twice (when moved backward and forward).
  return movesBackward + movesForward - 1;
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
  var state;
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
        state = data.state;
      }
    },
    error: server_error_handler
  })
  return state;
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
