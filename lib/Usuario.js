

exports.Usuario = function(id, name, qualification){

	this.id = id;
	this.name = name;

	// Methods
	this.asString = function(){
		return "User: " + this.name + ", ("+ this.id +")";
	};
};

