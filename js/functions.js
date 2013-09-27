$(document).ready(function(){

	$('#add_button').click(addUser); //assign click event to add button
	edit_open = 'false'; //edit_open prevents multiple editView from being instantiated
	ulist.reset(defaultUsers); //populate with default users

});


//called when add_button is clicked
function addUser () {
	//assign variables from input fields
	newNameFirst = $('#add_user .nameFirst input').val();
	newNameLast = $('#add_user .nameLast input').val();
	newEmail = $('#add_user .email input').val();

	if (newNameFirst && newNameLast && newEmail) {
		//creates new User instance based on input data
		new User({nameFirst:newNameFirst, nameLast:newNameLast, email:newEmail});

		//clears text from input fields
		$('#add_user .nameFirst input').val("");
		$('#add_user .nameLast input').val("");
		$('#add_user .email input').val("");
	} else {
		alert('Please enter all required fields');
	}
}