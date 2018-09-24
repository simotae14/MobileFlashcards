import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import {StackNavigator, TabNavigator} from 'react-navigation';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { blue } from './utils/colors';
import { Constants } from 'expo';

function FlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const Tabs = TabNavigator({
  DeckList: {
      screen: DeckList,
      navigationOptions: {
          tabBarLabel: 'Decks Menu',
          tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
      },
  },
  NewDeck: {
      screen: NewDeck,
      navigationOptions: {
          tabBarLabel: 'New Deck',
          tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle-outline' size={30} color={tintColor} />
      }
  }
});

const FlashcardsNavigator = StackNavigator({
  Home: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View
        //style={{flex: 1}}
          style={styles.container}
        >
          <FlashcardsStatusBar backgroundColor={blue} barStyle='light-content' />
          <FlashcardsNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
