import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom"
import {readDeck} from "../utils/api/index.js"
import StudyCard from "./StudyCard.js"

function Study(){
    const params = useParams()
    // console.log("params", params)
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

    }, [])
    // console.log("currentDeck:", currentDeck)
    // console.log("currentDeck card:", currentDeck.cards)
    // console.log("cards:", currentDeck.cards.map((card)=>{
    //     return card
    // }))
    



    return (
        <>
        {currentDeck ? (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/">{currentDeck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
       <div>
            <h3>{currentDeck.name}</h3>
        </div>
        <div>
            <StudyCard currentDeck={currentDeck} key={currentDeck.id}/>            
        </div>
        </React.Fragment>
        ) : null
    }
        </>

    )
}

export default Study