import React, { useState, useEffect } from "react";
import { Switch, Route, useParams } from "react-router-dom"
import { readDeck, readCard } from "../utils/api"
import DeckEditNCreate from "./DeckEditNCreate";
import DeckView from "./DeckView";
import DeckStudy from "./DeckStudy";
import { routeUrls } from "../utils/urls";
import CardEditNCreate from "../cards/CardEditNCreate";

export default function Deck(props) {
    const {
      decks,
      setDecks,
      deck,
      setDeck,
      countDecks,
      setCountDecks
    } = props
    const { deckId } = useParams()
    const [ cardId, setCardId ] = useState(null);
    const [ cards, setCards ] = useState([])
    const [ countCards, setCountCards ] = useState(0)
    //Define a card variable here using some empty initial values
    //We can use this to create a new card with the initial values
    //or we can store a card needed to edit pass it into the cardCreateNEdit component and edit it
    const [ card, setCard ] = useState({front:"", back:"", id: ""})
    useEffect(() => {
      const abortController = new AbortController();
      const loadDeck = async () => {
          try{      
              const response = await readDeck(deckId,abortController.signal);
              setDeck(response)
          } catch(error){
              if(error.name === "AbortError") console.log("Aborted")
              throw error
          }
      }
      if(deckId)
      loadDeck();
      return () => abortController.abort();
    },[deckId, setDeck, card, countDecks, countCards]);
  
    useEffect(() => {
      const abortController = new AbortController();
      const loadCard = async () => {
          const response = await readCard(cardId,abortController.signal)
          setCard(response)
      };
      if (cardId)
      loadCard();
      return () => abortController.abort();
    }, [cardId, setCard, countCards]);
    
    return (
      <Switch>
      {/* The deck view route with the path '/decks/:deckId' */}
        <Route path = {`${routeUrls.deckView}`} exact>
          <DeckView deck = {deck} setDeck = {setDeck} 
                    decks = {decks} setDecks = {setDecks}
                    cards = {cards} setCards = {setCards}
                    countCards = {countCards} setCountCards = {setCountCards}
                    />
        </Route>
      {/* The deck study route with the path '/decks/:deckId/study' */}
        <Route path = {`${routeUrls.deckStudy}`}>
          <DeckStudy  deck ={deck} setDeck = {setDeck} 
                    />
        </Route>
      {/* The deck edit route with the path '/decks/:deckId/edit' */}
        <Route path = {`${routeUrls.deckEdit}`}>
          <DeckEditNCreate  option = "edit-deck" decks = {decks} setDecks = {setDecks} 
                            deck = {deck} setDeck = {setDeck}
                            countDecks = {countDecks} setCountDecks = {setCountDecks} 
                            />
        </Route>
      {/* The card create route with the path '/decks/:deckId/cards/new' */}
        <Route path = {`${routeUrls.cardCreate}`}>
          <CardEditNCreate  option = "create-card" deck = {deck} 
                            card ={card} setCard = {setCard} 
                            cards = {cards} setCards ={setCards}
                            countCards = {countCards} setCountCards = {setCountCards}
                            />
        </Route>
      {/* The card edit route with the path '/decks/:deckId/cards/:cardId/edit' */}
      {/* the setCardId was passed in to get the cardId from the route parameter and lifted up to use for the readCard Api call */}
        <Route path = {`${routeUrls.cardEdit}`} exact>
          <CardEditNCreate  option = "edit-card" deck = {deck} 
                            card ={card} setCard = {setCard} 
                            cards = {cards} setCards ={setCards}
                            setCardId = {setCardId}
                            countCards = {countCards} setCountCards = {setCountCards}
                            />
        </Route>
      </Switch>
    )
  }