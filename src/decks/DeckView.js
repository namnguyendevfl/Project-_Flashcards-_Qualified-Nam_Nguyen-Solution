import React from "react"
import { useParams } from "react-router-dom"
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Btn from "../btn/Btn";
import Dlt from "../btn/DltBtn";
import CardListItems from "../cards/CardListItems";

export default function DeckView({ deck, decks, setDecks }) {    
    const { deckId } = useParams();
    //create a list of cards
    const renderedCardList = deck.cards && deck.cards.map((card, idx) =>{
        return (
            <CardListItems  key = {idx} deck = {deck} card ={card}  />                      
        )
    });

    return <div>
        <BreadCrumb deck= {deck}/>
        <h4>{deck.name}</h4>
        <p>{deck.description}</p>
        <div className = "row w-100 ">
            <div className ="col"> 
            {/* Implements btns with different functions */}
                <Btn deck = {deck} option = "edit" />
                <Btn deck = {deck} option = "study" />
                <Btn deck = {deck} option = "add-card"/>            
            </div>   
            <div className = "float-end">
            <Dlt option = "deck" deckId = {deckId} decks ={decks} setDecks ={setDecks}/>
            </div>
        </div>
        <div>
            <h2> Cards </h2>
            {renderedCardList}
        </div>
    </div>
}