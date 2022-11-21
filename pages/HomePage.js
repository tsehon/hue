import React, { useState } from 'react';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomePageSection from '../components/HomePageSection';
import CategoryButton from '../components/CategoryButtons';
import CategoryButtonGrid from '../components/CategoryButtons';

export default function HomePage({ navigation }) {
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.page}>
        <SearchBar
          style={styles.searchbar}
          onChangeText={(input) => {
              navigation.navigate('Search', {
                  text: { input }
              })
          }}
          placeholder="Search"
          platform='ios'
        />
        <Button onPress={() => navigation.navigate('Product',)}>
        </Button>
        <HomePageSection
          title="Trending Categories"
        >
          <CategoryButtonGrid title="Beauty"></CategoryButtonGrid>
        </HomePageSection>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
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