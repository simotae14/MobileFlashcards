import React, { Fragment } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { blue, orange } from '../utils/colors';
import { connect } from 'react-redux';
import Toast, {DURATION} from 'react-native-easy-toast';

class NewDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = { deckName: '' };
    }
    handleSubmitDeck = () => {
        const { deckName } = this.state;
        const { decks } = this.props;

        // check if the user entered a value, if not show a toast message
        if (!deckName || deckName.trim() === '') {
            this.refs.toast.show(<View><Text>The Deck name need a value!</Text></View>, 500);
        } else if (decks[deckName]) {
            this.refs.toast.show(<View><Text>This Deck name is already in our deck list!</Text></View>, 500);
        }

    }
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                enabled
            >
                <Text style={styles.deckNameTitle}>
                    What is the title of your new deck?
                </Text>
                <TextInput
                    style={styles.deckNameText}
                    onChangeText={(deckName) => this.setState({deckName})}
                    value={this.state.deckName}
                    placeholder = "Add the deck name"
                    placeholderTextColor = "#333"
                />
                {
                    Platform.OS === 'ios' ? (
                        <Fragment>
                            <TouchableOpacity
                                style={[styles.btnCustom, styles.submitBtn]}
                                onPress={this.handleSubmitDeck}
                            >
                                <Text
                                    style={styles.submitText}
                                >
                                    Submit
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btnCustom, styles.cancelBtn]}
                                onPress={() => this.props.navigation.navigate('Home')}
                            >
                                <Text
                                    style={styles.cancelText}
                                >
                                    Dismiss
                                </Text>
                            </TouchableOpacity>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.SelectableBackground()}
                                onPress={this.handleSubmitDeck}
                            >
                                <View
                                    style={[styles.btnCustom, styles.submitBtn]}
                                >
                                    <Text
                                        style={styles.submitText}
                                    >
                                        Submit
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.SelectableBackground()}
                                onPress={() => this.props.navigation.navigate('Home')}
                            >
                                <View
                                    style={[styles.btnCustom, styles.cancelBtn]}
                                >
                                    <Text
                                        style={styles.cancelText}
                                    >
                                        Dismiss
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </Fragment>

                    )
                }
                <Toast
                    ref="toast"
                    style={{backgroundColor:'red'}}
                    position='top'
                    positionValue={100}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'red'}}
                />
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state
    };
}

export default connect(mapStateToProps)(NewDeck);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#ffe',
        alignItems: 'center',
        minHeight: 300,
        paddingLeft: 25,
        paddingRight: 25
    },
    deckNameTitle: {
        fontSize: 30,
        justifyContent: 'space-around'
    },
    deckNameText: {
        alignSelf: 'stretch',
        height: 100
    },
    btnCustom: {
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: 50,
        borderWidth: 2,
        borderRadius: 2,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10
    },
    submitBtn: {
        borderColor: blue
    },
    submitText: {
        fontSize: 30,
        color: blue
    },
    cancelBtn: {
        borderColor: orange
    },
    cancelText: {
        fontSize: 30,
        color: orange
    }
});