import React, {useState} from "react"
import { Link, useHistory } from "react-router-dom"



function StudyCard({currentDeck, deckId}){
    // console.log("currentDeeck", currentDeck.cards)

    const [showAnswer, setShowAnswer] = useState(false)
    const [index, setIndex] = useState(0)
    const card = currentDeck.cards[index]
    const history = useHistory()

    const handleNext = () =>{
        if (index + 1 < currentDeck.cards.length){
            setIndex(index + 1)
            setShowAnswer(false)
        }else{
            const result = window.confirm("Restart cards? \n\n Click cancel to return to the home page.")
            if (result){
                setIndex(0)
            }else{
                history.push("/")
            }
        }
        
    }


    const handleFlip = ()=> {
        setShowAnswer(!showAnswer) 
    }

// when next is clicked, then change the index of the card to the next one
    let numOfCards = currentDeck.cards.length
    if (numOfCards < 3){
        return (
            <React.Fragment>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {numOfCards} cards in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`}><button>Add Cards</button></Link>
            </React.Fragment>
        )
    }else{
        return(
            <React.Fragment>
                
                <div className="card" key={card.id}>
                <div className="card-body">
                <h5 className="card-title">Card {index + 1} of {currentDeck.cards.length}</h5>
                    { showAnswer ? <p className="card-text">{card.back}</p> :
                    <p className="card-text">{card.front}</p>}
                    <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                    { showAnswer && <button className="btn btn-primary" onClick={handleNext}>Next</button>}
                </div>
            </div>
                    
               
            </React.Fragment>
        )
    }
    
}
export default StudyCard