import React, {useState, useEffect} from "react"
// import { Link, Route, useParams } from "react-router-dom"



function StudyCard({currentDeck}){
    // console.log("currentDeeck", currentDeck.cards)

    const [showAnswer, setShowAnswer] = useState(false)

    const handleFlip = ()=> {
        setShowAnswer(!showAnswer) 
    }


    let numOfCards = currentDeck.cards.length
    // {if (numOfCards < 3){
    //     <h3>Not enough cards</h3>
    // }}
    return(
        <React.Fragment>



        {currentDeck.cards.map((card, index)=>{
            // console.log("card:", card)
            // console.log("index: ", index)
            return(
                <div className="card" key={card.id}>
                <div className="card-body">
                <h5 className="card-title">Card {index + 1} of {currentDeck.cards.length}</h5>
                    { showAnswer ? <p className="card-text">{card.back}</p> :
                     <p className="card-text">{card.front}</p>}
                    <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                    { showAnswer && <button className="btn btn-primary">Next</button>}
                </div>
            </div>
            )
        })}
        
        </React.Fragment>


    )
}
export default StudyCard