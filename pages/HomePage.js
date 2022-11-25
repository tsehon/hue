import React, { useState } from 'react';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomePageSection from '../components/HomePageSection';
import CategoryButtonGrid from '../components/CategoryButtons';
import VideoPreview from '../components/VideoPreviews';

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
          <CategoryButtonGrid categories={["Beauty", "Lawnmowers", "Tech", "Skincare"]} navigation={navigation}/>
        </HomePageSection>

        <HomePageSection
          title="Trending in Beauty"
        >
          <ScrollView horizontal>
            <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='MXILb6SdiK9Sq5ZjIzZU'
              videoURI='https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_2MB.mp4'
            />
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
    backgroundColor: 'white',
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