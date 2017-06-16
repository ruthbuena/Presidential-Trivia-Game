
// Begin game with Start Button

$("#start").on("click",function(){
	$("#start").remove();
	quiz.loadQuestion();
})

$(document).on("click",".answer-btn", function(e){
	quiz.clicked(e);
})

$(document).on("click","#reset",function(){
	quiz.reset();
})

// Questions for Quiz
var questions = [
{
	question: "Which President was known as Slick Willie?",
	answers: ["William McKinley", "William Howard Taft", "Bill Clinton", "William Henry Harrison"],
	correctAnswer: "Bill Clinton",
	tidbit: "Journalist Paul Greenberg coined this nickname for Clinton during his 1980 Arkansas gubernatorial run.",
},
{
	question: "Which President was nicknamed Weasel Words?",
	answers: ["Woodrow Wilson", "Calvin Coolidge", "George W. Bush", "Barack Obama"],
	correctAnswer: "Woodrow Wilson",
	tidbit: "Wilson was given this nickname by Theodore Roosevelt,whose speech in St. Louis in May of 1916 described Wilson’s penchant for creating phrases in which the words contradicted one another.",
},
{
	question: "Which President was known as The Sphinx?",
	answers: ["Alexander Hamilton", "Theodore Roosevelt", "Franklin Roosevelt", "George Washington"],
	correctAnswer: "Franklin Roosevelt",
	tidbit: "The press labeled FDR this nickname during his refusal to acknowledge whether or not he would run for a third presidential term in 1940",
},
{
	question: "Which President was known as Tricky Dick?",
	answers: ["John F Kennedy", "Lyndon Johnson", "Ronald Reagan", "Richard Nixon"],
	correctAnswer: "Richard Nixon",
	tidbit: "Nixon was given this moniker by a reporter during his 1950 US Senate run in which he used tactics that framed his opponent, Helen Douglas, as a friend of communists",
},
{
	question: "Which President was nicknamed Uncle Jumbo?",
	answers: ["William McKinley", "William Henry Harrison", "Grover Cleveland", "Harry Truman"],
	correctAnswer: "Grover Cleveland",
	tidbit: "Grover Cleveland, who weighed over 250 pounds, was given this nickname when he served as the governor of New York.",	
},
{
	question: "Which President was known as Ike?",
	answers: ["Dwight D. Eisenhower", "Ulysses S. Grant", "Chester Arthur", "Gover Cleveland"],
	correctAnswer: "Dwight D. Eisenhower",
	tidbit: "All of Eisenhower's brothers were known as Ike by their family. Brother Edgar was known as Big Ike and Dwight was known as Little Ike.",
}];

//Game as an object

var quiz = {
	questions:questions,
	currentQuestion:0,
	counter:30,
	correct:0,
	incorrect:0,
	
	countdown:function(){
		quiz.counter--;
		$("#counter").html(quiz.counter);
		if(quiz.counter<=0){
			console.log("Time's Up!");
			quiz.timesUp();
		}
	},
	loadQuestion: function(){
		timer = setInterval(quiz.countdown,1000);
		$("#container").html("<h2 id='counter' >30</h2>");
		$("#container").append('<h2>' + questions[quiz.currentQuestion].question + '</h2>');
		for (var i = 0; i<questions[quiz.currentQuestion].answers.length; i++) {
		$("#container").append('<button class = "answer-btn" id="button-  '+i+' "data-name=" ' 
		+ questions[quiz.currentQuestion].answers[i]+' ">'+questions[quiz.currentQuestion].answers[i]+'</button>');
		}
	},
	nextQuestion: function(){
		quiz.counter = 30;
		$("#counter").html(quiz.counter);
		quiz.currentQuestion++;
		quiz.loadQuestion();
	},
	timesUp: function(){
		clearInterval(timer);
		quiz.unanswered++;
		$("#container").html("<h2> Time's Up! </h2>");
		$("#container").append("<h3> The correct answer is: "+questions[quiz.currentQuestion].correctAnswer+ "</h3>");
		if(quiz.currentQuestion==questions.length-1){
			setTimeout(quiz.results, 3000);
		} else {
			setTimeout(quiz.nextQuestion, 3000);
		}
	},
	results: function(){
		clearInterval(timer);
		$("#container").html("Game Over");
		$("#container").append("<h3>Correct: "+ quiz.correct+ "</h3>");
		$("#container").append ("<h3>Incorrect: " + quiz.incorrect + "</h3>");
		$("#container").append("<h3>unanswered:  "+ quiz.unanswered+ "</h3>");
		$("#container").append('<button id="reset">RESET</button>');
	},
	clicked: function(e){
		clearInterval(timer);
		if($(e.target).data("name")==questions[quiz.currentQuestion].correctAnswer){
			quiz.answeredCorrectly();
				} else {
			quiz.answeredWrong();
				}
	},
	answeredCorrect: function(){
		console.log("Correct");
		clearInterval(timer);
		quiz.correct++;
		$("#container").html('<h2> Correct! </h2>');
		if(quiz.currentQuestion==questions.length-1){
			setTimeout(quiz.results,3000);
		} else	{
			setTimeout(quiz.nextQuestion, 3000);
		}
	},
	answeredWrong: function (){
		console.log("Incorrect");
		clearInterval(timer);
		quiz.incorrect++;
		$("#container").html('<h2> Incorrect! </h2>');
		$("#container").append("<h3> The correct answer is: "+questions[quiz.currentQuestion].correctAnswer+ "</h3>");
		if(quiz.currentQuestion==questions.length-1){
			setTimeout(quiz.results,3000);
		} else	{
			setTimeout(quiz.nextQuestion, 3000);
		}
	},
	reset: function(){
		quiz.currentQuestion=0;
		quiz.counter =0;
		quiz.correct = 0;
		quiz.incorrect = 0;
		quiz.unanswered = 0;
		quiz.loadQuestion = 0;
	}
}


