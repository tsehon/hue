import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductsList from './ProductsList';
import CategoryButtonGrid from './CategoryButtons';

const Tab = createMaterialTopTabNavigator();

export default function SearchTabView({ data, dict, navigation }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const prods = [];
        const cats = [];
        const revs = [];

        for (e of data) {
            if (dict[e].type == 'product') prods.push(e);
            else if (dict[e].type == 'category') cats.push(dict[e].name);
            else if (dict[e].type == 'review') revs.push(dict[e]);
        }

        setProducts(prods);
        setCategories(cats);
        setReviews(revs);
    }, [])

    return (
    <Tab.Navigator sceneContainerStyle={{backgroundColor: 'white'}}>
        {/* <Tab.Screen name="Reviews" component={HomeScreen} /> */}
        <Tab.Screen
            name="Categories"
            children={() => 
                <ScrollView style={{padding: 10}}>
                    <CategoryButtonGrid categories={categories} flexBasis='100%' navigation={navigation} />
                </ScrollView>
            }
        />
        <Tab.Screen
            name="Products"
            children={() => 
                <ScrollView>
                    <ProductsList products={products} navigation={navigation}/>
                </ScrollView>}
        />
    </Tab.Navigator>
    );
}