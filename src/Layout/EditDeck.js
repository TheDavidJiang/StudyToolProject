import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {readDeck} from "../utils/api/index.js"

function EditDeck(){
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

    }, [])

    console.log("currentdecjk: ", currentDeck)
    if (currentDeck){
        return (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/">{currentDeck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                    </ol>
                </nav>
       <div>
            <h2>Edit Deck</h2>
        </div>
        <div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={handleDeckNameChange}
            placeholder={currentDeck.name}
          />

          <br></br>

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            onChange={handleDeckDescriptionChange}
            placeholder={currentDeck.description}
          />

          <br></br>
          <Link to={`/decks/${currentDeck.id}`}>
            <button className="btn btn-secondary" value="cancel">
              Cancel
            </button>
          </Link>

            <button type="submit" className="btn btn-primary" value="submit">
              Submit
            </button>

        </div>
      </form>     
        </div>
        </React.Fragment>
    )
    }else{
        return "Loading..."
    }

}

export default EditDeck