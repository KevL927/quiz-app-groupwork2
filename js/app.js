$(document).ready(function() {

  var whoQuestionAndAnswer = {
    question: "Who was ",
    multipleChoice: ['Esther', 'Luke', 'John', 'Solomon', 'Moses', 'Luke', 'Goliath', 'Job',
     'Isaiah', 'Abraham', 'Aaron', 'Barnabas', 'Hannah', 'Simon', 'Thomas'],
     multipleChoiceBuilder: function () {
        var finalMultipleChoices = [];
        this.multipleChoice.push(whoQuestionAndAnswer.multipleChoice.shift());
        this.multipleChoice.push(whoQuestionAndAnswer.multipleChoice.shift());
        this.multipleChoice.push(this.answer);
        this.multipleChoice.push(whoQuestionAndAnswer.multipleChoice.shift());
        // shuffledArr = arr.sort(function() {
        //     return Math.round(Math.random());
        //});
        //shuffle(finalMultipleChoices);
      }
  };

  // var numberQuestionAndAnswer = {
  //   question: "How many ",
  //   multipleChoice: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  // };

  var questionSet1 = {
      question: whoQuestionAndAnswer.question.slice(0,4) + "wrote most of the New Testament?",
      multipleChoice: [],
      answer: 'Paul'
  };

  Object.setPrototypeOf(questionSet1, whoQuestionAndAnswer);

  var questionSet2 = Object.create(whoQuestionAndAnswer);

  questionSet2 = {
      question: whoQuestionAndAnswer.question.slice(0,4) + "was crucified on the cross upside down because he felt unworthy to be crucified in the way that the Jesus Christ has been?",
      multipleChoice: [],
      answer: 'Peter'
  };

  var questionSet3 = Object.create(whoQuestionAndAnswer);

  questionSet3 = {
      question: whoQuestionAndAnswer.question.slice(0,4) + "was the person that married a Gentile and saved the Jews from persecution?",
      multipleChoice: [],
      answer: 'Esther'
  };

  var questionSet4 = Object.create(whoQuestionAndAnswer);

  questionSet4 = {
      question: whoQuestionAndAnswer.question.slice(0,4) + "prayed for wisdom instead of long life, riches or the life of his enemy?",
      multipleChoice: [],
      answer: 'Solomon'
  };

  var questionSet5 = Object.create(whoQuestionAndAnswer);

  questionSet5 = {
      question: whoQuestionAndAnswer.question.slice(0,4) + "was known to be a physician among the apostles?",
      multipleChoice: [],
      answer: 'Luke'
  };

    var questions = [questionSet1, questionSet2, questionSet3, questionSet4, questionSet5];

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
        var nextQuestionSet = questionSet.shift();
        nextQuestionSet.multipleChoiceBuilder();
        populateQuesAndAns(nextQuestionSet);
    }

    function populateQuesAndAns(eachQuestionObject) {
        $('#question-view').text(eachQuestionObject.question);
        for (var i = 0; i < eachQuestionObject.multipleChoice.length; i++) {
            $('.choice' + i).text(eachQuestionObject.multipleChoice[i]);
        }
        answerChecker(eachQuestionObject.answer)
    }

    function answerChecker(answer) {
        $('#multiple-choice li').click(function(event) {

            if ($(event.target).text() == answer) {
                $('#question-answer-box').hide();
                $('#correct-incorrect-status').hide();
                $('#question-view').hide();
                $('#answer-view').hide();
                $('#result-screen').show().append('<h2>You Got It</h2>');
            } else {
                $('#question-answer-box').hide();
                $('#correct-incorrect-status').hide();
                $('#question-view').hide();
                $('#answer-view').hide();
                $('#result-screen').show().append('<h2>Sorry, the correct answer is ' + answer + '</h2>');
            }
        });
    }

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
}

});
