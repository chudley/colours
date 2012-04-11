Colours = new Meteor.Collection("colours");

if(Meteor.is_client){
	Template.colour_list.colours = function(){
		return Colours.find({}, {sort: {likes: -1, name: 1}});
	};
	
	Template.colour_list.events = {
		'click button.like': function(){
			var colour = Colours.findOne({_id: Session.get("session_colour")})
			Colours.update(colour, {$inc: {likes: 1}});
			console.log("Liked " + colour.name + " (" + colour._id + ")");
		},
		'click button.delete': function(){
			var colour = Colours.findOne({_id: Session.get("session_colour")})
			var answer = confirm("Delete the colour " + colour.name + "?")
			if(answer){
				Colours.remove(colour)
				console.log("Deleted " + colour.name + " (" + colour._id + ")");
			}
		},
		'keyup #new': function(evt){
			if(evt.which == 13){
				var text = $('#new').val();
				if(text.length < 1) {
					console.log('attempting empty string');
					$('#message').html("That isn't a colour!");
				}
				else if(Colours.findOne({name: text})){
					$('#message').html("Already there!");
				}
				else{
					$('#message').html("");
					$('#new').val("");
					var colour = Colours.findOne({_id: Colours.insert({name: text})}); // Don't know an easier way to do this
					console.log("Added " + colour.name + " (" + colour._id + ")");
				}
			}

		}
	};

	Template.colour_info.maybe_selected = function(){
		return Session.equals("session_colour", this._id) ? "selected" : "";
	};

	Template.colour_info.how_many = function(){
		if(!this.likes) return "Nobody likes";
		if(this.likes == 1) return "One person likes";
		if(this.likes < 5) return "A few people like";
		if(this.likes < 20) return "Some people like";
		return "A lot of people like"; 
	};
	
	Template.colour_info.events = {
		'click': function(){
			Session.set("session_colour", this._id);
			console.log("session_colour changed to " + this._id);
		}
	};
}
