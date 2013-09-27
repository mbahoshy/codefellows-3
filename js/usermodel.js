var User = Backbone.Model.extend({
	className: 'userclass',
	urlRoot: '/userlist',
	initialize : function () {
		ulist.add(this);
		new userView ({model: this});
	},
	defaults: {
		'nameFirst' : '',
		'nameLast' : '',
		'email' : ''
	}
});

var UsersList = Backbone.Collection.extend({
	model: User
});

var ulist = new UsersList();


var userView = Backbone.View.extend({
	tagName: 'tr',
	events: {
		"click .delete": "destroyUser",
		"click .edit" : "alertedit"
	},
	initialize: function () {
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
		this.render();
	},
	destroyUser : function (e) {
		this.model.destroy();
	},
	alertedit : function (e) {
		if (edit_open == 'false') {
			new editView ({model: this.model});
			edit_open = 'true';
		}	
	},
	render : function () {
		var html = "<td>" + this.model.get('nameFirst') + "</td><td>" + this.model.get('nameLast') + "</td><td>" + this.model.get('email') + "</td><td class='icons'><img class='edit' src='images/edit.png'	/><img class='delete' src='images/delete.png'	/></td>";
		this.$el.html(html);
		$('#user_table').append(this.el);
	}
});

var editView = Backbone.View.extend({
	//tagName: 'tr',
	initialize: function () {
		this.model.on('destroy', this.remove, this);
		this.render();
	},
	events: {
		"click #edit_button" : "updateUser"
	},
	updateUser: function (e) {
		newNameFirst = $('#edit_user .nameFirst input').val();
		newNameLast = $('#edit_user .nameLast input').val();
		newEmail = $('#edit_user .email input').val();
		this.model.set({nameFirst: newNameFirst, nameLast: newNameLast, email:newEmail});
		$('#edit_user').fadeToggle();
		this.remove();
		edit_open = 'false';

	},
	render : function () {
		editNameFirst = this.model.get('nameFirst');
		editNameLast = this.model.get('nameLast');
		editEmail = this.model.get('email');
		var html = "<span class='nameFirst'>First Name:<input value='" + editNameFirst + "' type='text'></span><span class='nameLast'>Last Name: <input value='" + editNameLast + "' type='text'></span><span class='email'>Email: <input value='" + editEmail + "' type='text'></span><div id='edit_button'>Edit User</div>";
		this.$el.html(html);
		$('#edit_user').append(this.el);
		$('#edit_user').fadeToggle();
	}
});

new User({nameFirst:'Matthew', nameLast:'Ross', email:'mbahoshy@gmail.com'});
new User({nameFirst:'Joe', nameLast:'Ross', email:'joe@gmail.com'});


/*
var newView = new userView({model: newUser});
var newView2 = new userView({model: newUser2});
*/
//alert(newUser.get('nameFirst'));
