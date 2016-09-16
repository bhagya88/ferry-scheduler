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

	
 	database.ref('ferries').on('child_added',function(snapshot){


 		var ferryName = snapshot.val().ferryName;
		var destination = snapshot.val().destination;
		var firstFerryTime = snapshot.val().firstFerryTime;
		var frequency = snapshot.val().frequency;


		

		//console.log("key******",key);

		var currentTime = moment();
		console.log("CT:"+currentTime);
		console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
		console.log("first ferry time:"+firstFerryTime);
		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstFerryTime,"HH:mm").subtract(1, "years");
		console.log("firstTimeConvertd: "+ firstTimeConverted);

		console.log(moment(firstFerryTime,"HH:mm"));
		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % frequency;
		console.log(tRemainder);

		// Minute Until ferry----------------
		var tMinutesTillTrain = frequency - tRemainder;
		console.log("MINUTES TILL ferry: " + tMinutesTillTrain);

		// Next ferry---------------------------------
		var nextFerryArrivalTime = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextFerryArrivalTime).format("HH:mm"));

		console.log("inside on",ferryName);


	
		var row = $('<tr>');
		var td1 = $('<td>');
		var td2 = $('<td>');
		var td3 = $('<td>');
		var td4 = $('<td>');
		var td5 = $('<td>');


		td1.html(ferryName);
		td2.html(destination);
		td3.html(frequency);
		td4.html(nextFerryArrivalTime.format("HH:mm"));
		td5.html(tMinutesTillTrain);
		
	
		row.append(td1);
		row.append(td2);
		row.append(td3);
		row.append(td4);
		row.append(td5);

		$('#trainInfo').append(row);
 	});


	$('#addTrain').click(function(event){
		event.preventDefault();
		
		var ferryName = $('#ferryName').val().trim();
		var destination = $('#destination').val().trim();
		var firstFerryTime = $('#firstFerryTime').val().trim();
		var frequency = parseInt($('#frequency').val().trim());

		

		var newTrain ={
			ferryName: ferryName,
			destination: destination,
			firstFerryTime: firstFerryTime,
			frequency: frequency

		}

		console.log(ferryName);
		database.ref('ferries').push(newTrain);

		return false;
	});  


	// $('#trainInfo').on('click','tr',function(event){
	// 	event.preventDefault();
	// 	console.log("ferry ID",$(this).attr("id"));
	// 	var ferryName = $(this).data("id");
	// 	var recordReference = database.ref('ferries').child(ferryName);
	// });  

});

