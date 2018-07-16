/* 
 * Stopwatch Class 
 * copyright 2018, Ronald Jensen
 */
const ONEHOUR   = 1000 * 60 * 60;
const ONEMINUTE = 1000 * 60;
const ONESECOND = 1000;

var StopWatch = function (){
  this.running = false; // State variables
  this.dreset   = true;
  
  this.startDate = 0;
  this.stopDate  = 0;
  this.offsetMS  = 0;
  this.lapObj    = null;
}

StopWatch.prototype.start = function(){
  if( this.running) return; // no-op
  var now = new Date();
  if(this.dreset) {
    this.startDate = now;
    this.dreset = false;
  } else {
    this.offsetMS += now - this.stopDate;
  }
  this.running = true;
};


StopWatch.prototype.stop = function(){
  if( !this.running) return; // no-op
  this.running = false;
  this.stopDate = new Date();
};

StopWatch.prototype.reset = function(){
  if( this.running) return; // no-op, alternately, set this.running = false if we want reset to stop the clock

  this.dreset = true;
  this.startDate = 0;
  this.stopDate  = 0;
  this.offsetMS  = 0;
  this.lapObj    = null;
};

StopWatch.prototype.lap = function(){};

StopWatch.prototype.getElapsed = function(){
  var tempStopDate;
  if(this.running) {
    tempStopDate = new Date();
  } else {
    tempStopDate = this.stopDate;
  }
  return (tempStopDate - this.startDate - this.offsetMS);
};

StopWatch.prototype.getTotal = function(){
  var tempStopDate;
  if(this.running) {
    tempStopDate = new Date();
  } else {
    tempStopDate = this.stopDate;
  }
  return (tempStopDate - this.startDate);
};

StopWatch.prototype.ms2str   = function(time){
  var hours;
  var minutes;
  var seconds;
  var milliseconds;
  
  hours = Math.floor(time / ONEHOUR);
  time -= hours * ONEHOUR;
  minutes = Math.floor(time / ONEMINUTE);
  time -= minutes * ONEMINUTE;
  seconds = Math.floor(time / ONESECOND);
  milliseconds = time - seconds * ONESECOND;

  if (minutes < 10) minutes = "0"+minutes;
  if (seconds < 10) seconds = "0"+seconds;

  if (milliseconds < 10) milliseconds = "00"+milliseconds;
  else if (milliseconds < 100) milliseconds = "0"+milliseconds;

  return hours + ":" + minutes + ":" + seconds  + "." + milliseconds;
};
