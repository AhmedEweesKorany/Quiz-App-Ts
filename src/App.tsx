import React, {  useState } from "react"
import QuestionCard from "./Components/QuestionCard"
import { Diff, fetchQuizData, QuestionState } from "./Api"
import { GlobalStyle, Wrapper } from "./App.style";


export type userAnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 15
function App() {
  // handle application states 
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [userAnswers, setUserAnswers] = useState<userAnswerObj[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)
  const startQuiz = async () => {

    setLoading(true)
    const quizQuestions = await fetchQuizData(TOTAL_QUESTIONS, Diff.EASY)
    setQuestions(quizQuestions)
    setGameOver(false)
    setLoading(false)
  }


  if (questions?.length) {
    console.log(questions)
  }
  // check answer 
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer
      if (correct){
        setScore(score + 1)
      }

      const answerObject : userAnswerObj = {
        answer,
        correct,
        question: questions[number].question,
        correctAnswer: questions[number].correct_answer
      }

      setUserAnswers((prev)=>[...prev,answerObject])
    }
  }

  // next question 
  const nextQuestion = () => {

    const nextQues = number + 1
    if(nextQues == TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(nextQues)
    }
  }


  return (<>
  <GlobalStyle/>
  <Wrapper>

    <div className="App">
      <h1>Simple Quize</h1>

      {gameOver || userAnswers.length == TOTAL_QUESTIONS ? (
        
        <button className="start" onClick={startQuiz}>
          Start Now !
        </button>

) : null}

      {!gameOver && <p className="score">
        Score: {score}
      </p>}

      {loading && <p>Loading Question .... </p>
      }

      {!loading && !gameOver && <QuestionCard

questionNm={number + 1}
totalQuestions={TOTAL_QUESTIONS}
question={questions[number].question}
answers={questions[number].answers}
userAnswer={userAnswers ? userAnswers[number] : undefined}
callback={checkAnswer}
/>}

      {!loading && !gameOver && userAnswers.length == number + 1 && number != TOTAL_QUESTIONS - 1 && <button className="next" onClick={nextQuestion}>Next Question</button>
      }
    </div>
      </Wrapper>
  </>)
}

export default App
