 // Initialize Firebase
var config = {
	    apiKey: "AIzaSyBsqikhe6q4quX9fVTtJvqqBCThdeRkLBc",
	    authDomain: "traindata-dcfa7.firebaseapp.com",
	    databaseURL: "https://traindata-dcfa7.firebaseio.com",
	    storageBucket: "traindata-dcfa7.appspot.com",
	    messagingSenderId: "788066423964"
};
firebase.initializeApp(config);

var database = firebase.database();

 $(document).ready(function(){


 	

 	

	$('#addTrain').click(function(){
		console.log("inside addd train");
		var trainName = $('#trainName').val().trim();
		var destination = $('#destination').val().trim();
		var firstTrainName = $('#firstTrainTime').val().trim();
		var frequency = parseInt($('#frequency').val().trim());

		var convertedTime = new Date(firstTrainTime);

		var newTrain ={
			trainName: trainName,
			destination: destination,
			firstTrainTime: firstTrainName,
			frequency: frequency

		}

		console.log(trainName);
		database.ref().push(newTrain);


	});  

});

