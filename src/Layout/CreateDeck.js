import React, { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import {createDeck, readDeck, listDecks} from "../utils/api/index.js"

/* url is /decks/new
This component creates a new deck by asking the user for 2 inputs:
    Name of the new deck and a brief description
When the submit button is clicked, move them to the Deck Screen
    /decks/:deckId
When Cancel is clicked, move them to the home screen
*/

function CreateDeck() {
    const params = useParams()
    // console.log("params", params)
    const deckId = params.deckId
    const [decks, setDecks] = useState([])
    const [currentDeck, setCurrentDeck] = useState(null)
    const [deckName, setDeckName] = useState("")
    const [deckDescription, setDeckDescription] = useState("")

    const handleDeckNameChange = (event)=>setDeckName(event.target.value)
    const handleDeckDescriptionChange = (event)=> setDeckDescription(event.target.value)
    const handleSubmit = (event) =>{
      event.preventDefault()
      console.log("Submitted lmao", deckName, deckDescription)
      setDeckName("")
      setDeckDescription("")
    }

    const createDeck = (newDeck) => setDecks((currentDecks)=>[...currentDecks, newDeck])

    useEffect(()=>{
        const ac = new AbortController()
        async function listDeck(){            
            try{
                const data = await listDecks(ac.signal)
                setDecks(data)
            }catch(error){
                console.log(error)
            }
        }
        listDeck()
        return () => ac.abort()
    }, [])
    // console.log("list of decks: ", decks)


  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

    <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={handleDeckNameChange}
            placeholder="Name of the Deck"
          />

          <br></br>

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            onChange={handleDeckDescriptionChange}
            placeholder="A brief description of the Deck"
          />

          <br></br>
          <Link to="/">
            <button className="btn btn-secondary" value="cancel">
              Cancel
            </button>
          </Link>

            <button type="submit" className="btn btn-primary" value="submit">
              Submit
            </button>

        </div>
      </form>

      {/* /////////////////////////// if the value is submit, link to the decks screen /decks/:deckId. Otherwise, link to home */}
    </React.Fragment>
  );
}

export default CreateDeck;
