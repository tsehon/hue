import { MaterialIcons   } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function BackButton({ navigation }) {
    return (
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
            <MaterialIcons
                name="chevron-left"
                size={48}
                color="white"
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        fill: 1,
      },
})