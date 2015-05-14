'use strict';

var THREE = require('three');
var PubSub = require('pubsub-js');
var SceneCtrl = require('./scene');

var MeshCtrl = (function() {
  var Mesh = function() {
    this._options = Mesh.options;
    this._meshList = [];
    this._objectList = {};

    this._startHex = 0xF6F6F6;
    this._selectHex = 0x4170F7;

    this._initObjects();
    this._initSubscriptions();
  };

  Mesh.prototype._initObjects = function() {
    for (var i = 0; i < this._options.numX; i++) {
      for (var j = 0; j < this._options.numY; j++) {
        var geometry = new THREE.BoxGeometry(
          this._options.sizeX,
          this._options.sizeY,
          this._options.sizeZ
        );
        var material = new THREE.MeshLambertMaterial({
          color: this._startHex,
          side:THREE.DoubleSide
        });
        var mesh = new THREE.Mesh( geometry, material );

        var x = (i - this._options.numX/2 + 0.5) * (this._options.sizeX+this._options.margin);
        var y = (j - this._options.numY/2 + 0.5) * (this._options.sizeY+this._options.margin);
        var z = 0;
        mesh.position.set(x, y, z);

        SceneCtrl.add( mesh );
        this._meshList.push(mesh);

        var newObject = this._createObject(mesh);
        this._objectList[mesh.id] = newObject;
      }
    }
  };

  Mesh.prototype.getMeshes = function() {
    return this._meshList;
  };

  Mesh.prototype._createObject = function(mesh) {
    return {
      mesh: mesh,
      isSelected: false
    };
  };

  Mesh.prototype._initSubscriptions = function() {
    PubSub.subscribe(
      'Picker.intersect',
      this._selectMesh.bind(this)
    );

    PubSub.subscribe(
      'Beat.next',
      this._nextBeat.bind(this)
    );
  };

  Mesh.prototype._selectMesh = function(msg, data) {
    var object = this._objectList[data.mesh.id];

    if (object.isSelected) {
      object.mesh.material.color.setHex(this._startHex);
      object.isSelected = false;
    } else {
      object.mesh.material.color.setHex(this._selectHex);
      object.isSelected = true;
    }

  };

  Mesh.prototype._nextBeat = function(msg, data) {
    var c = new THREE.Color( 0xFFFFFF );
    c.setRGB( Math.random(), Math.random(), Math.random() );
    this._objectList['3'].mesh.material.color = c;

    // for (var banana in this._objectList) {
    //   var c = new THREE.Color( 0xFFFFFF );
    //   c.setRGB( Math.random(), Math.random(), Math.random() );
    //   banana.mesh.material.color = c;
    // }
  };

  Mesh.options = {
    numX: 4,
    numY: 4,
    numZ: 0,
    margin: 10,
    sizeX: 20,
    sizeY: 20,
    sizeZ: 1
  };

  return new Mesh();
})();

module.exports = MeshCtrl;