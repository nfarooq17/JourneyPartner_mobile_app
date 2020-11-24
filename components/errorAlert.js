import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function errorAlert({error , visible }) {
    if(!visible || !error) return null;
    return (
        <View>
            <Text style={styles.error}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    error:{
        color:"red",
    }
})
