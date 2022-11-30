import React, { useState, useEffect } from 'react';
import Stars from '../components/Stars';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import BackButton from '../components/BackButton';
import ProductReviewsGrid from '../components/ProductReviewsGrid';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { ImgCarousel } from '../components/ImgCarousel';
import Header from '../components/Header';

import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from '../config/firebase';

export default function ProductPage({ navigation, route }) {
  const { productId } = route.params;
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productBrand, setProductBrand] = useState('');
  const [productLink, setProductLink] = useState('');
  const [productRating, setProductRating] = useState(0.0);
  const [productNumRatings, setNumRatings] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [saved, setSaved] = useState(false);

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
    if (item.price%1==0) setProductPrice(item.price);
    else setProductPrice(item.price.toFixed(2));
    setProductBrand(item.brand);
    setProductLink(item.link);
    setProductRating(item.avgRating);
    setNumRatings(item.numRatings);

    const imageArr = [];
    imageSnap.docs.map(d => imageArr.push(d.data().url));
    setProductImages(imageArr);
  }

  return (
    <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
      <FocusAwareStatusBar barStyle='dark-content'/>
      <ScrollView>
        <Header navigation={navigation} title={productBrand} style={{marginBottom: 18}}/>
        <View
          style={styles.centered}
        >
          <ImgCarousel
            images={productImages}
            style={{ width: '100%' }}
          />
        </View>
        <View
          style={styles.infoSection}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.title, {width: '90%'}]} numberOfLines={2}>{productName}</Text>
            <TouchableOpacity onPress={() => setSaved(!saved)}>
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={28} color='black'/>
            </TouchableOpacity>
          </View>
          <Text
            style={[styles.info, styles.title]}
          >
            ${productPrice}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Stars
              rating={productRating}
              disabled={true}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={[styles.semiBold]}
            >
              {productRating}
            </Text>
            <Text
              style={[styles.text, {color: '#B0B0B0', marginLeft: 8}]}
            >
              ({productNumRatings} {productNumRatings == 1 ? 'review' : 'reviews'})
            </Text>
          </View>
          <TouchableOpacity
            style={{backgroundColor: '#D9D9D9', borderRadius: 9, height: 52, marginTop: 25, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => Linking.openURL(productLink)}
          >
            <Text style={styles.semiBold}>Purchase</Text>
          </TouchableOpacity>
          <Text style={[styles.semiBold, {fontSize: 20, marginTop: 36}]}>Tagged Reviews</Text>
        </View>
        <ProductReviewsGrid productId={productId} productName={productName} navigation={navigation}/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
  backButton: {
    fill: 1,
    paddingLeft: 20,
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  info: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  rightAlign: {
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 16,
    fontFamily: 'Plus-Jakarta-Sans',
  },
  semiBold: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
  }
});