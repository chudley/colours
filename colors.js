Colors = new Meteor.Collection("colors");

if(Meteor.is_client){
	Template.color_list.colors = function(){
		return Colors.find({}, {sort: {likes: -1, name: 1}});
	};
	
	Template.color_list.events = {
		'click button.like': function(){
			var color = Colors.findOne({_id: Session.get("session_color")})
			Colors.update(color, {$inc: {likes: 1}});
			console.log("Liked " + color.name + " (" + color._id + ")");
		},
		'click button.delete': function(){
			var color = Colors.findOne({_id: Session.get("session_color")})
			var answer = confirm("Delete the color " + color.name + "?")
			if(answer){
				Colors.remove(color)
				console.log("Deleted " + color.name + " (" + color._id + ")");
			}
		},
		'keyup #new': function(evt, text){
			if(evt.which == 13){
				var color = Colors.findOne({_id: Colors.insert({name: $('#new').val()})});

				console.log("Added " + color.name + " (" + color._id + ")");
			}

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
			console.log("session_color changed to " + this._id);
		}
	};
}
