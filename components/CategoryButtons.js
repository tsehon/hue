import { StyleSheet, View, Text, TouchableOpacity, Button, ScrollView } from 'react-native'

function CategoryButton(props) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                props.navigation.push('ReviewFeed', {
                    searchType: 'categoryName',
                    searchQuery: props.title,
                });
            }}
        >
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export function CategoryButtonScrollView(props) {
    return (
        <ScrollView horizontal>
            { props.children }
        </ScrollView>
    );
}

export default function CategoryButtonGrid(props) {
    return (
        <View style={styles.flexGrid}>
            {props.categories.map((element, index) => (
                <View style={styles.gridButton} key={index}>
                    <CategoryButton
                        key={index}
                        title={element}
                        navigation={props.navigation}
                    />
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EDEDED',
        // width: 174,
        width: 180,
        height: 84,
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 14,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        fontFamily: 'Plus-Jakarta-Sans',
    },
    flexGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridButton: {
        marginTop: 8,
    }
});