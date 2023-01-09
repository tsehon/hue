import React, { useState } from 'react';
import { StyleSheet, Text, Button, Alert, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import db from '../config/firebase';
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth();

export default function SignUpPage({navigation, route}) {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');

    async function signUp() {
        if (email === '' || displayName === '' || password === '') {
            Alert.alert('All fields must be completed')
            return;
        }
      
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await addUserToDB(response.user.uid);
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    async function addUserToDB(uid) {
        const docRef = await setDoc(doc(db, 'users', uid), {
            displayName: displayName,
        });
    }

    return (
        <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
            <FocusAwareStatusBar barStyle='dark-content'/>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={(text) => setEmail(text)}
                textContentType='username'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect='false'
                spellCheck='false'
                style={styles.input}
            />
            <TextInput
                placeholder='Display name'
                value={displayName}
                onChangeText={(text) => setDisplayName(text)}
                autoCapitalize='none'
                autoCorrect='false'
                spellCheck='false'
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={(text) => setPassword(text)}
                textContentType='newPassword'
                secureTextEntry
                autoCorrect='false'
                spellCheck='false'
                style={styles.input}
            />
            <Button
                title='Sign up'
                onPress={() => signUp()}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        padding: 70,
    },
    input: {
        fontSize: 18,
        fontFamily: 'PlusJakartaSans-Regular',
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 5,
        borderRadius: 6,
        marginBottom: 15,
    },
});