import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native';

import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from '../config/firebase';

import Stars from './Stars';

function Product(props) {
    const productId = props.id;
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productRating, setProductRating] = useState(0.0);
    const [productImage, setProductImage] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const docRef = doc(db, 'products', productId);
        const imageRef = doc(db, 'products', productId, 'images', '1');
        const docSnap = await getDoc(docRef);
        const imageSnap = await getDoc(imageRef);

        const item = docSnap.data();
        setProductName(item.name);
        if (item.price%1==0) setProductPrice(item.price);
        else setProductPrice(item.price.toFixed(2));
        setProductRating(item.avgRating);

        const image = imageSnap.data();
        setProductImage(image.url);
    }

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                props.navigation.navigate('Product', { productId: productId });
            }}
        >
            <Image style={{width: 172, height: 172, borderRadius: 10}} source={{uri: productImage}} />
            <Text style={[styles.text, {marginTop: 9}]} numberOfLines={1}>{productName}</Text>
            <Text style={[styles.text, {marginTop: 3, marginBottom: 1}]}>${productPrice}</Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Stars
                    rating={productRating}
                    disabled={true}
                    starSize={14}
                    style={{alignSelf: 'center', marginLeft: -6}}
                    color='#FFB800'
                    emptyColor='#FFB800'
                />
                <Text
                    style={styles.subtext}
                >
                    {productRating}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default function ProductsGrid(props) {
    return (
        <View style={styles.flexGrid}>
            {props.products.map((element, index) => (
                <View key={index}>
                    <Product
                        key={index}
                        id={element}
                        navigation={props.navigation}
                    />
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    button: {
        width: 172,
        height: 249,
        marginBottom: 7,
        marginTop: 7
    },
    text: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans-Medium',
    },
    subtext: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'Plus-Jakarta-Sans',
    },
    flexGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});