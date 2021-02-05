import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = questionItem.correct_answer
        const options = [...questionItem.incorrect_answers, answer]

            // individual flash card element
          return  {
            id: `${index}-${Date.now()}`,
            question: questionItem.question,
            answer: answer,
            //          50% of the time we have a negative number and 50% positive number
            options: options.sort(() => Math.random() - .5)
          }
      }))
      console.log('this is res!', res)
      console.log('this is res.data', res.data)
    })
  }, [])






  return (
    <FlashcardList flashcards={flashcards}/>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: 'Question 2?',
    answer: 'Answer',
    options: [
      'Answer',
      'Answer 1',
      'Answer 2',
      'Answer 3'
    ]
  }
]

export default App;
