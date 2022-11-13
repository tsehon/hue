import React, { useState } from 'react';
import Searchbar from './components/Searchbar';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
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
    flex: 1,
    paddingTop: 60,
  },
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feed: {
    flex: 4,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
