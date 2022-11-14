import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { collection, connectFirestoreEmulator, getDocs } from "firebase/firestore";

import db from '../config/firebase';
import SearchItem from '../lib/SearchItem';

const Searchbar = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const snapshot_products = await getDocs(collection(db, 'products').withConverter(itemConverter));
        const snapshot_categories = await getDocs(collection(db, 'categories').withConverter(itemConverter));
        console.log("fetching data..");

        const newData = [];
        snapshot_products.forEach((doc) => {
            let item = doc.data();
            item.setType("product");
            newData.push(item);
        });
        snapshot_categories.forEach((doc) => {
            let item = doc.data();
            item.setType("category");
            newData.push(item);
        });

        console.log(newData);
        setData(newData);
        setItems(newData.slice());
    }

    const itemConverter = {
        toFirestore: (item) => {
            return {
                name: item.name,
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            const id = snapshot.id;
            return new SearchItem(data.name, id);
        }
    };

    const filterResults = (input) => {
        console.log("called: filterResults");

        input = input.toLowerCase();
        setQuery(input);

        if (input != '') {
            const results = data.filter((item) => {
                const name = item.name ? item.name.toLowerCase() : ''.toLowerCase();
                const match = input.toLowerCase();
                return name.indexOf(match) > -1;
            });

            setItems(results);
        } else {
            setItems(data.slice());
        }

        console.log("query matched items: " + items);
    }

    const getItem = (item) => {
        console.log("redirecting to: " + item.name);
        alert('name: ' + item.name);
    };

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                onChangeText={filterResults}
                value={query}
                placeholder="Search for a product or category..."
                platform='ios'
            />
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                extraData={query}
                renderItem={({ item }) => 
                    <Text style={styles.dropdownitem} onPress={(item) => getItem(item)}>
                        {item.name}
                    </Text>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        paddingHorizontal: 10,
        alignSelf: 'center',
    },
    dropdownitem: {
        backgroundColor: 'black',
        paddingLeft: 15,
        marginTop: 15,
        paddingBottom: 15,
        fontSize: 20,
        borderBottomColor: '#26a69a',
        borderBottomWidth: 1
    }
});

export default Searchbar;