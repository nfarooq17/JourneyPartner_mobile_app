import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import { color } from 'react-native-reanimated';
import colors from '../config/colors'; 
import AuthContext from '../config/context';
import storage from '../config/storage';


export default function Onboar({navigation}) {
    const authContext = useContext(AuthContext)
    return (
        <Onboarding
        onSkip={()=>{navigation.navigate('Home'),storage.storeBoard(false)}}
        onDone={()=>{navigation.navigate('Home'),storage.storeBoard(false)}}
        containerStyles={{
            flex:1
        }}
        imageContainerStyles={
            {
                width:'0%',height:'55%',
               
                
        }
             }

        

          
        titleStyles={
            {
                
                 fontWeight:'900'     
            }
        }
        subTitleStyles={{
            
            marginBottom:40,
            fontWeight:'900'
            
        }}
            pages={
                [
                 {   backgroundColor:colors.green ,
                     image: <Image style={{marginTop:25}}  source={require('../assets/onboarding1.png')} />,
                     title:'Availability',
                     subtitle:'Travel Anywhere Any Time',
                     
                  
                     
                     
                 },
                 {   backgroundColor:"#1E5254",
                 image: <Image  source={require('../assets/onboarding2.png')} />,
                 title:'Commute',
                 subtitle:'Plan Your Journey With US',
                 
             },
             {
                backgroundColor:"#1E5254",
                image: <Image style={{marginLeft:30, marginTop:50}} source={require('../assets/onboarding3.png')} />,
                title:'Freindly Travel',
                subtitle:'Trust And Comfort Like You Travel With Friends'
             }
                ]
            }
        />
    );
}

const styles = StyleSheet.create({
   
})
