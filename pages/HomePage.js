import React, { useState } from 'react';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomePageSection from '../components/HomePageSection';
import CategoryButtonGrid from '../components/CategoryButtons';
import VideoPreview from '../components/VideoPreviews';
import { ReviewCarousel } from '../components/ImgCarousel';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import ProductsGrid from '../components/ProductsGrid';
import ProductsList from '../components/ProductsList';

export default function HomePage({ navigation }) {
  return (
    <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
      <FocusAwareStatusBar barStyle='dark-content'/>
      <ScrollView>
        <HomePageSection
          title="Reviews For You"
          escapeStyle={{marginLeft: -10, marginRight: -10}}
        >
          <ReviewCarousel
            data={[
              {
                categoryName: 'Beauty',
                firstID:'MXILb6SdiK9Sq5ZjIzZU',
                videoURI:'https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_2MB.mp4',
              },
              {
                categoryName: 'Beauty',
                firstID:'2DtUlonFdbiimC0LNB18',
                videoURI:'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_2MB.mp4',
              }
            ]}
            style={{ width: '100%' }}
            navigation={navigation}
          />
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
            <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='2DtUlonFdbiimC0LNB18'
              videoURI='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_2MB.mp4'
            />
            <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='izG3zce88U4wsXUvBqFM'
              videoURI='https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_2MB.mp4'
            />
          </ScrollView>
        </HomePageSection>

        <HomePageSection
          title="Trending in Lawnmowers"
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
            <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='2DtUlonFdbiimC0LNB18'
              videoURI='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_2MB.mp4'
            />
            <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='izG3zce88U4wsXUvBqFM'
              videoURI='https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_2MB.mp4'
            />
          </ScrollView>
        </HomePageSection>

        <HomePageSection
          title="Products For You"
        >
          <ProductsGrid
            navigation={navigation}
            products={[
              'g8CN9lm5cxXeZ1BhwYN2',
              'M9CDo9l429QwsrzCepYv',
              'IjOmRS0ZvwjmhUUcUbI1',
              'X0J19ZzbHByWJHBGMzzv',
              'OBbjTcEtoglR2IdMAjna',
              'QroHZmWNVW5ggcauHzlG',
            ]}
          />
        </HomePageSection>

        <HomePageSection
          title="Trending Products"
        >
          <ProductsList
            navigation={navigation}
            products={[
              'g8CN9lm5cxXeZ1BhwYN2',
              'M9CDo9l429QwsrzCepYv',
              'X0J19ZzbHByWJHBGMzzv',
              'OBbjTcEtoglR2IdMAjna',
            ]}
          />
        </HomePageSection>

        <HomePageSection
          title="Trending in Tech"
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
            <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='2DtUlonFdbiimC0LNB18'
              videoURI='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_2MB.mp4'
            />
            <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='izG3zce88U4wsXUvBqFM'
              videoURI='https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_2MB.mp4'
            />
          </ScrollView>
        </HomePageSection>

        <HomePageSection
          title="Trending in Skincare"
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
            <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='2DtUlonFdbiimC0LNB18'
              videoURI='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_2MB.mp4'
            />
            <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='izG3zce88U4wsXUvBqFM'
              videoURI='https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_2MB.mp4'
            />
          </ScrollView>
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