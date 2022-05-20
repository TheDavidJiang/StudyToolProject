import React from "react"
import {Link} from "react-router-dom"


function Form({handleSubmit, handleFrontSideChange, handleBackSideChange, frontSide, backSide, currentDeck}){
    return (
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
                        value={frontSide}
                        
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
                        value={backSide}
                        />
                    </div>
                    <br></br>
                        <Link to={`/decks/${currentDeck.id}`}>
                            <button className="btn btn-secondary" value="done">
                                Done
                            </button>
                        </Link>
                        <button type="submit" className="btn btn-primary" value="submit">
                                Save
                            </button>
                </form>
    )
}



export default Form