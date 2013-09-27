function addUser () {
	
	newNameFirst = $('#add_user .nameFirst input').val();
	newNameLast = $('#add_user .nameLast input').val();
	newEmail = $('#add_user .email input').val();

	if (newNameFirst && newNameLast && newEmail) {
		new User({nameFirst:newNameFirst, nameLast:newNameLast, email:newEmail});
		$('#add_user .nameFirst input').val("");
		$('#add_user .nameLast input').val("");
		$('#add_user .email input').val("");
	} else {
		alert('please enter all required fields');
	}
}