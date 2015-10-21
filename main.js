
// DB Libs 
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/p1ej2');

var empresas = db.get("empresas");
var usuarios = db.get("usuarios");

var Empresa = new (require('./lib/Empresa')).EmpresaControlador(empresas);
var Usuario = new (require('./lib/Usuario')).UsuarioControlador(usuarios);

Empresa.add("primera", function(err, result){
	if(err){
		console.log(err);
	}
	else
	{
		console.log(result);
	}

	Usuario.add("usuario1", "password", function(err, result){

		if(err){
			console.log(err);
		}
		else
		{
			console.log(result);
			console.log("Añadida!");
		}

		Usuario.getByName("usuario1", function(err, result){
			if(err){
				console.log(err);
			}
			console.log(result);

			/*
			Empresa.list(3, function(err, result){
				console.log(result);
			});
			*/

			
			Empresa.addCalificacionByName(result[0]._id, "primera", 2, Usuario, function(err, result){
				if(err){
					console.log(err);
				}
				else
				{
					console.log("Calificada!");
				}
			});
			
		});
	});
});

/*
var Empresa = require("./lib/Empresa.js");


var e = new Empresa.Empresa("hola", 1);


console.log(e.asString());
*/