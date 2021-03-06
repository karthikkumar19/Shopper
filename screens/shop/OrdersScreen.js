import React,{useEffect,useState} from 'react';
import {Text,FlatList, ActivityIndicator,StyleSheet,View} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';
import OrderItem from '../../components/Shop/OrderItem';
import * as orderActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        dispatch(orderActions.fetchOrder()).then(() => {
            setLoading(false);
        })
    },[dispatch])
if(loading){
    return(
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    )
}

if(orders.length === 0 ){
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
            <Text>No order is found , maybe start order some?</Text>
        </View>
    )
}

    return (
      <FlatList data={orders} keyExtractor={item => item.id} 
      renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} 
      date={itemData.item.readableDate} items={itemData.item.items} name={itemData.item.name}
      address={itemData.item.address} email={itemData.item.email} mobile={itemData.item.mobile} pincode={itemData.item.pincode}  />}
       />
    )
}


export const screenOptions =navData => {
    return{
        headerTitle: 'Your Orders',
        headerLeft : () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item title='Menu' iconName={'bars'} onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>,
       
    }
   
}

const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default OrdersScreen;
