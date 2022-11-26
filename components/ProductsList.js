import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native';

import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from '../config/firebase';

import Stars from './Stars';

function Product(props) {
    const productId = props.id;
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productBrand, setProductBrand] = useState('');
    const [productCategory, setProductCategory] = useState('');
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
        setProductBrand(item.brand);
        setProductCategory(item.category);
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
            <View style={{flexDirection: 'row'}}>
                <View style={{width: '70%', justifyContent: 'center'}}>
                    <Text style={[styles.text]} numberOfLines={1}>{productName}</Text>
                    <Text style={[styles.subtext, {marginTop: 9, marginBottom: 8}]} numberOfLines={1}>{productBrand}   •   {productCategory}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Stars
                            rating={productRating}
                            disabled={true}
                            starSize={16}
                            style={{alignSelf: 'center', marginLeft: -6}}
                            color='#FFB800'
                            emptyColor='#FFB800'
                        />
                        <Text
                            style={[styles.subtext, {fontSize: 12}]}
                        >
                            {productRating}
                        </Text>
                    </View>
                </View>
                <Image style={{width: 91, height: 91}} source={{uri: productImage}} />
            </View>
        </TouchableOpacity>
    );
}

export default function ProductsList(props) {
    return (
        <View style={styles.flexGrid}>
            {props.products.map((element, index) => (
                <View key={index} style={index == 0 ? {} : {borderTopWidth: 1, borderTopColor: '#EBEBEB'}}>
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
        width: '100%',
        height: 135,
        padding: 12,
        paddingTop: 22,
        paddingBottom: 22,
    },
    text: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans-Medium',
    },
    subtext: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'Plus-Jakarta-Sans',
        color: '#B0B0B0',
    },
    flexGrid: {
        flexDirection: 'column',
    },
});