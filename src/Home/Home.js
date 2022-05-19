import { listDecks } from "../utils/api";
import React, { useEffect, useState } from "react";
import DeckItem from "../Decks/Deckitem";
import { Link, useParams, useRouteMatch } from "react-router-dom";

/* 
1. This home page Has a create button, which brings the user to the create Deck Screen
2. Existing decks are each shown with the deck name, number of cards, and 3 buttons: Study, view, Delete
     Make a deckView or DeckList component that shows each deck
    a. STUDY brings the user to the STUDYURL
    b. VIEW brings the user to the DECKURL
    c. DELETE shows a warning before deleting the deck

*/

export default function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    async function fetchDecks() {
      try {
        const data = await listDecks(ac.signal);
        setDecks(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDecks();
    return () => ac.abort();
  }, []);
  // console.log("currentDeck: ", decks)

  return (
    <div>
      <div>
        <Link to="/decks/new">
          <button>Create Deck</button>
        </Link>
      </div>
      <div>
        <ul>
          {decks.map((deck) => (
            <DeckItem key={deck.id} deck={deck} setDecks={setDecks} />
          ))}
        </ul>
      </div>
    </div>
  );
}
