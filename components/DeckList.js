import React from 'react';
import { View, Text } from 'react-native';
import { retrieveDecks } from '../actions';
import { getDecks } from '../utils/decksStorageApi';
import { connect } from 'react-redux';

class DeckList extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        // call the api to fetch data
        getDecks()
            .then((results) => dispatch(retrieveDecks(results)));
    }
    render() {
        console.log('decks', this.props.decks);
        return (
            <View>
                <Text>Decks</Text>
                <Text>{JSON.stringify(this.props.decks)}</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state
    };
}

export default connect(mapStateToProps)(DeckList);