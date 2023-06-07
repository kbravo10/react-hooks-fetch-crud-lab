import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [question, setQues] = useState([]);
  useEffect(
    () =>
      fetch("http://localhost:4000/questions")
        .then((res) => res.json())
        .then((questions) => setQues((question) => (question = questions))),
    []
  );

  function handleDeleteQuestion(id) {
    const newQuestionList = question.filter((ques) => {
      if (ques.id === parseInt(id)) {
        return false;
      }
      return true;
    });
    setQues(newQuestionList);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {question.map((ques, index) => {
          return (
            <QuestionItem
              key={index}
              question={ques}
              onDeleteQuestion={handleDeleteQuestion}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
