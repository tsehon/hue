import React, { useState } from 'react';
import { StyleSheet, Text, Button, Alert, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { functions } from '../config/firebase';
import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";

const auth = getAuth();
const createUser = httpsCallable(functions, 'createUser');

export default function SignUpPage({navigation, route}) {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');

    async function signUp() {
        if (email === '' || displayName === '' || password === '') {
            Alert.alert('All fields must be completed')
            return;
        }
        if (!displayName.match(/^[a-zA-Z0-9.\-_]+$/)) {
            Alert.alert('Username must consist of valid characters')
            return;
        }
        if (displayName.length < 4) {
            Alert.alert('Username must be at least four characters long')
            return;
        }
      
        try {
            // Send a request to the backend to validate input and create user
            const result = await createUser({
                email: email,
                displayName: displayName,
                password: password,
            })
            // If account successfully created, sign in to it
            if (result) {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            Alert.alert(error.message)
        }
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