import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

export default function ImgHeader({img ,name }) {
    return (
        <View style={styles.container}>
            <Image
            source={require('../assets/profile.jpg')}
            style={styles.imgHeader}
            />
            <Text style={{size:10, fontWeight:'bold'}}>hello</Text>

        </View>
           )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
        
    },
    imgHeader:{
        marginTop:50,
        width:'100%',
        borderRadius:10,
        borderColor:'black'
        
    }
})
