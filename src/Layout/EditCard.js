import React, {useEffect, useState} from "react"
import { useParams, Link , useHistory} from "react-router-dom"
import { readCard, readDeck, updateCard } from "../utils/api"


function EditCard(){
    const [currentDeck, setCurrentDeck] = useState(null)
    const [frontSide, setFrontSide] = useState("")
    const [backSide, setBackSide] = useState("")

    const params = useParams()
    const deckId = params.deckId
    const cardId = params.cardId
    const history = useHistory()

    const handleFrontSideChange = (event)=> setFrontSide(event.target.value)
    const handleBackSideChange = (event)=> setBackSide(event.target.value)

    const handleSubmit = async (event) =>{
        event.preventDefault()
        const ac = new AbortController()
      try{
          const data = await updateCard({id: cardId, front: frontSide, back: backSide, deckId:parseInt(deckId)}, ac.signal)
          history.push(`/decks/${currentDeck.id}`)
          
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


    useEffect(()=>{
        const ac = new AbortController()
        async function findCard(){            
            try{
                const data = await readCard(cardId, ac.signal)
                setFrontSide(data.front)
                setBackSide(data.back)
            }catch(error){
                console.log(error)
            }
        }
        findCard()
        return () => ac.abort()
    }, [])




    if (currentDeck){
        return (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/">Deck {currentDeck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                    </ol>
                </nav> 
                <h3>Edit Card</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="front">
                            Front
                        </label>
                        <textarea 
                        className="form-control"
                        defaultValue={frontSide}
                        required
                        onChange={handleFrontSideChange}/>
                    </div>
                    <div>
                        <label htmlFor="back">
                            Back
                        </label>
                        <textarea 
                        className="form-control"
                        defaultValue={backSide}
                        required
                        onChange={handleBackSideChange}/>
                        
                    </div>
                    <br></br>
                        <Link to={`/decks/${currentDeck.id}`}>
                            <button className="btn btn-secondary" value="done">
                                Cancel
                            </button>
                        </Link>
                        
                        <button type="submit" className="btn btn-primary" value="submit">
                                Submit
                            </button>
                            
                </form>
            </React.Fragment>
            
        )
    }else{
        return <p>Loading...</p>
    }
        
    
    

    // use the ID to read the card to get the current card
    // populate the inputs with the data from the cards
}

export default EditCard