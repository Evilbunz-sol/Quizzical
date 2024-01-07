import React from "react"

function Intro(props) {
   return (
       <div className="bg">
            <h1 className="main-title"> Quizzical </h1>
            <h3 className="sub-title"> Some description if needed </h3>
            <button className="btn-styling" onClick={props.handleClick}> Start Quiz </button>
       </div>
   ) 
}

export default Intro