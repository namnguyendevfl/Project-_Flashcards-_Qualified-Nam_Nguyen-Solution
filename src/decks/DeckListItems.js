import React from "react"
import Btn from "../btn/Btn";
import Dlt from "../btn/DltBtn";

export default function DeckListItems({deck, decks, setDecks}) {
  const { cards, id } = deck;
    return (
        <div className = "border border-dark p-2 my-2">
          <div className ="row w-100">
            <div className ="col">
              <h2>{deck.name}</h2> 
            </div>
            <div className ="float-end">
            {cards
            ? <p className ="float-end"> {cards.length} cards</p>
            : <p className ="float-end"> 0 cards</p>}
            </div>
            
          </div>
          <p> {deck.description} </p>
          <div className = "row w-100 ">
            <div className ="col"> 
            <Btn deck = {deck} option = "view" />
            <Btn deck = {deck} option = "study" />            
            </div> 
            <div className = "float-end">
              <Dlt option = "deck" deckId = {id} decks ={decks} setDecks ={setDecks}/>
            </div>
          </div>
        </div>
        )

}