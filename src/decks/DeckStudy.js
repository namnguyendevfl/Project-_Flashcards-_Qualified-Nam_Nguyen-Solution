import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import BreadCrumb from "../BreadCrumb/BreadCrumb"
import NotEnough from "../cards/NotEnoughCards";
import { readDeck } from "../utils/api";

export default function DeckStudy({deck}) {
    //We have to fetch data from API in order to get cards
    const { deckId } = useParams()
    const deckIdInNum = parseInt(deckId);
    let tempCards = [];
    const history = useHistory()
    //if deck is not undefined the get cards from it, otherwise using the "readDeck" api call
    if (deck.cards !== undefined) tempCards = deck.cards;
    const [cards, setCards] = useState([...tempCards])
    //use the deckId router parameter to get cards using the "readDeck" api call and store it in "cards" using "setCards"
    useEffect (() => {
        const abortController = new AbortController();
        const cardList = async () => {
            const response = await readDeck(deckIdInNum,abortController.signal)
            setCards(() => response.cards) 
        };
        cardList();
        return () => abortController.abort();
    },[deck,deckIdInNum]);
    const [nextBtnVisible, setNextBtnVisible] = useState(false)
    const [cardNum, setCardNum] = useState(1)
    const handleCarNum = () => {
        setNextBtnVisible(() => false)
        setCardNum(() => cardNum+1);
        if (cardNum === cards.length) {
            const message = `
            Restart cards?
    
            Click 'cancel' to return the home page`;

            const confirm = window.confirm(message);
            if (confirm === false) history.push('/')
            else setCardNum(() => 1);
        };
    };
    const [front, setFront] = useState(true);
    const handleFlip = () => {
        setFront(() => !front);
        setNextBtnVisible(() => true)
    }
    return <>
    <div >
        <BreadCrumb deck = {deck}/>
        <div>
            <h2 className ="text-dark py-3">{deck.name}: Study</h2> 
        </div>
        <div className = "container border border-secondary p-2 my-2"> 
            {cards.length < 3
                ? <NotEnough cards = {cards}/>
                : <div>
                    <h5>Card {cardNum} of {cards.length}</h5>  
                        <div>
                            {front===true
                            ? <p>{cards[cardNum-1].front}</p>
                            : <p>{cards[cardNum-1].back}</p>}
                        </div>       
                        <div className = "row w-100 ">
                            <div className ="col"> 
                                <button onClick = {handleFlip} className ="mr-2 btn btn-secondary">
                                    Flip
                                </button>
                        
                                { nextBtnVisible === true
                                ? <button onClick = {handleCarNum} className ="btn btn-primary">
                                    Next
                                </button>
                                : <> </>}
                            </div> 
                        </div>
                </div>
            }
        </div>
    </div>
    </>
}

    