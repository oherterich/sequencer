'use strict';

var $ = require('jquery');
var THREE = require('three');

// Controllers
var SceneCtrl = require('./scene');
var CameraCtrl = require('./camera');
var TrackballControls = require('../libs/TrackballControls');
var BeatCtrl = require('./beat');

var RenderCtrl = (function() {
  var Render = function() {
    this._camera = CameraCtrl.getCamera();
    this._scene = SceneCtrl.getScene();
    this._renderer = new THREE.WebGLRenderer();
    this.setSize($(window).width(), $(window).height());
    $('.three').append(this._renderer.domElement);

    this._controls = new TrackballControls(
      this._camera,
      this._renderer.domElement
    );

    this._beat = new BeatCtrl(120);

    this._time = 0;
  };

  Render.prototype.setSize = function(w, h) {
    this._renderer.setSize(w, h);
  };

  Render.prototype.getRenderer = function() {
    return this._renderer;
  };

  Render.prototype.update = function() {
    this._time++;
    this._renderer.render( this._scene, this._camera );
    this._controls.update();
    this._beat.update();
    // CameraCtrl.update(this._time);
    requestAnimationFrame(this.update.bind(this), 1000/60);
  };

  return new Render();
})();

module.exports = RenderCtrl;