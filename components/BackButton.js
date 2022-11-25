import { MaterialIcons   } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function BackButton({ navigation, size, color, style }) {
    return (
        <TouchableOpacity
            style={[styles.backButton, style]}
            onPress={() => navigation.goBack()}
        >
            <MaterialIcons
                name="chevron-left"
                size={size}
                color={color}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        fill: 1,
      },
})