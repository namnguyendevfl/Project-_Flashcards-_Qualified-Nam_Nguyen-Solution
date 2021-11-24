import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom"
import { listDecks } from "../utils/api"
import DeckListItems from "../decks/DeckListItems";
import DeckEditNCreate from "../decks/DeckEditNCreate";
import { routeUrls } from "../utils/urls";
import Btn from "../btn/Btn";
import Deck from "../decks/DeckRoute";


const Home = ({renderedDeckList}) => (
  <div>
    <Btn option = "create-deck" />
    {renderedDeckList}
  </div>
)

function Layout() {
  const initialDeck = {
    name: "", 
    description: "", 
    id: ""
  }
  const [ decks, setDecks ] = useState([]);
  //Define a deck variable here using initialDeck value 
  //We can use this to create a new deck with the initialDeck value
  //or we can pass it into the Deck component and edit it
  const [ deck, setDeck ] = useState(initialDeck);
  useEffect (() => {
      const abortController = new AbortController();
      const deckList = async () => {
          const response = await listDecks(abortController.signal);
          setDecks(response); 
      }
      deckList();
      return () => abortController.abort();
  },[]);
  const renderedDeckList = decks.map((deck,index) => {
    return (
    <div> 
      <DeckListItems  key = {index} 
                      deck ={deck} decks ={decks} 
                      setDecks = {setDecks} 
                    />
    </div>
    )
  })
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
        {/* the home view includes a create Deck btn and a list of decks */}
          <Route path = "/" exact>
              <Home renderedDeckList = {renderedDeckList} />
          </Route>
        {/* The create deck Route with the path '/decks/new' */}
          <Route path = {`${routeUrls.deckCreate}`}> 
            <div>
              <DeckEditNCreate  option = "create-deck" 
                                decks = {decks} setDecks = {setDecks} 
                                deck = {deck} setDeck = {setDeck} 
                                />
            </div>
          </Route>
        {/* Create a parent deck route to nest other routes with the same prefix '/decks/:deckId' */}
        {/* We dont have to pass setDeckId to and lift it up from each of these nested routes */}
        {/* Pass deck and setDeck to this component for later use when editing a deck */}
          <Route path = "/decks/:deckId">
            <Deck decks = {decks} setDecks = {setDecks} 
                  deck = {deck} setDeck = {setDeck} 
            />
          </Route>
          <Route path = "*" >
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
