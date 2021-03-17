import React,{useState} from 'react';
import {View,Text,FlatList,StyleSheet,Button, ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/Shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {

    const [loading, setLoading] = useState(false);
const cartTotalAmount = useSelector(state => state.cart.totalAmount);
const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for(const key in state.cart.items){
        transformedCartItems.push({
            productId : key,
            productTitle: state.cart.items[key].productTitle,
            productPrice: state.cart.items[key].productPrice,
            quantity: state.cart.items[key].quantity,
            sum: state.cart.items[key].sum
        })
    }
    return transformedCartItems.sort((a,b) => 
    a.productId > b.productId ? 1 : -1 );
})

const dispatch = useDispatch();

const sendOrderHandler = async () => {
    console.log(cartItems)
    setLoading(true);
    try{
        await dispatch(ordersActions.addOrder(cartItems,cartTotalAmount));
        setLoading(false)
    } catch(err){
        console.log(err)
    }
}
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text></Text>
                { loading ? <ActivityIndicator size='small'color={Colors.primary} /> : 
                 <Button color={Colors.accent} title='Order Now' disabled={cartItems.length === 0}
                onPress={sendOrderHandler}/> }
               
            </View>
       <FlatList data={cartItems} keyExtractor={item => item.productId} 
       renderItem={itemData => <CartItem quantity={itemData.item.quantity} title={itemData.item.productTitle}
       deletable
       amount={itemData.item.sum} onRemove={() => {
            dispatch(cartActions.removeFromCart(itemData.item.productId))
       }}  />}/>
        </View>
    )
}

export const screenOptions = {
    headerTitle:' Your Cart'
}

const styles = StyleSheet.create({
    screen:{
        margin:20
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
    },
    summaryText:{
        fontSize:18,
        fontFamily:'open-sans-reg'
    },
    amount:{
        color:Colors.primary
    }
})

export default CartScreen
