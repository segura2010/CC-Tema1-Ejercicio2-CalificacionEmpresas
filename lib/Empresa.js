

exports.EmpresaControlador = function(colecc){

	// Coleccion de la BD Mongo
	this.coleccion = colecc;


	this.add = function(nombre, cb){
		// Recibe el nombre de la empresa a crear y la funcion callback
		var c = this.coleccion;
		this.getByName(nombre, function(err, empresas){
			if(empresas.length == 0)
			{	// No quiero empresas repetidas
				c.insert({
					nombreusuario: nombre,
					calificaciones: {} // Al ser un Object JSON, un nuevo voto de un usuario sobreescribe el anterior
				}, cb);
			}
			else
			{
				cb("Error: Empresa repetida", null);
			}
		});
	};

	this.getById = function(id, cb){
		this.coleccion.find({_id:id}, cb);
	};

	this.getByName = function(nombre, cb){
		this.coleccion.find({nombre:nombre}, cb);
	};

	this.search = function(nombre, cb){
		this.coleccion.find({nombre:{"$regex":nombre}}, cb);
	};

	this.list = function(limit, cb){
		this.coleccion.find({}, {limit: limit}, cb);
	};


	// Methods
	this.asString = function(){
		return "Enterprise: " + this.name + ", ("+ this.qualification +")";
	};

	this.addCalificacionByName = function(uid, nombre, calificacion, usuarioControlador, cb){

		var c = this.coleccion;

		// Chequeos de calificacion
		if(calificacion < 0 || calificacion > 10)
		{
			return cb("Error: Calificacion invalida");
		}

		// Comprobamos que existe la empresa
		this.getByName(nombre, function(err, empresas){

			if(err || empresas.length <= 0)
			{
				return cb('Error: Empresa no encontrada', null);
			}

			// Comprobamos que existe el usuario
			usuarioControlador.getById(uid, function(err, usuarios){
				if(err){
					return cb(err, null);
				}
				if(usuarios.length > 0)
				{
					var id = empresas[0]._id;
					var calificaciones = empresas[0].calificaciones || {};
					calificaciones[uid] = calificacion;
					c.update({_id:id}, { $set:{'calificaciones':calificaciones} }, cb);
				}
				else
				{
					cb('Error: Usuario no encontrado', null);
				}
			});
		});
	}
};
