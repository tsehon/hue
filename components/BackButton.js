import { Feather } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native-elements';

export default function BackButton(props) {
    return (
        <View>
            <TouchableOpacity
                onPress={() => { props.onPress() }}
            >
                <Feather
                    name="arrow-left"
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );
}