import React from "react"
import he from "he"

function Trivia(props) {
    const [triviaGame, setTriviaGame] = React.useState([])
    const [selectedAnswer, setSelectedAnswer] = React.useState({})
    const [btnDisabled, setBtnDisabled] = React.useState(false)
    const [checkAnswer, setCheckAnswer] = React.useState([])
    const [errorMessage, setErrorMessage] = React.useState("")
    const [newGame, setNewGame] = React.useState(false)
    const [fetchTrigger, setFetchTrigger] = React.useState(0)
    
    React.useEffect( () => {
        fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
            .then(res => res.json())
            .then(data => {
                const requiredApiFields = data.results.map((apiField, index) => {
                    const allAnswers = [...apiField.incorrect_answers, apiField.correct_answer]
                    const decodedAnswers = allAnswers.map(answer => he.decode(answer))
                    decodedAnswers.sort(() => Math.random() - 0.5)
                    
                    return {
                        id: index,
                        question: he.decode(apiField.question),
                        allAnswers: decodedAnswers,
                        correctAnswer: he.decode(apiField.correct_answer),
                    }
                })
                setTriviaGame(requiredApiFields)

            })
    }, [fetchTrigger])
    
    
    function btnClick(questionId, answer) {
        setSelectedAnswer(prevAnswer => {
            return {
                ...prevAnswer,
                [questionId]: answer
            }
        })
    }

    function checkResult() {
        const allAnswered = triviaGame.every(triviaItem => selectedAnswer[triviaItem.id] !== undefined)
        if (!allAnswered) {
            setErrorMessage("Please answer all the questions!")
            return
        }

        const newCheckAnswer = triviaGame.map(triviaItem => {
            return {
                id: triviaItem.id,
                isCorrect: selectedAnswer[triviaItem.id] === triviaItem.correctAnswer
            }
        })
        
        setCheckAnswer(newCheckAnswer)
        setBtnDisabled(true)
        setErrorMessage("")
        setNewGame(true)
    } 
    
    const correctAnswerCount = checkAnswer.filter(answer => answer.isCorrect).length

    function startNewGame() {
        setSelectedAnswer({})
        setBtnDisabled(false)
        setCheckAnswer([])
        setErrorMessage("")
        setNewGame(false)
        
        setFetchTrigger(prevFetchTrigger => prevFetchTrigger + 1)
    }


    
    
    const triviaElements = triviaGame.map(triviaItem => {    
        return (
            <section key={triviaItem.id}>
                <h3 className="question"> {triviaItem.question} </h3>
                {triviaItem.allAnswers.map(answer => {
                    let answerStatus = checkAnswer.find(item => item.id === triviaItem.id);
                    let buttonClass = "options";
                    
                if (btnDisabled && answerStatus) {
                    if (answer === triviaItem.correctAnswer) {
                        buttonClass += " correct-answer"
                    } else if (answer === selectedAnswer[triviaItem.id]) {
                        buttonClass += " incorrect-answer"
                    }
                } else if (selectedAnswer[triviaItem.id] === answer) {
                    buttonClass += " selected-answer"
                }
                
                return (
                    <button 
                        key={answer}
                        className={buttonClass}
                        onClick={() => btnClick(triviaItem.id, answer)}
                        disabled={btnDisabled}> 
                    {answer} </button> )
                })} 
                <hr className="break-line" />
            </section>
        )
    })    


    return (
        <div className="trivia-page">
            {triviaElements}
            
            <p className="error-message">{errorMessage}</p>
            
            {!newGame && 
            <button 
                onClick={checkResult} 
                className="btn-styling trivia-btn"> 
                Check Answer 
            </button>}
            
            {newGame && 
            <div className="play-again">
                <p className="score-text"> You scored {correctAnswerCount}/5 correct answers </p>
                <button 
                    className="btn-styling play-again-btn"
                    onClick={startNewGame}> 
                    Play Again 
                </button>
            </div>}    
        </div>
    )
}

export default Trivia