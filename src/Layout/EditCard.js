import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { readCard } from "../utils/api"


function EditCard(){
    const [cardFront, setCardFront] = useState("")
    const [cardBack, setCardBack] = useState("")

    const params = useParams()
    const deckId = params.deckId
    const cardId = params.cardId

    // use the ID to read the card to get the current card
    // populate the inputs with the data from the cards



    // const {deckId } = 
    // // const [formData, setFormData] = useState({})
    // const [deck, setDeck] = useState({
    //     id:"", 
    //     name: "", 
    //     description: "",
    // })

    // useEffect(()=>{
    //     const abortController = new AbortController()
        
    //     const laodDeck = async () =>{
    //         try{
    //             const getDeck = await readDeck(deckId, abortController.signal)
    //             setDeck(getDeck)
    //         }
    //     }
    // })
}

export default EditCard