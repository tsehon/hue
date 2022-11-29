import { ScrollView, ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SearchPage from "../pages/SearchPage";

export default function UploadReviewSearch({ navigation, route, onSelect }) {
    return (
        <SearchPage navigation={navigation} route={route} productsOnly={true} ></SearchPage>
    )
}