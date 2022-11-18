import React, { Component } from 'react'
import { QuizData } from './QuizData'
import "./style.css"


class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userAnswer: null,
            currentIndex: 0,
            options: [],
            quizEnd: false,
            score: 0,
            question: [],
            disabled: true
        }
    }

    loadingQuiz = () => {
        const { currentIndex } = this.state;
        this.setState(() => {
            return {
                question: QuizData[currentIndex].question,
                options: QuizData[currentIndex].options,
                answer: QuizData[currentIndex].answer
            }
        })
    }

    nextQuestionHandler = () => {
        const { userAnswer, answer, score } = this.state
        this.setState({
            currentIndex: this.state.currentIndex + 1,
            userAnswer: null
        })
        if (userAnswer === answer) {
            this.setState({
                score: score + 1
            })
        }


    }

    componentDidMount() {
        this.loadingQuiz()
    }

    checkCorrectAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled: false
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentIndex } = this.state;
        if (this.state.currentIndex != prevState.currentIndex) {
            //load a new question
            this.setState(() => {
                return {
                    question: QuizData[currentIndex].question,
                    options: QuizData[currentIndex].options,
                    answer: QuizData[currentIndex].answer
                }
            })
        }
    }


    finishHandler = () => {
        if (this.state.currentIndex === QuizData.length - 1) {
            this.setState({
                quizEnd: true
            })
        }
    }

    render() {
        const { question, options, currentIndex, userAnswer, quizEnd } = this.state

        if (quizEnd) {
            return (
                <div>
                    <h1>Your Result:</h1>
                    <h3> Your final Score is {this.state.score} Out of Five </h3>

                </div>
            )
        }
        return (
            <div>
                <h1>{question}</h1>
                <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
                {
                    options.map(option =>
                        <p key={option.id} className={`options ${userAnswer === option ? "selected" : null}`}
                            onClick={() => this.checkCorrectAnswer(option)}
                        >
                            {option}
                        </p>)
                }


                {currentIndex < QuizData.length - 1 &&
                    <button disabled={this.state.disabled} onClick={this.nextQuestionHandler}>

                        Next </button>}


                {currentIndex === QuizData.length - 1 &&
                    <button onClick={this.finishHandler} disabled={this.state.disabled}>
                        Finish
                    </button>}

            </div>

        )
    }

}

export default Quiz