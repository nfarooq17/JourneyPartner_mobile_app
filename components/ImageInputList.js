import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({imageUris = [], onRemoveImage, onAddImage}) {
    const scrollView = useRef();
    return (
        <View>
        <ScrollView ref={scrollView} horizontal onContentSizeChange={() => scrollView.current.scrollToEnd()
        }>
        <View style ={styles.container}>
            {imageUris.map((uri) =>(
            <View style = {styles.image} key={uri}>
                <ImageInput imageUri={uri} 
                            onChangeImage = {() => onRemoveImage(uri)}/>
            </View>
             ))}
            <ImageInput onChangeImage = {uri => onAddImage(uri)}></ImageInput>
        </View>
        </ScrollView></View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: '#1E5254'
    },
    image: {
        marginRight: 10
    }
})

export default ImageInputList;