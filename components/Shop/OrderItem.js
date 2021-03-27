import React,{useState} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {

    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={styles.OrderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>$ {props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title= { showDetails ? 'Hide Details' : 'Show Details'}
            onPress={() => {
                setShowDetails(prevState => !prevState)
                console.log(showDetails,props.items)
            } } />
            {showDetails && 
                <View style={styles.detailItem}>
                    <View style={styles.detailContainer}> 
                    <Text style={{fontWeight:'bold',textAlign:'center',textDecorationStyle:'dotted',textDecorationLine:'underline',marginBottom:5,fontSize:18}}>Customer Details</Text>

                        <View style={styles.textContainer}>
                        <Text style={styles.textHeader}>Name:-  </Text>
                        <Text>{props.name}</Text>
                        </View>

                        <View style={styles.textContainer}>
                        <Text style={styles.textHeader}>Address:-  </Text>
                        <Text>{props.address}</Text>
                        </View>

                        <View style={styles.textContainer}>
                        <Text style={styles.textHeader}>Pincode:-  </Text>
                        <Text>{props.pincode}</Text>
                        </View>

                        <View style={styles.textContainer}>
                        <Text style={styles.textHeader}>Email:-  </Text>
                        <Text>{props.email}</Text>
                        </View>

                        <View style={styles.textContainer}>
                        <Text style={styles.textHeader}>Mobile:-  </Text>
                        <Text>{props.mobile}</Text>
                        </View>
                        
                       
                   

                    </View>
                    {props.items.map(cartItem => (
                        <CartItem 
                        key={cartItem.productId}
                        quantity={cartItem.quantity}
                        amount={cartItem.sum}
                        title={cartItem.productTitle} />
                    ))}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    OrderItem:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        margin:20,
        padding:10,
        alignItems:'center'
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        marginBottom:15
    },
    totalAmount:{
        fontFamily:'open-sans-reg',
        fontSize:16
    },
    date:{
        fontSize:16,
        fontFamily:'play-reg',
        color:'#888'
    },
    detailItem:{
        width:'100%'
    },
    detailContainer:{
        margin:20,
        padding:10
    },
    textContainer:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            padding:2
    },
    textHeader:{
                fontWeight:'bold'
    }
})

export default OrderItem
