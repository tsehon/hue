import React, { useState, useEffect } from 'react';
import { Dimensions, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import VideoPreview from './VideoPreviews';

// Takes in array of image links (props.images)
export const ImgCarousel = (props) => {
  return (
    <PaginatedCarousel
      data={props.images}
      style={props.style}
      content={(index) => (
        <Image
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
          source={{uri: props.images[index]}}
        />
      )}
    />
  )
}

export const ReviewCarousel = (props) => {
  const [canPress, setCanPress] = useState(true);

  return (
    <PaginatedCarousel
      data={props.data}
      style={props.style}
      pressState={setCanPress}
      content={(index) => (
        <VideoPreview
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
          navigation={props.navigation}
          searchType='categoryName'
          searchQuery={props.data[index].categoryName}
          firstID={props.data[index].firstID}
          imgURI={props.data[index].imgURI}
          videoURI={props.data[index].videoURI}
          disabled={!canPress}
          activeOpacity={1}
        />
      )}
    />
  )
}

const PaginatedCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPress, setCanPress] = useState(true);

  // Set height and width of carousel based on style input,
  // handling either pixels or percentages
  let width;
  if (typeof props.style.width == 'number') width = props.style.width;
  else if (typeof props.style.width == 'string') {
    width = Dimensions.get('window').width * parseInt(props.style.width)/100;
  }

  useEffect(() => {
    if (typeof props.pressState !== 'undefined') props.pressState(canPress)
  }, [canPress])

  return (
      <View style={{width: width, height: width+8+11, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Carousel
              loop
              width={width}
              height={width}
              autoPlay={false}
              data={props.data}
              scrollAnimationDuration={300}
              onProgressChange={(offsetProgress, absoluteProgress) => {
                if (absoluteProgress % 1 != 0) setCanPress(false)
              }}
              onScrollEnd={(index) => {
                setActiveIndex(index);
                setCanPress(true);
              }}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
              renderItem={({ index }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  {props.content(index)}
                </View>
              )}
          />
        <View
            style={{alignItems: 'center', justifyContent: 'center', height: 8, marginTop: 11}}
        >
            <Pagination
                data={props.data}
                size={8}
                activeIndex={activeIndex}
              />
        </View>
      </View>
  );
}

const Pagination = (props) => {
  return (
      <View
          style={{flex: 1, flexDirection: 'row'}}
      >
          {props.data.map((element, index) => (
              <View
                  key={index}
                  style={{
                      marginLeft: props.size/2,
                      marginRight: props.size/2,
                      borderRadius: props.size,
                      width: props.size,
                      height: props.size,
                      backgroundColor: (props.activeIndex == index) ? '#5F5F5F' : '#A3A3A3'
                  }}
              />
          ))}
      </View>
  )
}
