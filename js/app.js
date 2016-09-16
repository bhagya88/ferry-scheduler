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
 	var ferryCount=0;

	function getFerryID(){
		ferryCount++;
		return 'ferry'+ferryCount;
	}

	
 	database.ref('ferries').on('child_added',function(snapshot,prevChildName){

 		var ferryID = snapshot.val().ferryID;
 		
 		var ferryName = snapshot.val().ferryName;
		var destination = snapshot.val().destination;
		var firstFerryTime = snapshot.val().firstFerryTime;
		var frequency = snapshot.val().frequency;


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


		$('#ferryInfo').append(
        	'<tr id="' + ferryID +'">'+
        		'<td>' + ferryName + '</td>' +
        		'<td>' + destination + '</td>' +
        		'<td>' + frequency + '</td>' +
        		'<td>' + nextFerryArrivalTime.format("HH:mm") + '</td>' +
        		'<td>' + tMinutesTillTrain + '</td>' +
        		 // this is a glyphicon to remove table data
        		'<td data-id='+ferryID+' class="remove table-remove glyphicon glyphicon-remove delete"></td>' +
        // this is an update button to update the content
    			'<td><button data-id='+ferryID+' class="editButton edit-save">edit</button></td>'+
    		'</tr>');
  



 	});



 	//  adds new train to database

	$('#addTrain').click(function(event){

		
		
		event.preventDefault();

		
		
		var ferryID;

		database.ref('counter').once('value', function(snapshot) {


			
			ferryID = snapshot.val().count;
			console.log("IDDDD",ferryID);


			// get user inputs from the form		
		var ferryName = $('#ferryName').val().trim();
		var destination = $('#destination').val().trim();
		var firstFerryTime = $('#firstFerryTime').val().trim();
		var frequency = parseInt($('#frequency').val().trim());

		
		// create new ferry object
		var newFerry ={
			ferryID:ferryID,
			ferryName: ferryName,
			destination: destination,
			firstFerryTime: firstFerryTime,
			frequency: frequency

		}
		console.log("newFerry",newFerry);

			database.ref('ferries').child(ferryID).set(newFerry);

			ferryID++;
			database.ref('counter').set({count:ferryID});
			

		});


		// create a new train in the databaseferr

		
		
		
		//
		return false;
	
	});  



	$('#ferryInfo').on('click','.edit-save',function(event){
		event.preventDefault();
		var ferryID = $(this).data().id;

		var mode = $(this).html();

		if(mode === "edit"){
	
			$('#'+ferryID).children().eq(0).attr("contenteditable",true);
			$('#'+ferryID).children().eq(1).attr("contenteditable",true);
			$('#'+ferryID).children().eq(2).attr("contenteditable",true);
			
			$('#'+ferryID).children().eq(0).addClass('edit');
			$('#'+ferryID).children().eq(1).addClass('edit');
			$('#'+ferryID).children().eq(2).addClass('edit');

			$(this).html("save");

		}else if(mode === "save"){

				var ferryName= $('#'+ferryID).children().eq(0).text();
	  			var destination= $('#'+ferryID).children().eq(1).text();
	  			var frequency = $('#'+ferryID).children().eq(2).text();
			
				var updatedFerry ={
								ferryName: ferryName,
								destination: destination,
								frequency: frequency

				}

				database.ref('ferries').child(ferryID).update(updatedFerry);

				$(this).html("edit");
			

		}

	});

	// delete a record

	$('#ferryInfo').on('click','.delete',function(event){
		event.preventDefault();
		var ferryID = $(this).data().id;
		database.ref('ferries/'+ferryID).remove();
		$('#'+ferryID).remove();
	});
});


