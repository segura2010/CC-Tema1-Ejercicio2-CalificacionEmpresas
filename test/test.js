
var assert = require('assert');

var monk = require('monk');
var db = monk('localhost:27017/p1ej2');

var empresas = db.get("empresas");
var usuarios = db.get("usuarios");

var Empresa = new (require('./lib/Empresa')).EmpresaControlador(empresas);
var Usuario = new (require('./lib/Usuario')).UsuarioControlador(usuarios);


describe('Empresa', function() {
  describe('Crea', function () {
    it('Debe crear la empresa correctamente', function () {
    	Empresa.add("empresatest", function(err, result){
    		assert.equal(result.nombre, "empresatest", "Creada");
    	});
    });
  });

  describe('Elimina', function () {
    it('Debe eliminar al usuario correctamente', function () {
    	Empresa.delete("usuariotest", function(err){
    		assert.equal(err, undefined, "Eliminada");
    	});
    });
  });
});

describe('Usuario', function() {
  describe('Crea', function () {
    it('Debe crear al usuario correctamente', function () {
    	Usuario.add("usuariotest", function(err, result){
    		assert.equal(result.nombreusuario, "usuariotest", "Creado");
    	});
    });
  });

  describe('Elimina', function () {
    it('Debe eliminar al usuario correctamente', function () {
    	Usuario.delete("usuariotest", function(err){
    		assert.equal(err, undefined, "Eliminado");
    	});
    });
  });
});