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


     
 	
 	database.ref('trains').on('value',function(snapshot){

 	snapshot.forEach(function(item) {
 		var trainName = item.val().trainName;
		var destination = item.val().destination;
		var firstTrainTime = item.val().firstTrainTime;
		var frequency = item.val().frequency;


		//var key = snapshot.name();

		//console.log("key******",key);

		var currentTime = moment();
		console.log("CT:"+currentTime);
		console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
		console.log("first train time:"+firstTrainTime);
		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTrainTime,"HH:mm").subtract(1, "years");
		console.log("firstTimeConvertd: "+ firstTimeConverted);

		console.log(moment(firstTrainTime,"HH:mm"));
		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % frequency;
		console.log(tRemainder);

		// Minute Until Train----------------
		var tMinutesTillTrain = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train---------------------------------
		var nextTrainArrivalTime = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrainArrivalTime).format("HH:mm"));

		console.log("inside on",trainName);
 

	 
		var row = $('<tr>');
		var td1 = $('<td>');
		var td2 = $('<td>');
		var td3 = $('<td>');
		var td4 = $('<td>');
		var td5 = $('<td>');


		td1.html(trainName);
		td2.html(destination);
		td3.html(frequency);
		td4.html(nextTrainArrivalTime.format("HH:mm"));
		td5.html(tMinutesTillTrain);
	
		row.append(td1);
		row.append(td2);
		row.append(td3);
		row.append(td4);
		row.append(td5);

		$('#trainInfo').append(row);
	});	
 	});


	$('#addTrain').click(function(event){
		event.preventDefault();
		
		var trainName = $('#trainName').val().trim();
		var destination = $('#destination').val().trim();
		var firstTrainTime = $('#firstTrainTime').val().trim();
		var frequency = parseInt($('#frequency').val().trim());

		

		var newTrain ={
			trainName: trainName,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency

		}

		console.log(trainName);
		database.ref('trains').push(newTrain);

		return false;
	});  


	$('#trainInfo').on('click','tr',function(event){
		event.preventDefault();
		console.log("TRAIN ID",$(this).attr("id"));
		var trainName = $(this).data("id");
		var recordReference = database.ref('trains').child('KRkRfni5m70cBGp0DuM');
		console.log("TRAIN NAME",recordReference.trainName)

	});  

});

