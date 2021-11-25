import React from "react"
import Btn from "../btn/Btn"


export default function NotEnough({deck, cards}) {
    return <>
    <h3>Not enough cards.</h3>
    {cards.length > 1
    ? <p> You need at least 3 cards to study. There are {cards.length} cards in this deck</p>
    : <p> You need at least 3 cards to study. There is {cards.length} card in this deck</p>
    }
    <Btn option = "add-card" deck = {deck}/>
    </>
}