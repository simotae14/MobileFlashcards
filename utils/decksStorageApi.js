import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

// create object with mock data
const mockDeck = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

// retrieve decks
export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(( results ) => {
            if (results) {
                return JSON.parse(results);
            }
            // set the AsyncStorage with the mock data
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(mockDeck));
            return mockDeck;
        });
}

// add a new deck
export function addDeckApi(newDeck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
}

// add a new Card
export function addCardToDeck(newCard) {
  const { title, question, answer } = newCard;
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      return JSON.parse(results)[title]
    })
    .then((card) => {
      const questions = card.questions.concat({
        question,
        answer
      });
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
          title,
          questions
        }
      }));
    });
}