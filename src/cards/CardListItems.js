import React from "react"
import { useParams } from "react-router";
import Btn from "../btn/Btn";
import Dlt from "../btn/DltBtn";

export default function CardListItems({cards, setCards, card, deck}) {
  const { cardId } = useParams()
  const { front, back } = card
    return <>
        <div className = "card container">
          <div className ="row w-100">
            <div className ="col">
              <p>{front}</p> 
            </div>
            <div className ="col">
              <p>{back}</p> 
            </div>
          </div>
          <div className = "row w-100 ">
            <div className = "col"></div>
            <div className = "float-end">
                <Btn option = "edit-card" card = {card} deck = {deck}/>
                <Dlt cards = {cards} setCards = {setCards} deck = {deck} cardId = {cardId}/>
            </div>
          </div>
        </div>
      </>
}