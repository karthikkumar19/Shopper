import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartItem = props => {
    return (
       <View style={styles.CartItem}>
           <Text style={styles.itemData}>
               <Text style={styles.quantity}>{props.quantity} </Text> <Text style={styles.mainText}>{props.title}</Text>
           </Text>
        <View style={styles.itemData}>
            <Text style={styles.mainText}>$ {props.amount.toFixed(2)}</Text>
           {props.deletable && ( <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                <Icon 
                name='md-trash' size={23} color='red' />
            </TouchableOpacity>
           )}
        </View>
       </View>
    )
}

const styles = StyleSheet.create({
    CartItem:{
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center'
    },
    quantity:{
        fontFamily:'open-sans-reg',
        color:'#888',
        fontSize:16
    },
    mainText:{
        fontFamily:'open-sans-reg',
        fontSize:16
    },
   
    deleteButton:{
        marginLeft:20
    }
})

export default CartItem
