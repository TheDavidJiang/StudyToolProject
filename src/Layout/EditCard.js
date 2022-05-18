// import React, {useEffect, useState} from "react"
// import { readDeck } from "../utils/api"


// function EditCard(){
//     return <p>Edit Card</p>
//     const {deckId } = 
//     // const [formData, setFormData] = useState({})
//     const [deck, setDeck] = useState({
//         id:"", 
//         name: "", 
//         description: "",
//     })

//     useEffect(()=>{
//         const abortController = new AbortController()
        
//         const laodDeck = async () =>{
//             try{
//                 const getDeck = await readDeck(deckId, abortController.signal)
//                 setDeck(getDeck)
//             }
//         }
//     })
// }

// export default EditCard