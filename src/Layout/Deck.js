import React, {useEffect, useState} from "react"
import { Link, useParams, useRouteMatch, useHistory} from "react-router-dom"
import { readDeck, deleteDeck, readCard, deleteCard } from "../utils/api"



function Deck(){
    const params = useParams()
    const history = useHistory()
    const deckId = params.deckId



    const [currentDeck, setCurrentDeck] = useState(null)
    


    useEffect(()=>{
        const ac = new AbortController()
        async function findDeck(){            
            try{
                const data = await readDeck(deckId, ac.signal)
                setCurrentDeck(data)
            }catch(error){
                console.log(error)
            }
        }
        findDeck()
        return () => ac.abort()
    }, [deckId])


    const handleDeleteDeck = async (id) => {
        const result = window.confirm("Are you sure you want to delete this deck?")
        if (result){
            const ac = new AbortController()
            try{
                await deleteDeck(deckId, ac.signal)
                history.push("/")
            }catch(error){
                console.log(error)
            }
        }
    }

    const handleDeleteCard = async (event) => {
        const cardId = event.target.id
        const result = window.confirm("Are you sure you want to delete this card?")
        if (result){
            const ac = new AbortController()
            try{
                await deleteCard(cardId, ac.signal)
                // window.location.reload(false)
                const response = await readDeck(deckId, ac.signal)
                setCurrentDeck(response)
            }catch(error){
                console.log(error)
            }
        }
    }

    // console.log(currentDeck)
    if (!currentDeck){
        return <p>Loading</p>
    } else{
        return (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{currentDeck.name}</li>
                    </ol>
                </nav>
                <h3>{currentDeck.name}</h3>
                <p>{currentDeck.description}</p>
                <div>
                <Link to={`/decks/${deckId}/edit`}><button className="btn btn-secondary" >Edit</button></Link>
                <Link to={`/decks/${deckId}/study`}><button className="btn btn-primary" >Study</button></Link>
                <Link to={`/decks/${deckId}/cards/new`}><button className="btn btn-primary" >Add Cards</button></Link>
                <button className="btn btn-danger" onClick={handleDeleteDeck} >Delete</button>
                </div>
                
                <br/>
                <div>
        <h3>Cards</h3>
        {currentDeck.cards.map((card, index)=>{
            return(
                <div className="card" key={card.id}>
                <div className="card-body">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="card-text">{card.front}</p> 
                        </div>
                        <div className="col">
                            <p className="card-text">{card.back}</p>
                            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button className="btn btn-secondary">Edit</button></Link>
                            <button id={card.id} className="btn btn-danger" onClick={handleDeleteCard} >Delete</button>
                        </div>
                    </div>
                </div>

                </div>
            </div>
            )
        })}
                </div>
            </React.Fragment>
        )
    }


}


export default Deck