'use strict';

var $ = require('jquery');
var THREE = require('three');

var SceneCtrl = (function() {

  var Scene = function() {
    this._scene = new THREE.Scene();
  };

  Scene.prototype.getScene = function() {
    return this._scene;
  };

  Scene.prototype.add = function(object) {
    this._scene.add(object);
  };

  return new Scene();
})();

module.exports = SceneCtrl;
