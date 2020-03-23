import React from 'react'
import classes from './FinishedQuiz.module.scss'

const FinishedQuiz = props => {
    const success =  Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') {
            total ++;
        }
        return total;
    }, 0)
       return (
        <div className={classes['FinishedQuiz']}>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                        const cls = [
                            'fa',
                            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                            classes[props.results[quizItem.id]]
                        ]
                        return (
                            <li>
                                <strong>{index + 1}</strong>.&nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')} />
                            </li>
                        )
                    })
                }
            </ul>

            <p>Success {success} from {props.quiz.length}</p>
            <div>
                <button>Repeat</button>
            </div>
        </div>)
}

export default FinishedQuiz