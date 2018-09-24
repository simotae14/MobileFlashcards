export const GET_DECKS = 'GET_DECKS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_DECK = 'ADD_DECK';

export function retrieveDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    };
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    };
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    };
}
