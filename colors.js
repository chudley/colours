Colors = new Meteor.Collection("colors");

if(Meteor.is_client){
	Template.color_list.colors = function(){
		return Colors.find({}, {sort: {likes: -1, name: 1}});
	};
	
	Template.color_list.events = {
		'click button': function(){
			Colors.update(Session.get("session_color"), {$inc: {likes: 1}});
		}
	};

	Template.color_info.maybe_selected = function(){
		return Session.equals("session_color", this._id) ? "selected" : "";
	};

	Template.color_info.how_many = function(){
		if(!this.likes) return "No people like";
		if(this.likes == 1) return "One person likes";
		if(this.likes < 5) return "A few people like";
		if(this.likes < 20) return "Some people like";
		return "A lot of people like"; 
	};
	
	Template.color_info.events = {
		'click': function(){
			Session.set("session_color", this._id);
		}
	};
}
