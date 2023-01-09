import { StyleSheet, View, Text, TouchableOpacity, Button, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function ProductButton(props) {
    const productId = props.productId;
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Product', {
                productId: { productId },
            })}
        >
            <Text style={styles.buttonText}>{props.productID}</Text>
        </TouchableOpacity>
    );
}

export function ProductScrollView(props) {
    return (
        <ScrollView horizontal>
            {props.children}
        </ScrollView>
    );
}

export function ProductGrid(props) {
    return (
        <ProductButton title={props.title}></ProductButton>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EDEDED',
        width: 174,
        height: 84,
        margin: 10,
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 14,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        fontFamily: 'PlusJakartaSans-Regular',
    }
});