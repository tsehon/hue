import React, { useState, useEffect } from 'react';
import ImgCarousel from '../components/ImgCarousel';
import Stars from '../components/Stars';
import { StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';
// import { useFonts } from 'expo-font';
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from '../config/firebase';

export default function ProductPage({ navigation, route }) {
  // const [fontsLoaded] = useFonts({
  //   'Inter': require('../assets/fonts/Inter.ttf'),
  // });

  const { productId } = route.params;
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productBrand, setProductBrand] = useState('');
  const [productLink, setProductLink] = useState('');
  const [productRating, setProductRating] = useState(0.0);
  const [productNumRatings, setNumRatings] = useState(0);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const docRef = doc(db, 'products', productId);
    const imagesRef = collection(db, 'products', productId, 'images');
    const docSnap = await getDoc(docRef);
    const imageSnap = await getDocs(imagesRef);

    const item = docSnap.data();
    setProductName(item.name);
    setProductPrice(item.price);
    setProductBrand(item.brand);
    setProductLink(item.link);
    setProductRating(item.avgRating);
    setNumRatings(item.numRatings);

    const imageArr = [];
    imageSnap.docs.map(d => imageArr.push(d.data().url));
    setProductImages(imageArr);
  }

  // const itemConverter = {
  //     toFirestore: (item) => {
  //         return {
  //             name: item.name,
  //         };
  //     },
  //     fromFirestore: (snapshot, options) => {
  //       const data = snapshot.data(options);
  //       const id = snapshot.id;

  //       return new Product(id, data.name, data.price, data.brand,
  //         data.link, data.rating);
  //     }
  // };

  return (
    <ScrollView
      style={styles.page}
    >
      <View
        style={styles.centered}
      >
        <ImgCarousel
          images={productImages}
          style={{ width: 390 - 40 }}
        />
      </View>
      <View
        style={styles.infoSection}
      >
        <Text style={styles.title} numberOfLines={2}>{productName}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 4 }}>
          <View
            style={{ width: '40%' }}
          >
            <Text
              numberOfLines={1}
              style={[styles.info, styles.text]}
            >
              {productBrand}
            </Text>
            <Text
              style={[styles.info, styles.text]}
            >
              {productPrice}
            </Text>
          </View>
          <View
            style={[{ width: '60%' }, styles.rightAlign]}
          >
            <View style={[{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }, styles.info]}>
              <Stars
                rating={productRating}
                disabled={true}
                alignSelf={'flex-end'}
              />
              <Text styles={styles.text}>({productRating})</Text>
            </View>
            <Text
              style={[styles.info, styles.text]}
            >
              {productNumRatings} reviews
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    // fontFamily: 'Inter',
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
    // fontFamily: 'Inter',
  }
});