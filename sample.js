/* ================================================================
 * autoresponsive_react_native_sample by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Jun 02 2014 20:15:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2015 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

let React = require('react-native');
let AutoResponisve = require('autoresponsive-react-native');

let {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} = React;

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#301711',
  },
  title: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleText: {
    color: '#d0bbab',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold',
    color: 'rgb(58, 45, 91)',
  }
});

const SCREEN_WIDTH = Dimensions.get('window').width;

class Sample extends React.Component {
  state = {
    array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  }

  getChildrenStyle() {
    return {
      width: (screenWidth - 18) / 2,
      height: parseInt(Math.random() * 20 + 12) * 10,
      backgroundColor: 'rgb(92, 67, 155)',
      paddingTop: 20,
      borderRadius: 8,
    };
  }

  getAutoResponsiveProps() {
    return {
      itemMargin: 8,
    };
  }

  renderChildren() {
    return this.state.array.map((i, key) => {
      return (
        <View style={this.getChildrenStyle()} key={key}>
          <Text style={styles.text}>{i}</Text>
        </View>
      );
    }, this);
  }

  onPressTitle = () => {
    this.setState({
      array: [...this.state.array, parseInt(Math.random() * 30)],
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.title}>
          <Text onPress={this.onPressTitle} style={styles.titleText}>autoresponsive</Text>
        </View>
        <AutoResponisve {...this.getAutoResponsiveProps()}>
          {this.renderChildren()}
        </AutoResponisve>
      </ScrollView>
    );
  }
}

module.exports = Sample;
