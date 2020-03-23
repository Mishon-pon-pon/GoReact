import React, { Component } from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        Results: {},
        isFinished: true,
        ActiveQuestionNumber: 0,
        AnswerState: null,
        quiz: [
            {
                question: 'What is sky color?',
                id: 1,
                rightAnswer: 1,
                answers: [
                    { text: 'blue', id: 1 },
                    { text: 'green', id: 2 },
                    { text: 'pink', id: 3 },
                    { text: 'yellow', id: 4 }
                ]
            },
            {
                question: 'What was SPB born?',
                id: 2,
                rightAnswer: 2,
                answers: [
                    { text: '1700', id: 1 },
                    { text: '1703', id: 2 },
                    { text: '1750', id: 3 },
                    { text: '1712', id: 4 }
                ]
            }
        ]
    }

    onAnswerClick = (answerId) => {
        if(this.state.AnswerState) {
            if(this.state.AnswerState[answerId] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.ActiveQuestionNumber];
        const results = this.state.Results;

        if (question.rightAnswer === answerId) {
            if(!results[answerId]) {
                results[answerId] = 'success'
            }

            this.setState({
                AnswerState: { [answerId]: 'success' },
                Results: results
            });
            const timeout = window.setTimeout(() => {
                this.setState({
                    AnswerState: null
                })
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        ActiveQuestionNumber: this.state.ActiveQuestionNumber + 1,
                    })
                }
                window.clearTimeout(timeout);
            }, 1000)
        } else {
            results[answerId] = 'error'
            this.setState({
                Results: results,
                AnswerState: { [answerId]: 'error' }
            });
        }

    }

    isQuizFinished() {
        return this.state.ActiveQuestionNumber + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes['Quiz']}>
                <div className={classes['QuizWrapper']}>

                    <h1>Answer on question.</h1>
                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.Results}
                            quiz={this.state.quiz}
                        />
                        : <ActiveQuiz
                            answers={this.state.quiz[this.state.ActiveQuestionNumber].answers}
                            question={this.state.quiz[this.state.ActiveQuestionNumber].question}
                            onAnswerClick={this.onAnswerClick}
                            questionsLength={this.state.quiz.length}
                            questionNumber={this.state.ActiveQuestionNumber + 1}
                            state={this.state.AnswerState}
                        />
                    }
                    
                </div>
            </div>
        )
    }
}

export default Quiz;