/* Copyright 2018 Ronald Jensen */

var MathTest=function(stopwatch)
{
	this.result=null;
	this.op1=null;
	this.op2=null;
	this.question=0;
	this.correct=0;
	this.userName="";
	this.buttonID="btn-add";
	this.maxDigit=16;
	this.useNegative=false;
	this.stopWatch=stopwatch;
	this.gameMode='freeplay';
};
MathTest.prototype.tellScore=function(){
	document.getElementById("score").innerText = "Score: " + this.correct + "/" +this.question;
	console.log(this.correct);
}

// the next two probably don't go in this class
MathTest.prototype.setUserName = function (user){
	if (user === null || user == "" || user === undefined) {
		this.userName = "any mouse";
	} else {
		this.userName = user;
	}
	this.tellUserName();
	return true;
};
MathTest.prototype.tellUserName = function()
{
	document.getElementById("userName").innerText = "Hi, "+this.userName + ", lets play some math!";
	console.log("Hi, "+this.userName);
};

MathTest.prototype.startQuestion=function(){
	document.getElementById("answerCorrect").hidden=true;
	document.getElementById("answerWrong").hidden=true;
	document.getElementById("game_answer").value = ""; // clear
	document.getElementById("game_answer").focus(); // set active
	// create the numbers
	this.op1 = Math.floor(Math.random() * (this.maxDigit+1));
	this.op2 = Math.floor(Math.random() * (this.maxDigit+1));
	if(this.useNegative){
		this.op1 *= Math.random() > 0.5 ? 1 : -1;
		this.op2 *= Math.random() > 0.5 ? 1 : -1;
	}
	// display
	document.getElementById("game_operand1").innerText = this.op1;
	document.getElementById("game_operand2").innerText = this.op2;
	if(this.stopWatch) this.stopWatch.start();
	this.question++;
}
MathTest.prototype.playAdd=function() {
	this.buttonID = "btn-add";
	this.startQuestion();
	this.result = this.op1 + this.op2;
	// display
	document.getElementById("game_operator").innerText = "+";
}
MathTest.prototype.playSubtract=function() {
	this.buttonID = "btn-sub";
	this.startQuestion();
	this.result = this.op1 - this.op2;
	// display
	document.getElementById("game_operator").innerText = "-";
}
MathTest.prototype.playMultiply=function() {
	this.buttonID = "btn-mul";
	this.startQuestion();
	// create the numbers
	this.result = this.op1 * this.op2;
	// display
	document.getElementById("game_operator").innerText = "*";
}
MathTest.prototype.playDivide=function() {
	this.buttonID = "btn-div"
	this.op2 = 0;
	while(this.op2 == 0 ) { //loop until denominator is not 0
		this.startQuestion();
	}
	// create the numbers
	this.result = this.op1;
	this.op1 = this.result * this.op2;
	// display
	document.getElementById("game_operand1").innerText = this.op1; // override
	document.getElementById("game_operator").innerText = "/";
}
MathTest.prototype.playNextQuestion = function() {
	switch ( Math.floor(Math.random() * 4) ) {
		case 0:
			this.playDivide();
			break;
		case 1:
			this.playMultiply();
			break;
		case 2:
			this.playSubtract();
			break;
		case 3:
		default: // also case 3:
			this.playAdd();
			break;
	}
	this.buttonID = "btn-next"
}
MathTest.prototype.check=function(){
	if(this.stopWatch) this.stopWatch.stop();
	var theAnswer = parseInt(document.getElementById("game_answer").value);
	console.log("Checking if " + this.result + " == " + theAnswer);
	if(this.result === theAnswer){
		this.correct++;
		console.log("It does!");
		document.getElementById("answerCorrect").hidden=false;
		document.getElementById("answerWrong").hidden=true;
	} else {
		console.log("It does not!");
		document.getElementById("answerCorrect").hidden=true;
		document.getElementById("answerWrong").hidden=false;
		document.getElementById("answerWrongShow").innerText = this.result;
	}
	this.tellScore();
	this.result=null;
	document.getElementById(this.buttonID).focus();
}
MathTest.prototype.setTitle=function(title, subtitle){
	document.getElementById("gameTitle").innerHTML = "<h2>" + title + "</h2><h3>" + subtitle + "</h3>";
}
MathTest.prototype.startGameFreeplay=function(){
	this.gameMode='mode_freeplay';
	this.setTitle("Free Play Mode", "Click an operation for next question");
	var commandButtons = '<button id="btn-add" class="btn" type="button" onclick="myTest.playAdd();"     >+</button>\<button id="btn-sub" class="btn" type="button" onclick="myTest.playSubtract();">-</button>\<button id="btn-mul" class="btn" type="button" onclick="myTest.playMultiply();">*</button>\<button id="btn-div" class="btn" type="button" onclick="myTest.playDivide();"  >/</button>'
	$('#command_row').html(commandButtons);
}
MathTest.prototype.startGameMinute=function(){
	this.gameMode='mode_minute';
	this.setTitle("Minute To Win It Mode", "Answer as many questions as possible in 60 Seconds");

}
MathTest.prototype.startGame20Questions=function(){
	this.gameMode='mode_twenty';
	this.setTitle("20 Questions Mode", "Answer 20 questions correctly as rapidly as possible.");
}
MathTest.prototype.startGamePractice=function(){
	this.gameMode='mode_practice';
	this.setTitle("Practice Mode", "Answer Randomly Selected Questions");
	var commandButtons = '<button id="btn-next" class="btn-text" type="button" onclick="myTest.playNextQuestion();">Next<br>Question</button>'
	$('#command_row').html(commandButtons);
}

MathTest.prototype.setGameMode=function(mode)
{
	switch(mode) {
		case 'mode_freeplay':
			this.startGameFreeplay();
			break;
		case 'mode_minute':
			this.startGameMinute();
			break;
		case 'mode_twenty':
			this.startGame20Questions();
			break;
		case 'mode_practice':
			this.startGamePractice();
			break;
		default: // warning: recursion.
			this.setGameMode('mode_freeplay');
			break;
	}
}