import React, { useState } from 'react';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomePageSection from '../components/HomePageSection';
import CategoryButton from '../components/CategoryButtons';
import CategoryButtonGrid from '../components/CategoryButtons';
import Thumbnail from '../components/Videos';

export default function HomePage({ navigation }) {
  return (
    <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
      <ScrollView>
        <SearchBar
          style={styles.searchbar}
          onPressIn={() => navigation.navigate('Search')}
          placeholder="Search"
          platform='ios'
        />

        <HomePageSection
          title="Reviews For You"
        >

        </HomePageSection>

        <HomePageSection
          title="Trending Categories"
        >
          <CategoryButtonGrid categories={["Beauty", "Lawnmowers", "Tech", "Skincare"]}></CategoryButtonGrid>
        </HomePageSection>

        <HomePageSection
          title="Trending in Beauty"
        >
          <ScrollView horizontal>
            <Thumbnail uri='https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' style={{width:200, height:300}}></Thumbnail>
            <Thumbnail uri='https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' style={{width:200, height:300}}></Thumbnail>
          </ScrollView>
        </HomePageSection>

        <HomePageSection
          title="Trending in Lawnmowers"
        >
          
        </HomePageSection>

        <HomePageSection
          title="Products For You"
        >
          
        </HomePageSection>

        <HomePageSection
          title="Trending Products"
        >
          
        </HomePageSection>

        <HomePageSection
          title="Trending in Tech"
        >
          
        </HomePageSection>

        <HomePageSection
          title="Trending in Skincare"
        >
          
        </HomePageSection>

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