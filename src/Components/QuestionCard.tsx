import React from 'react';
// Types
import { userAnswerObj } from '../App';
// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.style';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: userAnswerObj | undefined;
  questionNm: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNm,
  totalQuestions,
}) => (
  <Wrapper>
    <p className='number'>
      Question: {questionNm} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          $correct={userAnswer?.correctAnswer === answer}
          $userClicked={userAnswer?.answer === answer}
        >
          <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;