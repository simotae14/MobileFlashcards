import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import randomColor from 'randomcolor';
import { lightPurp, orange } from '../utils/colors';

class Deck extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
          title: deck.title
        };
    }
    render() {
        const { deck } = this.props.navigation.state.params;
        return (
            <View
                style={styles.container}
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

                {
                    Platform.OS === 'ios' ? (
                        <View>
                            <TouchableOpacity
                                style={[styles.btnCustom, styles.addBtn]}
                            >
                                <Text
                                    style={styles.addBtnTxt}
                                >
                                    Add Card
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btnCustom, styles.startBtn]}
                            >
                                <Text
                                    style={styles.startQuizBtn}
                                >
                                    Start Quiz
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.SelectableBackground()}
                            >
                                <View
                                    style={[styles.btnCustom, styles.addBtn]}
                                >
                                    <Text
                                        style={styles.addBtnTxt}
                                    >
                                        Add Card
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.SelectableBackground()}
                            >
                                <View
                                    style={[styles.btnCustom, styles.startBtn]}
                                >
                                    <Text
                                        style={styles.startQuizBtn}
                                    >
                                        Start Quiz
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    )
                }
            </View>
        )
    }
}

export default Deck;

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
        minHeight: 350,
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
        marginBottom: 10,
    },
    deckText: {
        color: 'white',
        fontSize: 50
    },
    deckNumberCards: {
        color: '#ddd',
        fontSize: 30
    },
    btnCustom: {
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: 50,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#000',
        //shadowColor: '#000',
        //shadowOffset: { width: 0, height: 1 },
        //shadowOpacity: 0.8,
        //shadowRadius: 2,
        //elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10
    },
    addBtn: {
        borderColor: lightPurp
    },
    addBtnTxt: {
        color: lightPurp,
        fontSize: 30
    },
    startBtn: {
        borderColor: orange
    },
    startQuizBtn: {
        color: orange,
        fontSize: 30
    }
});
