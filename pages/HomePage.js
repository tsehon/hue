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
          escapeStyle={{marginLeft: -10, marginRight: -10, alignItems: 'center'}}
        >
          <ReviewCarousel
            data={[
              {
                categoryName: 'Beauty',
                firstID:'PfMwNgdRrK69Q6kNQhh4',
                imgURI: 'https://firebasestorage.googleapis.com/v0/b/lavalab-hue.appspot.com/o/video-capture-6999.png?alt=media&token=f7266fab-1b73-4ec5-abd6-4e1182672737'
              },
              {
                categoryName: 'Women\'s Clothing',
                firstID:'TBoPLVjV7wiZ5Va1Fz1J',
                imgURI: 'https://firebasestorage.googleapis.com/v0/b/lavalab-hue.appspot.com/o/TBoPLVjV7wiZ5Va1Fz1J.jpg?alt=media&token=baaa8a56-c543-4628-be75-8e0fdaf2c05f',
              }
            ]}
            style={ styles.reviewdisplay }
            navigation={navigation}
          />
        </HomePageSection>

        <HomePageSection
          title="Trending Categories"
        >
          <CategoryButtonGrid categories={["Beauty", "Lawnmowers", "Tech", "Skincare"]} flexBasis='49%' navigation={navigation}/>
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
              firstID='aThozCvbHM7iwODec9ZI'
              imgURI='https://firebasestorage.googleapis.com/v0/b/lavalab-hue.appspot.com/o/video-capture-9153.png?alt=media&token=a7dd9444-b100-40a3-adec-197d9dfa5600'
            />
            <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='uzjDRJ2kZWq4bswDffVl'
              videoURI='https://firebasestorage.googleapis.com/v0/b/lavalab-hue.appspot.com/o/video-capture-3767.png?alt=media&token=3644737b-bbf0-4174-b6d7-ae2dc821947b'
            />
            {/* <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='izG3zce88U4wsXUvBqFM'
              videoURI='https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_2MB.mp4'
            /> */}
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
              searchQuery='Skincare'
              firstID='jgsVTxXpy6QednIM9GX2'
              videoURI='https://firebasestorage.googleapis.com/v0/b/lavalab-hue.appspot.com/o/jgsVTxXpy6QednIM9GX2.mp4?alt=media&token=2ebc4fb9-312c-49b7-850e-cb79023c96b3'
            />
            {/* <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='2DtUlonFdbiimC0LNB18'
              videoURI='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_2MB.mp4'
            /> */}
            {/* <VideoPreview
              style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='izG3zce88U4wsXUvBqFM'
              videoURI='https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_2MB.mp4'
            /> */}
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
        <VideoPreview
              style={{width: 390, height: 390}}
              navigation={navigation}
              searchType='categoryName'
              searchQuery='Beauty'
              firstID='MXILb6SdiK9Sq5ZjIzZU'
              videoURI='https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_2MB.mp4'
            />
        <HomePageSection
          title="Trending Products"
        >
          <ProductsList
            navigation={navigation}
            products={[
              '467hIFvp0sphYNKlvUoA',
              '4goKqfQXLdT2XTzTPEyr',
              'ENwY4TBud4NLcQN4Hs9X',
              'JeanrqJJRUyCUYreIjxP',
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
              searchQuery='Tech'
              firstID='JiDG2gW3yiHJRL8QiU0U'
              imgURI='https://firebasestorage.googleapis.com/v0/b/lavalab-hue.appspot.com/o/JiDG2gW3yiHJRL8QiU0U.jpg?alt=media&token=5e6ba21f-7e7a-45f9-b4d3-e764d12a7a36'
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
  reviewdisplay: {
    width: '100%',
    alignSelf: 'center',
  }
});