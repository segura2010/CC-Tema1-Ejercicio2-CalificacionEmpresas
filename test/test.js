
var assert = require('assert');

var monk = require('monk');
var db = monk('localhost:27017/p1ej2');

var empresas = db.get("empresas");
var usuarios = db.get("usuarios");

var Empresa = new (require('../lib/Empresa')).EmpresaControlador(empresas);
var Usuario = new (require('../lib/Usuario')).UsuarioControlador(usuarios);

var request = require('supertest'), 
    app = require('../main.js');

describe('Empresa', function() {
  describe('Crea', function () {
    it('Debe crear la empresa correctamente', function (done) {
    	Empresa.add("empresatest", function(err, result){
    		assert.equal(result.nombre, "empresatest", "Creada");
        done();
    	});
    });
  });

  describe('Elimina', function () {
    it('Debe eliminar al usuario correctamente', function (done) {
    	Empresa.delete("empresatest", function(err){
    		assert.equal(err, undefined, "Eliminada");
        done();
    	});
    });
  });
});

describe('Usuario', function() {
  describe('Crea', function () {
    it('Debe crear al usuario correctamente', function (done) {
    	Usuario.add("usuariotest", function(err, result){
    		assert.equal(result.nombreusuario, "usuariotest", "Creado");
        done();
    	});
    });
  });

  describe('Elimina', function () {
    it('Debe eliminar al usuario correctamente', function (done) {
    	Usuario.delete("usuariotest", function(err){
    		assert.equal(err, undefined, "Eliminado");
        done();
    	});
    });
  });
});

describe('Peticiones', function() {
  describe('PUT', function () {
    it('Crear Empresa', function (done) {
        request(app)
          .put('/empresa/empresadeprueba')
          .expect(200,done);
    });
  });
  describe('DELETE', function () {
    it('Borrar Empresa', function (done) {
        request(app)
          .delete('/empresa/empresadeprueba')
          .expect(200, done);
    });
  });
});

