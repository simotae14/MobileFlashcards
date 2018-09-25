import React, { Fragment } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { blue, orange } from '../utils/colors';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';
import { addCardToDeck } from '../utils/decksStorageApi';

class NewCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionText: '',
            answerText: ''
        };
    }
    static navigationOptions = () => {
        return {
          title: 'Add Card'
        };
    }
    handleSubmitCard = () => {
        const { questionText, answerText } = this.state;
        const { dispatch, navigation } = this.props;
        const { title } = this.props.navigation.state.params;

        // check if the user enter valid values
        if (!questionText || questionText.trim() === '') {
            this.refs.toast.show(<View><Text>The Question value cannot be empty</Text></View>, 500);
        } else if (!answerText || answerText.trim() === '') {
            this.refs.toast.show(<View><Text>The Answer value cannot be empty</Text></View>, 500);
        } else {
            const newCardObject = {
                title,
                question: questionText,
                answer: answerText
            }
            dispatch(addQuestion(newCardObject));
            addCardToDeck(newCardObject);
            navigation.goBack();
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
                    Create a new Card
                </Text>
                <TextInput
                    style={styles.questionAnswerText}
                    onChangeText={(questionText) => this.setState({questionText})}
                    value={this.state.questionText}
                    placeholder = "Add the question"
                    placeholderTextColor = "#333"
                />

                <TextInput
                    style={styles.questionAnswerText}
                    onChangeText={(answerText) => this.setState({answerText})}
                    value={this.state.answerText}
                    placeholder = "Add the answer"
                    placeholderTextColor = "#333"
                />
                {
                    Platform.OS === 'ios' ? (
                        <Fragment>
                            <TouchableOpacity
                                style={[styles.btnCustom, styles.submitBtn]}
                                onPress={this.handleSubmitCard}
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
                                onPress={this.handleSubmitCard}
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

export default connect()(NewCard);

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
    questionAnswerText: {
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
