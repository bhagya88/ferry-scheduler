var config = {
	    apiKey: "AIzaSyBsqikhe6q4quX9fVTtJvqqBCThdeRkLBc",
	    authDomain: "traindata-dcfa7.firebaseapp.com",
	    databaseURL: "https://traindata-dcfa7.firebaseio.com",
	    storageBucket: "traindata-dcfa7.appspot.com",
	    messagingSenderId: "788066423964"
};
firebase.initializeApp(config);

// const email = $('#email');
// const pwd = $('pwd');
// const btnSignIn = $('#signIn');
// const btnSignUp = $('#signUp');
// const btnSignOut = $('#signOut');
$('#signOut').hide();

$('#signIn').click(function(event){
	event.preventDefault();

	const email =  $('#user').val().trim();
	const pwd =  $('#pwd').val().trim();
	const auth = firebase.auth();
	const p = auth.signInWithEmailAndPassword(email,pwd);
	p.catch(e => console.log(e));


});

$('#signUp').click(function(event){
	event.preventDefault();

	const email =  $('#user').val().trim();
	const pwd =  $('#pwd').val().trim();
	const auth = firebase.auth();
	const p = auth.createUserWithEmailAndPassword(email,pwd);
	p.catch(e => console.log(e));


});

$('#signOut').click(function(event){
	firebase.auth().signOut();

});



firebase.auth().onAuthStateChanged(function(firebaseUser){
if(firebaseUser){
	console.log(firebaseUser);
	$(location).attr('href', './index.html');
	firebase.auth().signOut();
	//$('#signOut').show();

}else{
	console.log("User not signed in");
}

});