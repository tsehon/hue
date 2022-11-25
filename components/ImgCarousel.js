import React, { useState } from 'react';
import { Dimensions, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

// Takes in array of image links (props.images)
const ImgCarousel = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Set height and width of carousel based on style input,
    // handling either pixels or percentages
    let width;
    if (typeof props.style.width == 'number') width = props.style.width;
    else if (typeof props.style.width == 'string') {
      width = Dimensions.get('window').width * parseInt(props.style.width)/100;
    }

      return (
          <View style={{width: width, height: width+8+11, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Carousel
                  loop
                  width={width}
                  height={width}
                  autoPlay={false}
                  data={props.images}
                  scrollAnimationDuration={300}
                  onScrollEnd={(index) => setActiveIndex(index)}
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
                        <Image
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                          }}
                          source={{uri: props.images[index]}}
                        />
                      </View>
                  )}
              />
            <View
                style={{alignItems: 'center', justifyContent: 'center', height: 8, marginTop: 11}}
            >
                <Pagination
                    data={props.images}
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

  export default ImgCarousel;
