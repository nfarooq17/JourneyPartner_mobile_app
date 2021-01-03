import React, { useState, useEffect, useCallback, useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'
import AuthContext from '../config/context'

const firebaseConfig = {
    apiKey: "AIzaSyCQNqyZgj-O5ViMIJlYrE1CWJ23SFcv_TU",
  authDomain: "journey-partner-65289.firebaseapp.com",
  databaseURL: "https://journey-partner-65289.firebaseio.com",
  projectId: "journey-partner-65289",
  storageBucket: "journey-partner-65289.appspot.com",
  messagingSenderId: "652487352209",
  appId: "1:652487352209:web:e71db6943ea363f7108430",
  measurementId: "G-JFGH73WFWV"
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatsRef = db.collection('chats')

export default function indTexting({route}) {
    const targetUser = route.params
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const authContext = useContext(AuthContext)
    const [messages, setMessages] = useState([])
    const [chatId, setChatId] = useState(null)

    function calculateChatId() {
        if(authContext.userDetails.docId > targetUser.id){
            return authContext.userDetails.docId+targetUser.id
        }else{
            return targetUser.id+authContext.userDetails.docId
        }
    }

    useEffect(() => {
        readUser()
        let chat = calculateChatId()

        const unsubscribe = chatsRef.where('chatId','==',chat).onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data() 
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [firebase])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
            console.log(messages+ 'Hello')
        },
        [messages]
    )

    async function readUser() {
            setUser({name: authContext.userDetails.name, _id: authContext.userDetails.docId})
        
    }
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        const writes = messages.map((m) => {
            m.chatId = calculateChatId()
            chatsRef.add(m)})
        await Promise.all(writes)
    }

       
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})
