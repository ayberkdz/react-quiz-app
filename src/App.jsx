import { Component } from 'react';
import './App.css';

const questions = [
  {
    question: 'Hangi gezegen Güneş Sistemi\'nde üçüncü sıradadır?',
    options: ['Mars', 'Jüpiter', 'Dünya', 'Venüs'],
    correct: 'Dünya'
  },
  {
    question: 'Hangi renk sembolik olarak huzuru temsil eder?',
    options: ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı'],
    correct: 'Mavi'
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      selectedOption: '',
      answeredCorrectly: false,
      showNextButton: false,
      totalCorrect: 0,
      quizCompleted: false
    };
  }

  handleOptionClick = (option) => {
    const { correct } = questions[this.state.currentQuestionIndex];
    const answeredCorrectly = option === correct;

    this.setState({
      selectedOption: option,
      answeredCorrectly,
      showNextButton: true,
      totalCorrect: answeredCorrectly ? this.state.totalCorrect + 1 : this.state.totalCorrect
    });
  };

  handleNextQuestion = () => {
    const nextQuestionIndex = this.state.currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      this.setState({
        currentQuestionIndex: nextQuestionIndex,
        selectedOption: '',
        answeredCorrectly: false,
        showNextButton: false
      });
    } else {
      this.setState({ quizCompleted: true });
    }
  };

  handleRestartQuiz = () => {
    this.setState({
      currentQuestionIndex: 0,
      selectedOption: '',
      answeredCorrectly: false,
      showNextButton: false,
      totalCorrect: 0,
      quizCompleted: false
    });
  };

  render() {
    const {
      currentQuestionIndex,
      selectedOption,
      answeredCorrectly,
      showNextButton,
      totalCorrect,
      quizCompleted
    } = this.state;

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="App" style={ showNextButton ? (answeredCorrectly ? { backgroundColor: 'green' } : { backgroundColor: 'red' }) : {backgroundColor: 'transparent'} }>
        <h1>Quiz Uygulaması</h1>
        {quizCompleted ? (
          <div>
            <h2>Quiz Tamamlandı!</h2>
            <p>Toplam Doğru: {totalCorrect}</p>
            <p>Doğru Oranı: {((totalCorrect / questions.length) * 100).toFixed(2)}%</p>
            <p>
              {totalCorrect === questions.length
                ? 'Harika iş yaptınız!'
                : totalCorrect >= questions.length / 2
                ? 'İyi iş çıkardınız!'
                : 'Daha fazla çalışmalısınız.'}
            </p>
            <button onClick={this.handleRestartQuiz}>Quizi Yeniden Başlat</button>
          </div>
        ) : (
          <div>
            <h2>Soru {currentQuestionIndex + 1}</h2>
            <p>{currentQuestion.question}</p>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option ${selectedOption === option ? (answeredCorrectly ? 'correct' : 'wrong') : ''}`}
                  disabled={selectedOption !== ''}
                  onClick={() => this.handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {showNextButton && (
              <button className="next-button" onClick={this.handleNextQuestion}>
                Sonraki Soru
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;