import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';

const Searchbar = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <TextInput
      style={styles.searchbar}
      placeholder="Search"
      onChangeText={newText => setSearchText(newText)}
      defaultValue={searchText}
    />
  );
}

export default function App() {
  return (
    <ScrollView style={styles.page}>
      <Searchbar/>
      <View style={styles.container}>
        <Text>hue</Text>
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
  searchbar: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feed: {
    flex: 2,
    height: '100%',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
