import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import db from '../config/firebase';
import ListItemSwipeable from 'react-native-elements/dist/list/ListItemSwipeable';

const Searchbar = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const snapshot_products = await db.collection('products').get();
        const snapshot_categories = await db.collection('categories').get();
        const snapshot = snapshot_products + snapshot_categories;
        
        setData(snapshot);
        setItems(snapshot);
        setProducts(snapshot_products);
        setCategories(snapshot_categories)
    }

    const filterItems = (item) => {
        if (item.name.startsWith(query)) {
            return item.name;
        }
        items.splice(items.indexOf(item), 1); 
        return null;
    }

    const updateQuery = (input) => {
        setItems(data.slice());
        setQuery(input);
    }

    return (
        <View>
            <SearchBar
                onChangeText={ updateQuery }
                value={query}
                placeholder="Search for a product or category..."
                platform='ios'
            />
            <FlatList
                data={ data }
                scrollEnabled={false}
                keyExtractor = { (item) => item.name }
                extraData = { query }
                renderItem={({ item }) =>
                    <Text style={styles.dropdownitem}>{filterItems(item)}
                    </Text>} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: '90%',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    dropdownitem: {
        paddingLeft: 15,
        marginTop: 15,
        paddingBottom: 15,
        fontSize: 20,
        borderBottomColor: '#26a69a',
        borderBottomWidth: 1
    }
});

export default Searchbar;