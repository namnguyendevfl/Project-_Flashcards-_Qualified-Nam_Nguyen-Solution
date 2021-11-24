import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { createDeck, updateDeck } from "../utils/api";


export function DeckForm({decks, setDecks, deck, setDeck, option}) {
    const history = useHistory();
    //Reset empty values if it is not editing a deck
    useEffect(() => {
        if (option !== "edit-deck") setDeck({name: "", description: "", id: ""})
    },[option, setDeck])

    //Using setDeck to store any changes 
    const handleChange = ({target}) => {
        console.log(Array.isArray(decks)) //To check sthing is an Arr
        setDeck({...deck,
            [target.name] : target.value,
        });
    }; 
    const handleCancel = () => {
        history.push(`/`);
    };
    //implement create and update helper functions and call them when needed
    const create = (abortController) => {
        const postDeck = async () => {
            const response = await createDeck(deck, abortController.signal)
            const newDecks = decks;
            newDecks.push(response)
            setDecks(()=>newDecks)
            };
        postDeck();
    }

    const update = (abortController) => {
        const editDeck = async () => {
            const response = await updateDeck(deck, abortController.signal);
            setDeck(() => response);
        };
        editDeck();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        if (option === "edit-deck") update(abortController)
        create(abortController)
        history.push(`/decks/${deck.id}`);
        return () => abortController.abort();
      };

return <form onSubmit={handleSubmit}>
<div className = "w-100">
    <div className = "pb-0">
        <label htmlFor="name" className ="w-100" >
        <div className="pb-2">Name </div>
        <input 
            id = "name"
            type = "text"
            name = "name"
            className ="w-100 form-control" 
            style = {{height:"40px"}}
            placeholder ="Deck Name"
            onChange = {handleChange}
            value = {deck.name}
            />
        </label>
    </div>
    <div className = "py-0">
        <label htmlFor="Description" className ="w-100">
        <div className="pb-2 pt-3">Description</div>
        <textarea
            id = "Description"
            type = "text"
            name = "description"
            className ="w-100 form-control" 
            style = {{height:"100px"}}
            placeholder ="Brief description of the deck"
            onChange = {handleChange}
            value = {deck.description}
            />
        </label>
    </div>
</div>
<div className= "py-2">
    <button onClick ={handleCancel}
            className ="mr-2 btn btn-secondary">
            Cancel
    </button>
    <button type = "submit"
            className ="btn btn-primary">
            Submit
    </button>
</div>
</form>
}

export default function DeckEditNCreate({deck, setDeck, decks, setDecks, option }) {
    //depending on the value of option, we can create or edit a deck
    const breadcrumb = option === "edit-deck" ? deck : undefined
    return (
        <div className = "container">
            <div>
                <BreadCrumb deck = {breadcrumb}/>
            </div>
            <div>
                <DeckForm option = {option} deck = {deck} setDeck = {setDeck} decks = {decks} setDecks = {setDecks}/>
            </div>

        </div>
    )
}