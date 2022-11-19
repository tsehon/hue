import React, { useState } from 'react';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

export default function MainPage({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <SearchBar
        style={styles.searchbar}
        onFocus={() => navigation.navigate('Search')}
        placeholder="Search"
        platform='ios'
      />
      <Button onPress={() => navigation.navigate('Product',)}>
      </Button>
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
    paddingTop: 20,
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