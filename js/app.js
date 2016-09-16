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


	
		// var row = $('<tr>');
		// var td1 = $('<td>');
		// var td2 = $('<td>');
		// var td3 = $('<td>');
		// var td4 = $('<td>');
		// var td5 = $('<td>');


		// td1.html(ferryName);
		// td2.html(destination);
		// td3.html(frequency);
		// td4.html(nextFerryArrivalTime.format("HH:mm"));
		// td5.html(tMinutesTillTrain);
		//tMinutesTillTrain
		// row.attr("id",ferryName);
		// row.append(td1);
		// row.append(td2);
		// row.append(td3);
		// row.append(td4);
		// row.append(td5);

		// $('#ferryInfo').append(row);

		$('#ferryInfo').append(
        	'<tr id="' + ferryName +'">'+
        		'<td>' + ferryName + '</td>' +
        		'<td>' + destination + '</td>' +
        		'<td>' + frequency + '</td>' +
        		'<td>' + nextFerryArrivalTime.format("HH:mm") + '</td>' +
        		'<td>' + tMinutesTillTrain + '</td>' +
        		 // this is a glyphicon to remove table data
        		'<td data-id='+ferryName+' class="remove table-remove glyphicon glyphicon-remove delete"></td>' +
        // this is an update button to update the content
    			'<td><button data-id='+ferryName+' class="editButton edit-save">edit</button></td>'+
    		'</tr>');
  



 	});


	$('#addTrain').click(function(event){
		event.preventDefault();
		
		var ferryName = $('#ferryName').val().trim();
		var destination = $('#destination').val().trim();
		var firstFerryTime = $('#firstFerryTime').val().trim();
		var frequency = parseInt($('#frequency').val().trim());

		

		var newFerry ={
			ferryName: ferryName,
			destination: destination,
			firstFerryTime: firstFerryTime,
			frequency: frequency

		}

		console.log(ferryName);
		database.ref('ferries').child(ferryName).set(newFerry);
		//database.ref('ferries').push(newFerry);

		return false;
	});  


	// $('#trainInfo').on('click','tr',function(event){
	// 	event.preventDefault();
// 	console.log("ferry ID",$(this).attr("id"));
	// 	var ferryName = $(this).data("id");
	// 	var recordReference = database.ref('ferries').child(ferryName);
	// });  


 


	$('#ferryInfo').on('click','.edit-save',function(event){
		event.preventDefault();
		var ferryName = $(this).data().id;
		var mode = $(this).html();

		if(mode === "edit"){

		
			console.log("Ferry ID",ferryName);

			$('#'+ferryName).children().eq(0).attr("contenteditable",true);
			$('#'+ferryName).children().eq(1).attr("contenteditable",true);
			$('#'+ferryName).children().eq(2).attr("contenteditable",true);
				
			$(this).html("save");

		

		}else if(mode === "save"){

			
	  			var destination= $('#'+ferryName).children().eq(1).text();
	  			var frequency = $('#'+ferryName).children().eq(2).text();

				

				

				var updatedFerry ={
								ferryName: ferryName,
								destination: destination,
								frequency: frequency

				}

				database.ref('ferries').child(ferryName).update(updatedFerry);
				
				$(this).html("edit");
			

		}

	});
});


