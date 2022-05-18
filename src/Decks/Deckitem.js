import React, {useState, useEffect} from "react"
import { Link, useParams, useHistory } from "react-router-dom"
// import { readDeck } from "../utils/api"
// import Deck from "../Layout/Deck"

export default function DeckItem({ deck }){
    const history = useHistory()
    // console.log("deck: ", deck)

    // const params = useParams()
    // console.log("params", params)

    const params = useParams()
    // console.log("params", params)
    const deckId = params.deckId

    const handleDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this deck?")
        if (result){
            return (
                history.push("/")
            )
        }
    }



    return (
        // <li>
        //     <p>{deck.name}</p>
        //     <p>{deck.description}</p>
        //     <p>{deck.cards.length}</p>

        // </li>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p>{deck.description}</p>
                {deck.cards.length ? <p>{deck.cards.length} cards left</p> : <p>0 cards left</p>}
                
            </div>
            <div>
                <Link to={`/decks/${deck.id}`}><button className="btn btn-secondary">View</button></Link>
                
                <Link to={`/decks/${deck.id}/study`}><button className="btn btn-primary">Study</button></Link>

                <Link to=""><button className="btn btn-danger" onClick={handleDelete}>Delete</button></Link>
            </div>

        </div>
    )
}