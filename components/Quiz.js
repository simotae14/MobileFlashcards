import React, { Fragment } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { purple, red, green } from '../utils/colors';
import PercentageCircle from 'react-native-percentage-circle';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCardNumber: 1,
            totalScore: 0,
            showAnswer: false
        };
    }
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;
        return {
          title: `Quiz for the ${title} deck`
        };
    }
    handleToggleShow = () => this.setState({showAnswer: !this.state.showAnswer});
    handleCorrect = () => {
        this.setState({
            currentCardNumber: (this.state.currentCardNumber + 1),
            totalScore: this.state.totalScore + 1,
            showAnswer: false
        });
    }
    handleUncorrect = () => {
        this.setState({
            currentCardNumber: (this.state.currentCardNumber + 1),
            showAnswer: false
        });
    }
    render() {
        const { title, questions } = this.props;
        const { totalScore, currentCardNumber, showAnswer } = this.state;
        const totalQuestions = questions.length;

        if (currentCardNumber > totalQuestions) {
            const percentage = Math.round(totalScore * 100 / totalQuestions);
            clearLocalNotification()
                .then(setLocalNotification);
            return (
                <View
                    style={styles.resultsContainer}
                >
                    <View>
                        <Text
                            style={styles.questionAnswerText}
                        >
                            Your Score for { title } deck is: { totalScore }/{ totalQuestions }
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 20
                        }}
                    >
                        <PercentageCircle
                            radius={85}
                            percent={percentage}
                            color={percentage > 60 ? green : red}
                            innerColor='#ffe'
                            textStyle={{fontSize: 24, color: (percentage > 60 ? green : red)}}
                        />
                    </View>
                    <View
                        style={{
                            marginBottom: 20
                        }}
                    >
                        {
                            percentage > 60 ? (
                                <Text
                                    style={styles.questionAnswerText}
                                >
                                    Great work mate!!!! 👊
                                </Text>
                            ) : (
                                <Text
                                    style={styles.questionAnswerText}
                                >
                                    Dude, you need more study!!!! 😟
                                </Text>
                            )
                        }
                    </View>
                    <View
                        style={styles.btnWrapper}
                    >
                        <TouchableOpacity
                            style={[ styles.btnCustom, styles.correctBtn]}
                            onPress={() => this.props.navigation.navigate('Quiz', { title: this.props.title })}
                        >
                            <Text
                                style={styles.correctText}
                            >
                                Restart
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[ styles.btnCustom, styles.errorBtn ]}
                            onPress={() => this.props.navigation.navigate('Deck', { deck: this.props.deck } )}
                        >
                            <Text
                                style={styles.errorText}
                            >
                                Go to Deck
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    enabled
                >
                    <View
                        style={styles.leftContainer}
                    >
                        <Text
                            style={styles.bigText}
                        >
                            { currentCardNumber }/{ totalQuestions }
                        </Text>
                    </View>
                    {
                        showAnswer ? (
                            <Fragment>
                                <Text
                                    style={styles.questionAnswerText}
                                >
                                    { questions[currentCardNumber - 1].answer }
                                </Text>
                                {
                                    Platform.OS === 'ios' ? (
                                        <TouchableOpacity
                                            onPress={this.handleToggleShow}
                                            style={[ styles.btnCustom, styles.alignSelf, styles.showBtn ]}
                                        >
                                            <Text
                                                style={styles.showText}
                                            >
                                                Show Answer
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableNativeFeedback
                                            background={TouchableNativeFeedback.SelectableBackground()}
                                            onPress={this.handleToggleShow}
                                        >
                                            <View
                                                style={[ styles.btnCustom, styles.alignSelf, styles.showBtn ]}
                                            >
                                                <Text
                                                    style={styles.showText}
                                                >
                                                    Show Answer
                                                </Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    )
                                }
                                {
                                    Platform.OS === 'ios' ? (
                                        <View
                                            style={styles.btnWrapper}
                                        >
                                            <TouchableOpacity
                                                style={[ styles.btnCustom, styles.correctBtn]}
                                                onPress={this.handleCorrect}
                                            >
                                                <Text
                                                    style={styles.correctText}
                                                >
                                                    Correct
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[ styles.btnCustom, styles.errorBtn ]}
                                                onPress={this.handleUncorrect}
                                            >
                                                <Text
                                                    style={styles.errorText}
                                                >
                                                    Uncorrect
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View
                                            style={styles.btnWrapper}
                                        >
                                            <TouchableNativeFeedback
                                                background={TouchableNativeFeedback.SelectableBackground()}
                                                onPress={this.handleCorrect}
                                            >
                                                <View
                                                    style={[ styles.btnCustom, styles.correctBtn]}
                                                >
                                                    <Text
                                                        style={styles.correctText}
                                                    >
                                                        Correct
                                                    </Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                            <TouchableNativeFeedback
                                                background={TouchableNativeFeedback.SelectableBackground()}
                                                onPress={this.handleUncorrect}
                                            >
                                                <View
                                                    style={[ styles.btnCustom, styles.errorBtn ]}
                                                >
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        Uncorrect
                                                    </Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                        </View>
                                    )
                                }

                            </Fragment>
                        ) : (
                            <Fragment>
                                <Text
                                    style={styles.questionAnswerText}
                                >
                                    { questions[currentCardNumber - 1].question }
                                </Text>
                                {
                                    Platform.OS === 'ios' ? (
                                        <TouchableOpacity
                                            onPress={this.handleToggleShow}
                                            style={[ styles.btnCustom, styles.alignSelf, styles.showBtn ]}
                                        >
                                            <Text
                                                style={styles.showText}
                                            >
                                                Show Question
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableNativeFeedback
                                            background={TouchableNativeFeedback.SelectableBackground()}
                                            onPress={this.handleToggleShow}
                                        >
                                            <View
                                                style={[ styles.btnCustom, styles.alignSelf, styles.showBtn ]}
                                            >
                                                <Text
                                                    style={styles.showText}
                                                >
                                                    Show Question
                                                </Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    )
                                }
                                {
                                    Platform.OS === 'ios' ? (
                                        <View
                                            style={styles.btnWrapper}
                                        >
                                            <TouchableOpacity
                                                style={[ styles.btnCustom, styles.correctBtn]}
                                                onPress={this.handleCorrect}
                                            >
                                                <Text
                                                    style={styles.correctText}
                                                >
                                                    Correct
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[ styles.btnCustom, styles.errorBtn ]}
                                                onPress={this.handleUncorrect}
                                            >
                                                <Text
                                                    style={styles.errorText}
                                                >
                                                    Uncorrect
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View
                                            style={styles.btnWrapper}
                                        >
                                            <TouchableNativeFeedback
                                                background={TouchableNativeFeedback.SelectableBackground()}
                                                onPress={this.handleCorrect}
                                            >
                                                <View
                                                    style={[ styles.btnCustom, styles.correctBtn]}
                                                >
                                                    <Text
                                                        style={styles.correctText}
                                                    >
                                                        Correct
                                                    </Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                            <TouchableNativeFeedback
                                                background={TouchableNativeFeedback.SelectableBackground()}
                                                onPress={this.handleUncorrect}
                                            >
                                                <View
                                                    style={[ styles.btnCustom, styles.errorBtn ]}
                                                >
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        Uncorrect
                                                    </Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                        </View>
                                    )
                                }
                            </Fragment>
                        )
                    }
                </KeyboardAvoidingView>
            )
        }
    }
}

function mapStateToProps(state, props) {
    const { title } = props.navigation.state.params;
    return {
        deck: state[title],
        questions: state[title].questions,
        title: title
    };
}

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        backgroundColor: '#ffe',
        alignItems: 'center',
        minHeight: 350,
        paddingLeft: 25,
        paddingRight: 25
    },
    resultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#ffe',
        alignItems: 'center',
        minHeight: 350,
        paddingLeft: 25,
        paddingRight: 25
    },
    leftContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    bigText: {
        fontSize: 30
    },
    questionAnswerText: {
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 30
    },
    stretchContent: {
        alignSelf: 'stretch'
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
    showBtn: {
        borderColor: purple
    },
    showText: {
        fontSize: 30,
        color: purple,
        textAlign: 'center'
    },
    btnWrapper: {
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    correctBtn: {
        borderColor: green,
        flex: 1
    },
    correctText: {
        fontSize: 30,
        color: green,
        textAlign: 'center'
    },
    errorBtn: {
        borderColor: red,
        flex: 1
    },
    errorText: {
        fontSize: 30,
        color: red,
        textAlign: 'center'
    }
});
