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

 	var trainName;
 	var destination;
 	var firstTrainTime;
 	var frequency;

 	function addTrain(){
 		trainName = $('#').val().trim();
 		$('#').val().trim();
 		$('#').val().trim();
 		$('#').val().trim();

 	}

	$('#addTrain').click(addTrain());	  

});

