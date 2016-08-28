$(document).ready(function() {

  var WhoQuestionAndAnswers = {
    multipleChoiceAnswers: ['Esther','Luke','John','Solomon','Moses','Goliath','David','Job','Isaiah','Abraham','Aaron','Adam','Eve','Aaron','Barnabas','Hannah','Thomas','Timothy','Philip','Stephen','Mark'],
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
		    for(var i = 0; i < 3; i++) {
		      newArr.push(whoMultipleChoice.pop());
			  }
			  newArr.push(this.question.slice(this.question.indexOf(":")+1))
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
		    for(var i = 0; i < 3; i++) {
		      newArr.push(whenMultipleChoice.pop());
			  }
			  newArr.push(this.question.slice(this.question.indexOf(":")+1))
		    return this.multipleChoiceBuilder(newArr);
	    }
    this.answer = this.question.slice(this.question.indexOf(":")+1);
    this.question = this.question.slice(0,this.question.indexOf(":"));
	  return this.multipleChoiceAnswers = whenMultipleChoice;
   }
 }

 var questionSet1 = Object.create(WhoQuestionAndAnswers);
 questionSet1.question = 'Who wrote most of the New Testament:Paul'
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


    var questions = [questionSet1, questionSet2, questionSet3, questionSet4, questionSet5, questionSet6, questionSet7, questionSet8, questionSet9];

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

    function populateQuesAndAns(eachQuestionObject) {
      console.log(eachQuestionObject.question);
        $('#question-view').text(eachQuestionObject.question);
        for (var i = 0; i < eachQuestionObject.multipleChoiceAnswers.length; i++) {
            $('.choice' + i).text(eachQuestionObject.multipleChoiceAnswers[i]);
        }
        answerChecker(eachQuestionObject.answer)
    }

    function answerChecker(answer) {
        $('#multiple-choice li').click(function() {
          var counter = 0;
            if ($(event.target).text() == answer) {
                $('#question-answer-box').hide();
                $('#correct-incorrect-status').hide();
                $('#question-view').hide();
                $('#answer-view').hide();
                $('#result-screen').show().html('<h2>You Got It</h2>');
                $('#result-screen').html('<a href="" class="next-question-button">Next Question</a>')
                counter++;
            } else {
                $('#question-answer-box').hide();
                $('#correct-incorrect-status').hide();
                $('#question-view').hide();
                $('#answer-view').hide();
                $('#result-screen').show().html('<h2>Sorry, the correct answer is ' + answer + '</h2>');
            }
        });
    }

    function nextQuestionGenerator() {
      populateQuesAndAns(questions.pop());
    }

    $('.next-question-button').click(function(event) {
      var counter = 1;
      event.preventDefault();
      $('#result-screen').hide();
      $('#question-answer-box').show();
      $('#correct-incorrect-status').show();
      $('#question-view').show();
      $('#answer-view').show();
      $('#question-status').show();
      counter++;
      nextQuestionGenerator();
    });

});
