import { ADD_QUESTION } from '../actions';

/*
reducer to handle questions
*/
export default function questions( state = {}, action) {
    switch (action.type) {
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