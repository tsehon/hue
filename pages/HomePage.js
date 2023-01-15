import React from 'react';

import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomePageSection from '../components/HomePageSection';
import CategoryButtonGrid from '../components/CategoryButtons';
import VideoPreview from '../components/VideoPreviews';
import { ReviewCarousel } from '../components/ImgCarousel';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import ProductsGrid from '../components/ProductsGrid';
import ProductsList from '../components/ProductsList';

import styles from '../styles/styles';
import { ReviewHorizontalScroll } from '../components/ReviewHorizontalScroll';

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
            style={ localStyles.reviewDisplay }
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
          <ReviewHorizontalScroll
            data={[
              'aThozCvbHM7iwODec9ZI',
              'uzjDRJ2kZWq4bswDffVl',
              'YsKe3980xS4EkuX5iJyE',
            ]}
            navigation={navigation}
          />
        </HomePageSection>

        <HomePageSection
          title="Trending in Skincare"
        >
          <ReviewHorizontalScroll
            data={[
              'jgsVTxXpy6QednIM9GX2',
              'O6bc3VGbKaZ4MEciteLi',
            ]}
            navigation={navigation}
          />
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
          <ReviewHorizontalScroll
            data={[
              'JiDG2gW3yiHJRL8QiU0U',
              'nwymyYw2zIWWml7KFUXB',
            ]}
            navigation={navigation}
          />
        </HomePageSection>

        <HomePageSection
          title="Trending in Clothing"
        >
          <ReviewHorizontalScroll
            data={[
              'EvqNgESTageVCvA5HMKc',
              'gEe9D6F5Fh9FrZmV8oxk',
            ]}
            navigation={navigation}
          />
        </HomePageSection>

      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  reviewDisplay: {
    width: '100%',
    alignSelf: 'center',
  }
});