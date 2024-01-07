import React from "react"
import Intro from "./Components/Intro.js"
import Trivia from "./Components/Trivia.js"

function App() {
    const [startQuiz, setStartQuiz] = React.useState(false)
    
    function startGame() {
        setStartQuiz(true)
    }
    
    
    return (
        <div className="body-style">
            {startQuiz ? 
                <Trivia /> : 
                <Intro handleClick={startGame}
            />}
        </div>
    )
}

export default App

