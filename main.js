
// DB Libs 
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/p1ej2');

var empresas = db.get("empresas");
var usuarios = db.get("usuarios");

var Empresa = new (require('./lib/Empresa')).EmpresaControlador(empresas);
var Usuario = new (require('./lib/Usuario')).UsuarioControlador(usuarios);

/* Pruebas...
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

*/

var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.put('/empresa/:nombre', function( req, response ) {
	// creamos la nueva empresa en la BD
	Empresa.add(req.params.nombre, function(err, r){
		if(err)
		{
			response.status(500).send(err);
		}
		else
		{
			response.send(r);
		}
	});
});

app.delete('/empresa/:nombre', function( req, response ) {
	// creamos la nueva empresa en la BD
	Empresa.delete(req.params.nombre, function(err, r){
		if(err || !r)
		{
			response.status(500).send(err);
		}
		else
		{
			response.send({"code":0});
		}
	});
});

app.get('/empresas', function(request, response) {
	Empresa.list(100, function(err, r){
		if(err)
		{
			response.status(500).send(err);
		}
		else
		{
			response.send(r);
		}
	});
});

app.listen(PORT, function() {
  console.log("Node app is running at localhost:" + PORT);
});


module.exports = app;


/*
var Empresa = require("./lib/Empresa.js");


var e = new Empresa.Empresa("hola", 1);


console.log(e.asString());
*/