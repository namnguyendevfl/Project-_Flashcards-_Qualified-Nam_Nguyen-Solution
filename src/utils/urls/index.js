//Create routeUrls and linkUrls to help control the "route path" and "link to" for the project

export const routeUrls = {
    deckCreate: '/decks/new',
    deckView: '/decks/:deckId',
    deckStudy: '/decks/:deckId/study',
    deckEdit: '/decks/:deckId/edit',
    cardCreate: '/decks/:deckId/cards/new',
    cardEdit: '/decks/:deckId/cards/:cardId/edit'
}

export const linkUrls = (deck, card) => {
    if (deck) {
        const urls = {
            deckView: `/decks/${deck.id}`,
            deckStudy: `/decks/${deck.id}/study`,
            deckEdit: `/decks/${deck.id}/edit`,
            cardCreate: `/decks/${deck.id}/cards/new`
        }
        if (card) return {...urls,
            cardEdit: `/decks/${deck.id}/cards/${card.id}/edit` 
        }
        return urls       
    } 
    return {
        deckCreate: '/decks/new',
    }
}