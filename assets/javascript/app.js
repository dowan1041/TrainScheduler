var config = {
  apiKey: "AIzaSyCacIaDoHb5yXgrfA2tLBWwUy8cCGjAbeo",
  authDomain: "trainscheduler-145ad.firebaseapp.com",
  databaseURL: "https://trainscheduler-145ad.firebaseio.com",
  projectId: "trainscheduler-145ad",
  storageBucket: "trainscheduler-145ad.appspot.com",
  messagingSenderId: "249419677839"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("New-train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % trainFrequency ;
  var minutes = trainFrequency - timeRemainder;

  var nextTrain = moment().add(minutes, "m").format("HH:mm");


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(timeRemainder)
  );

  $("#trainSchedule-table > tbody").append(newRow);
});