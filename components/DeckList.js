import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { retrieveDecks } from '../actions';
import { getDecks } from '../utils/decksStorageApi';
import { connect } from 'react-redux';
import randomColor from 'randomcolor';

class DeckList extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        // call the api to fetch data
        getDecks()
            .then((results) => dispatch(retrieveDecks(results)));
    }
    // navigate to the
    render() {
        const { decks } = this.props;
        return (
            <View
                style={styles.container}
            >
                {
                    decks ? (
                        <ScrollView>
                            {
                                Object.values(decks).map((deck) => {
                                    return Platform.OS === 'ios'
                                        ? (
                                            <TouchableOpacity
                                                key={deck.title}
                                                style={[styles.deckItem, { backgroundColor: randomColor({ luminosity: 'dark' }) }]}
                                                onPress={() => this.props.navigation.navigate('Deck', { deck } )}
                                            >
                                                <Text
                                                    style={styles.deckText}
                                                >
                                                    { deck.title }
                                                </Text>
                                                <Text
                                                    style={styles.deckNumberCards}
                                                >
                                                    { deck.questions.length } cards
                                                </Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableNativeFeedback
                                                key={deck.title}
                                                background={TouchableNativeFeedback.SelectableBackground()}
                                                onPress={() => this.props.navigation.navigate('Deck', { deck } )}
                                            >
                                                <View
                                                    style={[styles.deckItem, { backgroundColor: randomColor({ luminosity: 'dark' }) }]}
                                                >
                                                    <Text
                                                        style={styles.deckText}
                                                    >
                                                        { deck.title }
                                                    </Text>
                                                    <Text
                                                        style={styles.deckNumberCards}
                                                    >
                                                        { deck.questions.length } cards
                                                    </Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                        );
                                })
                            }
                        </ScrollView>
                    ) : (
                        <Text>No Decks available</Text>
                    )
                }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ffe',
        paddingTop: 20
    },
    deckItem: {
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: 150,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10
    },
    deckText: {
        color: 'white',
        fontSize: 50
    },
    deckNumberCards: {
        color: '#ddd',
        fontSize: 30
    }
});