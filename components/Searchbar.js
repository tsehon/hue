import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';

/*
const [isSearching, setIsSearching] = useState(false);

const onSearch = (text) => {
    setIsSearching(true);
}

const Dropdown = (props) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={ props.items }
                renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
            />
        </View>
    );
}
*/

const fetchData = async () => {
    const res = await fetch('some api data');
    const json = await res.json();
    setData(json);
    setItems(json.slice());
}

const Searchbar = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);

    return (
        <View>
            <TextInput
                style={styles.searchbar}
                placeholder="Search"
                onChangeText={newText => setSearchText(newText)}
                defaultValue={searchText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchbar: {
        height: 40,
        width: '90%',
        paddingHorizontal: 10,
        alignSelf: 'center',
        // textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
});

export default Searchbar;