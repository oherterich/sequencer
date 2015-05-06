'use strict';

var $ = require('jquery');
var THREE = require('three');

// Controllers
var SceneCtrl = require('./scene');
var CameraCtrl = require('./camera');
var TrackballControls = require('../libs/TrackballControls');

var RenderCtrl = function() {
  this._scene = SceneCtrl.getScene();
  this._camera = new CameraCtrl().getCamera();

  this._renderer = new THREE.WebGLRenderer();
  this.setSize($(window).width(), $(window).height());
  $('.three').append(this._renderer.domElement);

  this._controls = new TrackballControls(
    this._camera,
    this._renderer.domElement
  );
};

RenderCtrl.prototype.setSize = function(w, h) {
  this._renderer.setSize(w, h);
};

RenderCtrl.prototype.getRenderer = function() {
  return this._renderer;
};

RenderCtrl.prototype.update = function() {
  this._renderer.render( this._scene, this._camera );
  this._controls.update();
  requestAnimationFrame(this.update.bind(this));
};

module.exports = RenderCtrl;