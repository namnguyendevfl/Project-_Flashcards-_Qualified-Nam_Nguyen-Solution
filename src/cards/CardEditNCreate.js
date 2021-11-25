import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { createCard, updateCard } from "../utils/api";

const Form = ({ cards, setCards, card, setCard, option, countCards, setCountCards }) => {
    const { deckId } = useParams();
    const deckIdInNum = parseInt(deckId);
    //Reset the tmpety value if it is not editing a card
    useEffect(() => {
        if (option !== "edit-card") setCard({front:"", back:"", id: ""})
    },[option, setCard])
    const newCards = cards;
    const history = useHistory();
    const [change, setChange] = useState(false);

    //Update any changes made in the textarea fields
    const handleChange = ({target}) => {
        console.log(Array.isArray(cards)) //To check sthing is an Arr
        setCard({...card,
            [target.name] : target.value,
        }); 
        setChange(() => true);
    };

    //Create this helper function to add a new card and call it when needed
    const create = (abortController) => {
        const postCard = async () => {
            const response = await createCard(deckIdInNum, card, abortController.signal)
            newCards.push(response);
            setCards(()=>newCards);
        };
        postCard();
    }
    //Create this helper function to edit a card and call it when needed
    const update = (abortController) => {
        const editCard = async () => {
            const response = await updateCard(card, abortController.signal);
            setCard(() => response);
            history.push(`/decks/${deckId}`);
        };
        editCard();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        if (option === "edit-card") update(abortController)
        create(abortController);
        setCountCards(() => countCards + 1)
        setChange(false);
        return () => abortController.abort();
    };

    const handleDone = () => {   
        if (change) createCard();
        history.push(`/decks/${deckIdInNum}`);
    };

return <form onSubmit={handleSubmit}>
<div className = "w-100">
    <div className = "pb-0">
        <label htmlFor="front" className ="w-100" >
        <div className="pb-2">Front </div>
        <textarea 
            id = "front"
            type = "text"
            name = "front"
            className ="w-100 form-control" 
            style = {{height:"40px"}}
            placeholder ="Front side of card"
            value = {card.front}
            onChange = {handleChange}
            />
        </label>
    </div>
    <div className = "py-0">
        <label htmlFor="back" className ="w-100">
        <div className="pb-2 pt-3">Back</div>
        <textarea
            id = "back"
            type = "text"
            name = "back"
            className ="w-100 form-control" 
            style = {{height:"100px"}}
            placeholder ="Back side of card"
            value = {card.back}
            onChange = {handleChange}
            />
        </label>
    </div>
</div>
<div className= "py-2">
    <button onClick ={handleDone}
            className ="mr-2 btn btn-secondary" >
            Done
    </button>
    <button type = "submit"
            className ="btn btn-primary">
            Save
    </button>
</div>
</form>
}


export default function CardEditNCreate({deck, cards, setCards, card, setCard, option, setCardId, countCards, setCountCards}) {
    //get the cardId parameter if there is
    //then store it in setCardId and lift it up to the parent component to get the card having the "id" key which is the cardId parameter
    const { cardId } = useParams();
    useEffect(() => {
        if (cardId)
        setCardId(() => cardId)    
    },[cardId, setCardId]);

return <div className ="container">
        <div>
            <BreadCrumb deck = {deck} cards = {cards} />
        </div>
        <div>
            <Form option = {option} cards={cards} setCards={setCards} 
            deck = {deck} card ={card} setCard = {setCard}
            countCards = {countCards} setCountCards = {setCountCards}
            />
        </div> 
    </div>
}
