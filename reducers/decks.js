import { GET_DECKS, ADD_DECK } from '../actions';

/*
reducer to handle decks
*/
export default function decks( state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            };
        default:
            return state;
    }
}
