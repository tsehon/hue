import { ScrollView, ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import SearchPage from "../pages/SearchPage";
import { Feather } from '@expo/vector-icons'

export default function UploadReviewSearch({ navigation, route, onSelect }) {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flexGrow: 20}}>
                <SearchPage navigation={navigation} route={route} productsOnly={true} ></SearchPage>
            </View>
            <View style={{flexGrow: 1, padding: 10}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddProduct', {
                        fromUpload: true,
                    })}
                    style={styles.postButton}>
                    <Text style={styles.postButtonText}>Add new product</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    postButton: {
        alignItems: 'center',
        flexGrow: 2,
        backgroundColor: '#B3B3B3',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 5,
    },
    postButtonText: {
        marginLeft: 5,
        fontFamily: 'PlusJakartaSans-SemiBold',
        fontSize: 16
    }
})