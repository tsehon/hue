import React, { useState } from 'react';
import Searchbar from './components/Searchbar';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.page}>
      <Searchbar/>
      <View style={styles.container}>
        <Text>where the categories go</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.container}>
        <Text>where the products go</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.feed}>
        <Text>discover feed</Text>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    paddingTop: 60,
  },
  container: {
    padding: 30,
    height: '15%',
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feed: {
    height: 1000,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
