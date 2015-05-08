'use strict';

var THREE = require('three');
var SceneCtrl = require('./scene');

var MeshCtrl = function() {
  this._options = MeshCtrl.options;
  this._objectList = [];
  this._initObjects();
};

MeshCtrl.prototype._initObjects = function() {
  for (var i = 0; i < this._options.numX; i++) {
    for (var j = 0; j < this._options.numY; j++) {
      var geometry = new THREE.CubeGeometry(
        this._options.sizeX,
        this._options.sizeY,
        this._options.sizeZ
      );
      var material = new THREE.MeshLambertMaterial({
        color: 0xFF0000,
        side:THREE.DoubleSide
      });
      var mesh = new THREE.Mesh( geometry, material );

      var x = (i - this._options.numX/2 + 0.5) * (this._options.sizeX+this._options.margin);
      var y = (j - this._options.numY/2 + 0.5) * (this._options.sizeY+this._options.margin);
      var z = 0;
      mesh.position.set(x, y, z);

      SceneCtrl.add( mesh );
    }
  }
};

MeshCtrl.options = {
  numX: 5,
  numY: 5,
  numZ: 0,
  margin: 10,
  sizeX: 20,
  sizeY: 20,
  sizeZ: 1
};

module.exports = MeshCtrl;