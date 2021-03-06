$(document).ready(function() {

  var WhoQuestionAndAnswers = {
    multipleChoiceAnswers: ['Sarah','Abel','John','Isaiah','Moses','Goliath','David','Job','Isaiah','Abraham','Aaron','Adam','Eve','Aaron','Barnabas','Hannah','Thomas','Timothy','Philip','Stephen','Mark'],
    multipleChoiceBuilder: function (whoMultipleChoice) {
      if(whoMultipleChoice.length !== 4) {
        whoMultipleChoice = whoMultipleChoice.multipleChoiceAnswers;
      }
      /*Lines 11-19 is using 'The Fisher-Yates' (aka Knuth) shuffle algorithm
      reference: https://github.com/coolaj86/knuth-shuffle*/
		  var currentIndex = whoMultipleChoice.length, temporaryValue, randomIndex;

		  while (0 !== currentIndex) {
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;
			  temporaryValue = whoMultipleChoice[currentIndex];
			  whoMultipleChoice[currentIndex] = whoMultipleChoice[randomIndex];
			  whoMultipleChoice[randomIndex] = temporaryValue;
		  }

      if(whoMultipleChoice.indexOf(this.question.slice(this.question.indexOf(":")+1)) < 0) {
        var newArr = [];
		    for(var i = 1; i <= 3; i++) {
		      newArr.push(whoMultipleChoice.pop());
			  }
			  newArr.push(this.question.slice(this.question.indexOf(":")+1));
		    return this.multipleChoiceBuilder(newArr);
	    }
    this.answer = this.question.slice(this.question.indexOf(":")+1);
    this.question = this.question.slice(0,this.question.indexOf(":"));
    return this.multipleChoiceAnswers = whoMultipleChoice;
   }
 }

  var WhenQuestionAndAnswers = {
    multipleChoiceAnswers: [1,3,4,10,11,13],
    multipleChoiceBuilder: function (whenMultipleChoice) {
      if(whenMultipleChoice.length !== 4) {
        whenMultipleChoice = whenMultipleChoice.multipleChoiceAnswers;
      }
      /*Lines 43-51 is using 'The Fisher-Yates' (aka Knuth) shuffle algorithm
      reference: https://github.com/coolaj86/knuth-shuffle*/
		  var currentIndex = whenMultipleChoice.length, temporaryValue, randomIndex;

		  while (0 !== currentIndex) {
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;
			  temporaryValue = whenMultipleChoice[currentIndex];
			  whenMultipleChoice[currentIndex] = whenMultipleChoice[randomIndex];
			  whenMultipleChoice[randomIndex] = temporaryValue;
		  }

      if(whenMultipleChoice.indexOf(this.question.slice(this.question.indexOf(":")+1)) < 0) {
        var newArr = [];
		    for(var i = 1; i <= 3; i++) {
		      newArr.push(whenMultipleChoice.pop());
			  }
			  newArr.push(this.question.slice(this.question.indexOf(":")+1));
		    return this.multipleChoiceBuilder(newArr);
	    }
    this.answer = this.question.slice(this.question.indexOf(":")+1);
    this.question = this.question.slice(0,this.question.indexOf(":"));
	  return this.multipleChoiceAnswers = whenMultipleChoice;
   }
 }

 var questionSet1 = Object.create(WhoQuestionAndAnswers);
 questionSet1.question = 'Who wrote most of the New Testament?:Paul'
 questionSet1.multipleChoiceBuilder(WhoQuestionAndAnswers);

 var questionSet2 = Object.create(WhoQuestionAndAnswers);
 questionSet2.question = 'Who was crucified on the cross upside down because he felt unworthy to be crucified in the way that the Jesus Christ has been?:Peter'
 questionSet2.multipleChoiceBuilder(WhoQuestionAndAnswers);

 var questionSet3 = Object.create(WhoQuestionAndAnswers);
 questionSet3.question = "Who was the person that married a Gentile and saved the Jews from persecution?:Esther"
 questionSet3.multipleChoiceBuilder(WhoQuestionAndAnswers);

 var questionSet4 = Object.create(WhenQuestionAndAnswers);
 questionSet4.question = "How many Apostles were chosen by Jesus Christ?:12"
 questionSet4.multipleChoiceBuilder(WhenQuestionAndAnswers);

 var questionSet5 = Object.create(WhoQuestionAndAnswers);
 questionSet5.question = "Who prayed for wisdom instead of long life, riches or the life of his enemy?:Solomon"
 questionSet5.multipleChoiceBuilder(WhoQuestionAndAnswers);

 var questionSet6 = Object.create(WhoQuestionAndAnswers);
 questionSet6.question = "Amongst the Apostles, who was known to be a physician?:Luke"
 questionSet6.multipleChoiceBuilder(WhoQuestionAndAnswers);

 var questionSet7 = Object.create(WhoQuestionAndAnswers);
 questionSet7.question = "Who had Saul as his birth name?:Paul"
 questionSet7.multipleChoiceBuilder(WhoQuestionAndAnswers);

 var questionSet8 = Object.create(WhenQuestionAndAnswers);
 questionSet8.question = "On which day did God create the sky?:2"
 questionSet8.multipleChoiceBuilder(WhenQuestionAndAnswers);

 var questionSet9 = Object.create(WhoQuestionAndAnswers);
 questionSet9.question = "Who was sold as a slave and later ended up reuniting with his family, saving a nation from starvation?:Joseph"
 questionSet9.multipleChoiceBuilder(WhoQuestionAndAnswers);


    var questions = [questionSet1, questionSet2, questionSet3, questionSet4, questionSet5, questionSet6, questionSet7, questionSet8, questionSet9],
        currentQuestionStatusCounter = 0,
        correctAnswerStatus = 0;


    $('.start-button').click(function(event) {
        event.preventDefault();
        $('#welcome-screen').hide();
        $('#question-answer-box').show();
        $('#correct-incorrect-status').show();
        $('#question-view').show();
        $('#answer-view').show();
        $('#question-status').show();
        shuffleArray(questions);
    });

    function shuffleArray(arr) {
        shuffledArr = arr.sort(function() {
            return Math.round(Math.random());
        });
        questionReceiver(shuffledArr);
    }

    function questionReceiver(questionSet) {
        populateQuesAndAns(questionSet.shift());
    }

    function nextQuestionGenerator() {
      populateQuesAndAns(questions.shift());
    }

    function populateQuesAndAns(eachQuestionObject) {
      currentQuestionStatusCounter++;
        $('#question-status').text(currentQuestionStatusCounter + ' of ' + (questions.length+1));
        $('#correct-incorrect-status').text('You got ' + correctAnswerStatus + ' of ' + (questions.length+1) + ' correct');
        $('#question-view').text(eachQuestionObject.question);
        for (var i = 0; i < eachQuestionObject.multipleChoiceAnswers.length; i++) {
            $('.choice' + i).text(eachQuestionObject.multipleChoiceAnswers[i]);
        }
        answerChecker(eachQuestionObject.answer)
    }

    function answerChecker(answer) {
        $('#multiple-choice li').click(function() {
            if ($(event.target).text() == answer) {
                correctAnswerStatus++;
                $('#question-answer-box').hide();
                $('#correct-incorrect-status').hide();
                $('#question-status').hide();
                $('#question-view').hide();
                $('#answer-view').hide();
                // $('#result-screen').show().text('You Got It');
                $('#result-screen').show().html('<h2>You\'re correct</h2><a href="" class="next-question-button">Next Question</a>');
            } else {
                $('#question-answer-box').hide();
                $('#correct-incorrect-status').hide();
                $('#question-status').hide();
                $('#question-view').hide();
                $('#answer-view').hide();
                $('#result-screen').show().html('<h2>Sorry, the correct answer is ' + answer + '</h2><a href="" class="next-question-button">Next Question</a>');
            }
        });
    }

    $('.next-question-button').click(function() {
      // event.preventDefault();
      nextQuestionGenerator();
      $('#result-screen').hide();
      $('#question-answer-box').show();
      $('#correct-incorrect-status').show();
      $('#question-view').show();
      $('#answer-view').show();
      $('#question-status').show();
    });

});
