import React, { Fragment } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { blue, orange } from '../utils/colors';
import { connect } from 'react-redux';

class NewDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = { question: '' };
    }
    handleSubmitDeck = () => {
        const { question } = this.state;
        const { decks } = this.props;

        // check if the user entered a value, if not show a toast message
        if (!question) {
            console.log('hello world!');
        }
    }
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                enabled
            >
                <Text style={styles.questionTitle}>
                    What is the title of your new deck?
                </Text>
                <TextInput
                    style={styles.questionText}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                    placeholder = "Add the Question"
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
    questionTitle: {
        fontSize: 30,
        justifyContent: 'space-around'
    },
    questionText: {
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