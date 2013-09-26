var User = Backbone.Model.extend({
	className: 'users',
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

	},
	render : function () {
		var html = "<td>" + this.model.get('nameFirst') + "</td><td>" + this.model.get('nameLast') + "</td><td>" + this.model.get('email') + "</td><td class='icons'><img class='edit' src='images/edit.png'	/><img class='delete' src='images/delete.png'	/></td>";
		this.$el.html(html);
		$('#user_table').append(this.el);
	}
});

var newUser = new User({nameFirst:'Matthew', nameLast:'Ross', email:'mbahoshy@gmail.com'});
var newUser2 = new User({nameFirst:'Joe', nameLast:'Ross', email:'joe@gmail.com'});


newUser.save();
newUser2.save();
alert(ulist.length);


/*
var newView = new userView({model: newUser});
var newView2 = new userView({model: newUser2});
*/
//alert(newUser.get('nameFirst'));
