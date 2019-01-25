// Initialize Firebase
var config = {
  apiKey: "AIzaSyBAOJ9b7g4q-j9iXfauDmEA8GucGkqjvcc",
  authDomain: "fir-trainapp.firebaseapp.com",
  databaseURL: "https://fir-trainapp.firebaseio.com",
  storageBucket: "fir-trainapp.appspot.com",
};

firebase.initializeApp(config);
var database = firebase.database();
$('#addTrainBtn').on("click", function()) {
  // User input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
    // Uploads data to database
  database.ref().push(newTrain);
  console.log(newTrain.name);

  // Clears text
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;
  
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("Current Time: " + currentTime);
  
  var timeDiff = moment().diff(moment(firstTimeConverted), "Minutes");
  console.log(firstTrain);
  
  
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);
  
  var minToTrain = frequency - timeRemainder;
  
  var nxTrain = moment().add(minToTrain, "Minutes").format("HH:mm");
  
});
