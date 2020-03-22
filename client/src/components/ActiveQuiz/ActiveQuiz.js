import React from 'react'
import classes from './ActiveQuiz.module.scss'
import AnswersList from './AnswerList/AnswersList'

const ActiveQuiz = props => (
    <div className={classes['ActiveQuiz']}>
        <p className={classes['Question']}>
            <span>
                <strong>{props.questionNumber}.</strong>&nbsp;
                {props.question}
            </span>

            <small>{props.questionNumber} from {props.questionsLength}</small>
        </p>

        <AnswersList
            answers={props.answers}
            state={props.state}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz