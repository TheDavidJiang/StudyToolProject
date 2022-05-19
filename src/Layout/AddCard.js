import React, {useEffect, useState} from "react"
import { Link, useParams, useRouteMatch} from "react-router-dom"
import { readDeck, createCard } from "../utils/api"

// should probably use the updateDeck function from index.js

function AddCard(){
    const params = useParams()
    const deckId = params.deckId

    const [currentDeck, setCurrentDeck] = useState(null)
    const [frontSide, setFrontSide] = useState("")
    const [backSide, setBackSide] = useState("")

    

    const handleFrontSideChange = (event)=> setFrontSide(event.target.value)
    const handleBackSideChange = (event)=> setBackSide(event.target.value)

    const handleSubmit = async (event)=>{
        event.preventDefault()
        const ac = new AbortController()
      try{
          const data = await createCard(deckId, {front: frontSide, back: backSide}, ac.signal)
          setCurrentDeck(data)
          setFrontSide("")
          setBackSide("")
          window.location.reload();
      }catch(error){
          console.log(error)
      }
        return () => ac.abort()
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


    if (currentDeck){
        return (
            <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/">{currentDeck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <div>
                <h2>{currentDeck.name}: Add Card</h2>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="front">
                            Front
                        </label>
                        <textarea
                        name="front"
                        id="front"
                        className="form-control"
                        placeholder="Front side of card"
                        onChange={handleFrontSideChange}
                        
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="back">
                            Back
                        </label>
                        <textarea
                        name="back"
                        id="back"
                        className="form-control"
                        placeholder="Back side of card"
                        onChange={handleBackSideChange}
                        />
                    </div>
                    <br></br>
                        <Link to={`/decks/${currentDeck.id}`}>
                            <button className="btn btn-secondary" value="Done">
                                Done
                            </button>
                        </Link>
                        <button type="submit" className="btn btn-primary" value="submit">
                                Submit
                            </button>
                </form>
            </div>
            </React.Fragment>
        )
        
    }else{
        return <p>Loading...</p>
    }    
}

export default AddCard