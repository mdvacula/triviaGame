var questions = [
{
	question: "Which hockey icon announced his retirement in 1999?",
	answers: {
		cor: "Wayne Gretzky",
		inc1:"Guy Lafleur",
		inc2:"Bobby Orr",
		inc3: "Bobby Clark"
	}
}
,
{
	question: "Which celebrity popularized the hairstyle known as The Rachel?",
	answers: {
		
		inc1:"Elle DeGeneres",
		inc2:"Oprah Winfrey",
		cor:"Jennifer Aniston",
		inc3:"Anne Hathaway"
	}
},
{
	question: "What toy, that was introduced in 1996, would begin to shake and laugh hysterically When squeezed three times in a row?",
	answers: {
		
		inc1:"Tamagotchi",
		cor:"Tickle Me Elmo",
		inc2:"Polly Pocket",
		inc3:"Gigapets"
	}
},
{
	question:"One of the most popular sitcoms all time, in wich year did Friends premier on NBC?",
	answers: {
		cor: "1994",
		inc1: "1990",
		inc2: "1997",
		inc3: "1999"
	}
},

];

var qCount = 0;
var corCount = 0;
var incCount = 0;
var intervalID;
var timer = 20;
var unaswered = 0;

$(document).ready(function(){
$("#status").hide();
$("#main").hide();
$("#opeining").show()

function beginRound(){
	if(qCount < questions.length){
		$("#status").hide();
		$("#main").show();
		timer = 20;
		$("#timer").html(timer);
		intervalID = setInterval(timedQues, 1000);
		dispQuestion();
		}	
		else{
		displayFinal();
	}
};

function timedQues(){
	if(timer > 1 ){
		timer --;
		$("#timer").html(timer);	
	}
	else{
		clearInterval(intervalID);
		timer--;
		$("#timer").html(timer);
		displayResult();
		qCount++;
		unaswered ++;
	}
};

function dispQuestion(){
	$("#question").html(questions[qCount].question);
	$("#answers").empty();

	for(var answers in questions[qCount].answers){
	
		$("#answers").append("<button type='button' class='list-group-item' id='"+ answers + "'>" + questions[qCount].answers[answers] + "</button>");
	}


};

function displayResult(status){
	clearInterval(intervalID);
	
	$("#main").hide();
	$("#status").show();

	if(status == 1 ){
		$("#status").html("<h1 class='text-center'>Correct</h1>");
		console.log("correct");
		qCount++;
		corCount++;
	}
	else{
		$("#status").html("<h1 class='text-center'>Hmm...That doesn't seem right....</h1");
		$("#status").append("<h2 class='text-center'>The correct Answer was " + questions[qCount].answers.cor + "</h2>");
		console.log("incorrect");
		console.log("The correct Answer was " + questions[qCount].answers.cor);
		incCount++;
		qCount++;
	}

	setTimeout(beginRound, 5000);
};

function displayFinal(){
	$("#main").hide();
	$("#status").show();
	$("#status").html("<h1>Here's How You Did...</h1>");
	$("#status").append("<h2>Correct Answers: " + corCount + "</h2>");
	$("#status").append("<h2>Incorrect Answers: " + incCount + "</h2>");
	$("#status").append("<h2>Unanswered Questions: " + unaswered + "</h2>");
};

$("#start").on("click", function(){
	$("#opening").hide();
	beginRound();
});

$(document.body).on("click", ".list-group-item", function() {

			if ($(this).attr("id") == "cor"){				
				displayResult(1);
			}

			else{
				displayResult(0);
				//incorrect
    }


	});
});