
import React, {useState} from "react"
import { Link, useRouteMatch } from "react-router-dom"
import { listCards} from "../utils/api"
export default function BreadCrumb({deck, cards}) {
    const {url, params: {deckId, cardId}} = useRouteMatch()
    let tempIdx = null;
    const [cardIdx, setCardIdx] = useState(null)
    const abortController = new AbortController();
    const loadCards = async () => {
        const cardList = await listCards (deckId,abortController.signal)
        cardList.map((card,index) => (card.id===cardId)?tempIdx = index:null)
        setCardIdx(tempIdx+1)
    }
    loadCards()
    const subUrl = url.split('/')
    const breadcrumb = "breadcrumb";
    const list = subUrl.map((aSubUrl,index) =>  {
        const breadcrumbItem = "breadcrumb-item";
        const activeBreadcrumbItem = "breadcrumb-item active";
    if (aSubUrl === "" && index === 0) return <li className={breadcrumbItem} > <Link to = "/"> <span className = "oi oi-home"/> Home </Link></li>; //with the last splash
    if (aSubUrl === "new" && deck === undefined) return <li className={activeBreadcrumbItem} > Create Deck</li>; //w/o the last splash
    if (index === subUrl.length-1 && aSubUrl === deckId) return <li className={activeBreadcrumbItem}>{deck.name}</li>
    if (deck !== undefined){
        if (index === subUrl.length-2) 
            if (aSubUrl !== "decks") return <li className={activeBreadcrumbItem}><Link to={`/decks/${deck.id}`}>{deck.name} </Link></li>;
        if (index >= subUrl.length-1){  
            let value = "" 
            switch(aSubUrl) {
                case "study":
                    value = "Study";
                    break; 
                case "edit" : 
                    (cards)
                    ? value = `Edit Card ${cardIdx}`
                    : value = `Edit Deck`;
                    break;
                case "new"  : 
                    value = "Add Card";
                    break; 
                default:
            };
            return <li className={activeBreadcrumbItem}>{value}</li> // does not show the last splash
        }
    return null;
}
    });
    return  <nav aria-label={breadcrumb}>
                <ol className={breadcrumb}>{list}</ol>
            </nav>
}