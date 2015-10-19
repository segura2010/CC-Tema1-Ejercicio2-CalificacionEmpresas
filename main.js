
// DB Libs
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/p1ej2');

var empresas = db.get("empresas");
var usuarios = db.get("usuarios");

var Empresa = new (require('./lib/Empresa')).EmpresaControlador(empresas);
//var Usuario = new (require('./lib/Usuario')).Usuario(usuarios);

Empresa.add("primera", function(err, result){
	if(err){
		console.log(err);
	}
	else
	{
		console.log(result);
	}

	Empresa.add("primeraysegunda", function(err, result){

		if(err){
			console.log(err);
		}
		else
		{
			console.log(result);
			console.log("Añadida!");
		}

		Empresa.getByName("primera", function(err, result){
			if(err){
				console.log(err);
			}
			console.log(result);

			/*
			Empresa.list(3, function(err, result){
				console.log(result);
			});
			*/

			
			Empresa.addCalificacionByName("idprueba", "primera", 2, function(err, result){
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