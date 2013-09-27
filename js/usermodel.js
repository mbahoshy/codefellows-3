//creates user model
var User = Backbone.Model.extend({
	initialize : function () {
		//automatically instantiate new view when model is created
		new userView ({model: this});
		ulist.add(this); //add model to collection
	},
	defaults: {
		'nameFirst' : '',
		'nameLast' : '',
		'email' : ''
	}
});

//creates view used to display users
var userView = Backbone.View.extend({
	tagName: 'tr',
	events: {
		"click .delete": "destroyUser",
		"click .edit" : "editUser"
	},
	initialize: function () {
		//assign event listeners to render userView on changes to model, or remove view on model destroy
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
		this.render();
	},
	//destroy user method
	destroyUser : function () {
		this.model.destroy();
	},
	//edit user method
	editUser : function () {
		if (edit_open == 'false') {
			new editView ({model: this.model}); //instantiates new editView
			edit_open = 'true'; //prevents multiple 'edit_users' from being instantiated
		}	
	},
	//renders html for userView
	render : function () {
		var html = "<td>" + this.model.get('nameFirst') + "</td><td>" + this.model.get('nameLast') + "</td><td>" + this.model.get('email') + "</td><td class='icons'><img class='edit' src='images/edit.png'	/><img class='delete' src='images/delete.png'	/></td>";
		this.$el.html(html);
		$('#user_table').append(this.el);
	}
});

//creates view to edit users
var editView = Backbone.View.extend({
	initialize: function () {
		//automatically render when view is initialized
		this.render();
	},
	events: {
		"click #edit_button" : "updateUser"
	},
	//update user method
	updateUser: function () {
		//assign varaibles to input values
		newNameFirst = $('#edit_user .nameFirst input').val();
		newNameLast = $('#edit_user .nameLast input').val();
		newEmail = $('#edit_user .email input').val();

		if (newNameFirst && newNameLast && newEmail) {
			//update model with new information
			this.model.set({nameFirst: newNameFirst, nameLast: newNameLast, email:newEmail});
			
			$('#edit_user').fadeToggle(); //fade out edit_user div
			this.remove(); //destroy editView
			edit_open = 'false'; //allow another editView instance to be created
		} else {
			alert('Field may not be left blank');
		}

	},
	render : function () {
		//assign variables to current model values
		editNameFirst = this.model.get('nameFirst');
		editNameLast = this.model.get('nameLast');
		editEmail = this.model.get('email');

		//render html
		var html = "<span class='nameFirst'>First Name:<input value='" + editNameFirst + "' type='text'></span><span class='nameLast'>Last Name: <input value='" + editNameLast + "' type='text'></span><span class='email'>Email: <input value='" + editEmail + "' type='text'></span><div id='edit_button'>Edit User</div>";
		this.$el.html(html);

		//append html to proper div, and fade div display
		$('#edit_user').append(this.el);
		$('#edit_user').fadeToggle();
	}
});

//creates a new collection
var UserList = Backbone.Collection.extend({
	model:User
});

//instantiates new collection
var ulist = new UserList();

//data for defaultUsers (populated on document.ready)
var defaultUsers = [
	{nameFirst:'Matthew', nameLast:'Ross', email:'mbahoshy@gmail.com'},
	{nameFirst:'Mark', nameLast:'Twain', email:'mtwain@hotmail.com'},
	{nameFirst:'Jason', nameLast:'Bourne', email:'johndoe@yahoo.com'},
	{nameFirst:'Victoria', nameLast:'Secret', email:'vs@gmail.com'},
	{nameFirst:'Willie', nameLast:'Nelson', email:'wnelson@yahoo.com'}
];