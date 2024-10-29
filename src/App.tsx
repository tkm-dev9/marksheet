import { useEffect, useState } from 'react'
import './App.css'
import RadioGroup from './components/RadioGroup';
import { Element, Link } from "react-scroll";

function App() {
  const [inputs, setInputs] = useState<Record<string, number | null>>({});
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState<number[]>([]);
  const calculateResults = () => {
    let count = 0;
    const incorrect: number[] = [];

    for (let index = 0; index < 80; index++) {
      const input = inputs[`input-${index}`];
      const answer = answers[`answer-${index}`];

      if (input !== undefined && input !== null) {
        if (input === answer) {
          count++;
        } else {
          incorrect.push(index + 1);
        }
      }
    }

    return { count, incorrect };
  }
  useEffect(() => {
    const { count, incorrect } = calculateResults();
    setCorrectCount(count);
    setIncorrectQuestions(incorrect);
  }, [inputs, answers]);

  const handleInputChange = (groupId: string, value: number) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [groupId]: value
    }));
  }

  const handleAnswerChange = (groupId: string, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [groupId]: value
    }))
  }

  const isCorrect = (input: number | null, answer: number | null) => {
    return input === answer;
  }

  const numberToKana = (num: number | null) => {
    const options: Record<number, "ア" | "イ" | "ウ" | "エ"> = {
      1: "ア",
      2: "イ",
      3: "ウ",
      4: "エ"
    }
    return num ? options[num] : "未回答";
  }

  return (
    <>
      <div className="fixed-info">
        <h2>正解数: {correctCount}</h2>
        <h2>
          正答率: <br />
          {(correctCount / 60 * 100).toFixed(1)}%/60問<br />
          {(correctCount / 80 * 100).toFixed(1)}%/80問</h2>
        <h2>
          間違った問題番号: {" "}
          {incorrectQuestions.map((q, index) => (
            <span>
              <Link key={q} to={`question-${q}`} smooth={true} duration={500} className="scroll-link">
                {q}
              </Link>
              {index < incorrectQuestions.length - 1 && ', '}
            </span>
          ))}</h2>
      </div>
      <div className="wrapper">
        <div className="left">
          {Array.from({ length: 80 }).map((_, index) => (
            <Element name={`question-${index + 1}`}>
              <div className="box">
                <h3>問{index + 1}</h3>
                <RadioGroup
                  key={`input-${index}`}
                  groupId={`input-${index}`}
                  selectedValue={inputs[`input-${index}`]}
                  onChange={handleInputChange}
                />
                <p>
                  選択したもの:
                  <span className="bigTxt">「{numberToKana(inputs[`input-${index}`])}」</span>
                </p>
              </div>
            </Element>
          ))}
        </div>
        <div className="right">
          {Array.from({ length: 80 }).map((_, index) => (
            <div className="box">
              <h3>答{index + 1}</h3>
              <div className="box-contents">
                <div className="box-inner">
                  <RadioGroup
                    key={`answer-${index}`}
                    groupId={`answer-${index}`}
                    selectedValue={answers[`answer-${index}`]}
                    onChange={handleAnswerChange}
                  />
                  <p>
                    答え:
                    <span className="bigTxt">「{numberToKana(answers[`answer-${index}`])}」</span>
                  </p>
                </div>
                <div className="resultArea">
                  結果:
                  {inputs[`input-${index}`] === undefined
                    || inputs[`input-${index}`] === null
                    || answers[`answer-${index}`] === undefined
                    || answers[`answer-${index}`] === null
                    ? <span className="result">未回答</span>
                    : isCorrect(inputs[`input-${index}`], answers[`answer-${index}`])
                      ? <span className="result correct">✅ 正解"</span>
                      : <span className="result incorrect">❌ 不正解</span>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </>
  )
}

export default App
