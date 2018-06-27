var MathTest=function()
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
};
MathTest.prototype.tellScore=function(){
	document.getElementById("score").innerText = "Score: " + this.correct + "/" +this.question;
	console.log(this.correct);
}
MathTest.prototype.getUserName = function (){
	do {
		this.userName = prompt("Please enter your name");
	}while(this.userName === null || this.userName === "");
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
	this.buttonID = "btn-div";
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
MathTest.prototype.check=function(){
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
