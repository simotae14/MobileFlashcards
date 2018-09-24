import { GET_DECKS, ADD_DECK, ADD_QUESTION } from '../actions';

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
        case ADD_QUESTION:
            const { title, question, answer } = action.question;

            // retrieve the questions array for the specified title
            const oldQuestions = state[title].questions;

            // create a new questions array with the new question
            const newQuestions = oldQuestions.concat([{
                question,
                answer
            }]);

            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: newQuestions
                }
            };
        default:
            return state;
    }
}
