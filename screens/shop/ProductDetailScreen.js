import React ,{useState}from 'react';
import {ScrollView,View,Text,Image,Button,StyleSheet,TouchableOpacity} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import AwesomeAlert from 'react-native-awesome-alerts';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen= props => {
    const [showAlert,setShowAlert] = useState(false);

    const dispatch = useDispatch();
const productId = props.route.params.productId;
const selectedProduct = useSelector(state =>
     state.products.availableProducts.find(prod => prod.id === productId))

    const showAlertFunction = () => {
        setShowAlert(true)
      };
     
    const  hideAlert = () => {
       setShowAlert(false)
      };

    return (
       <ScrollView>
           <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
           <View style={styles.actions}>
           <Button color={Colors.primary} title='Add to Cart' onPress={() => {
               dispatch(cartActions.addToCart(selectedProduct))
               showAlertFunction();
           }} />

           </View>
           <Text style={styles.price}>$ {selectedProduct.price.toFixed(2)}</Text>
           <Text style={styles.description}>{selectedProduct.description}</Text>
           <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title=""
          message={selectedProduct.title + " " + 'added to cart'}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
        //   cancelText="No, cancel"
          confirmText="Okay"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            hideAlert();
          }}
        />
       </ScrollView>
    )
}
export const screenOptions = navData => {
    return{
        headerTitle:navData.route.params.productTitle
    }
}

const styles = StyleSheet.create({
image:{
    marginTop:10,
    width:'100%',
    height:300
},
actions:{
marginVertical:10,
alignItems:'center'
},
price:{
    fontSize:20,
    color:'#888',
    textAlign:'center',
    marginVertical:20,
    fontFamily:'open-sans-reg'
},
description:{
    fontSize:14,
    textAlign:'center',
    marginHorizontal:20,
    fontFamily:'open-sans-reg'

}
})

export default ProductDetailScreen
