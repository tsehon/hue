import React, { useState } from 'react';
import Searchbar from '../components/Searchbar';
import { StyleSheet, View } from 'react-native';

export default function SearchPage() {
  return (
    <View style={styles.page}>
      <Searchbar/>
    </View>
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

