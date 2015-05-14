'use strict';

var PubSub = require('pubsub-js');

var Beat = function(bpm) {
  this._currentBeat = 0;
  this._currentTime = Date.now();
  console.log(this._currentTime);
  this._prevTime = this._currentTime;
  this._bpm = bpm;
  this._timeDiff = this.BpmToMillis(this._bpm);
};

Beat.prototype.update = function() {
  this._currentTime = Date.now();

  var diff = this._currentTime - this._prevTime;

  if ( diff > this._timeDiff) {
    this._currentBeat = this._nextBeat(this._currentBeat);
    this._prevTime = this._currentTime;

    PubSub.publish('Beat.next', {beat: this._currentBeat});
  }
};

Beat.prototype.BpmToMillis = function(bpm) {
  return Math.round((60 / bpm) * 1000);
};

Beat.prototype._nextBeat = function(beat) {
  if (beat >= 3) {
    return 0;
  } else {
    return beat+1;
  }
};

module.exports = Beat;
