

exports.UsuarioControlador = function(colecc){

	// Coleccion de la BD Mongo
	this.coleccion = colecc;


	this.add = function(nombre, password, cb){
		// Recibe el nombre de la empresa a crear y la funcion callback
		var c = this.coleccion;
		this.getByName(nombre, function(err, usuarios){
			if(usuarios.length == 0)
			{	// No quiero empresas repetidas
				c.insert({
					nombreusuario: nombre,
					password: password // Al ser un Object JSON, un nuevo voto de un usuario sobreescribe el anterior
				}, cb);
			}
			else
			{
				cb("Error: Usuario repetido", null);
			}
		});
	};

	this.getById = function(id, cb){
		this.coleccion.find({_id:id}, cb);
	};

	this.getByName = function(nombre, cb){
		this.coleccion.find({nombreusuario:nombre}, cb);
	};

	this.search = function(nombre, cb){
		this.coleccion.find({nombreusuario:{"$regex":nombre}}, cb);
	};

	this.list = function(limit, cb){
		this.coleccion.find({}, {limit: limit}, cb);
	};

};

