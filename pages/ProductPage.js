import ImgCarousel from '../components/ImgCarousel';
import Stars from '../components/Stars';
import { StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

const ProductPage = (props) => {
  const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter.ttf'),
  });
  return (
    <View
      style={styles.page}
    >
      <View
        style={styles.centered}
      >
        <ImgCarousel
          images={[
            'https://m.media-amazon.com/images/I/716OsGt9a2S._AC_SX679_.jpg',
            'https://m.media-amazon.com/images/I/7177MvUbeIS._AC_SL1500_.jpg',
            'https://m.media-amazon.com/images/I/81vz-QbgyvS._AC_SX679_.jpg'
          ]}
          style={{ width: 390 - 40 }}
        />
      </View>
      <View
        style={styles.infoSection}
      >
        <Text style={styles.title} numberOfLines={2}>{props.name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 4 }}>
          <View
            style={{ width: '40%' }}
          >
            <Text
              numberOfLines={1}
              style={[styles.info, styles.text]}
            >
              {props.brand}
            </Text>
            <Text
              style={[styles.info, styles.text]}
            >
              {props.price}
            </Text>
          </View>
          <View
            style={[{ width: '60%' }, styles.rightAlign]}
          >
            <View style={[{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }, styles.info]}>
              <Stars
                rating={props.rating}
                disabled={true}
                alignSelf={'flex-end'}
              />
              <Text styles={styles.text}>({props.rating})</Text>
            </View>
            <Text
              style={[styles.info, styles.text]}
            >
              {props.numRatings} reviews
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    paddingTop: 60,
    flex: 1
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    padding: 20,
    paddingTop: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '700',
  },
  info: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  rightAlign: {
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter',
  }
});

export default ProductPage;