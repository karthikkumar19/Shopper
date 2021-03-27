import React from 'react';
import {View,Text,StyleSheet,ImageBackground,Dimensions,
    TouchableNativeFeedback,TouchableOpacity,Platform} from 'react-native';



const CategoryList = props => {

    let Touchablecmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        Touchablecmp = TouchableNativeFeedback
    }

    return(
        <Touchablecmp onPress={props.onSelect} >
 <View style={styles.Product}>
     
            <ImageBackground blurRadius={5} style={styles.image} source={{uri:props.image}}>
            <Text style={styles.title}>{props.title}</Text>

            </ImageBackground>

            
            
            <View style={styles.actions}>
               {props.children}
            </View>
        </View>
        </Touchablecmp>
       
    )
}

const styles = StyleSheet.create({
Product:{
    shadowColor:'black',
    shadowOpacity:0.26,
    shadowOffset:{width:0,height:2},
    shadowRadius:8,
    elevation:5,
    borderRadius:10,
    backgroundColor:'white',
    height:150,
    width:Dimensions.get('window').width / 2.2 ,
    margin:8,
},
image:{
    width:'100%',
    height:'100%',
    borderRadius:10,
overflow:'hidden',
},
imageContainer:{
width:'100%',
height:'60%',

},
title:{
    fontSize:20,
    color:'white',
   textAlign:'center',
   fontFamily:'OpenSans-Bold',
   marginTop:60
},
price:{
    fontSize:14,
    color:'#888',
    fontFamily:'open-sans-reg'
},
actions:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:'25%',
    paddingHorizontal:20
},
details:{
    alignItems:'center',
    height:'15%',
    padding:10,
    zIndex:1
}
})

export default CategoryList;