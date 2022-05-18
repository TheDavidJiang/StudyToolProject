import React from "react";
import Header from "./Header";
import { Route } from "react-router-dom"
import NotFound from "./NotFound";
import { Switch } from "react-router-dom";
import Home from "../Home/Home";
import CreateDeck from "./CreateDeck.js"
import Study from "./Study.js"
import Deck from "./Deck.js"
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import AddCard from "./AddCard";
// import createdeck from "../utils/api/index.js"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          {/* This shows the information on the deck with the option to edit/add/navigate/delete deck */}
          <Route path="/decks/:deckId/"> 
            <Deck />
          </Route>
          
          <Route>
            <NotFound />
          </Route>
        </Switch>

      </div>
    </>
  );
}

export default Layout;
