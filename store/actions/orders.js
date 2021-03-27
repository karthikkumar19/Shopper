export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SER_ORDER';
import Order from '../../models/order';

export const fetchOrder = () => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        try{
            const response = await fetch(`https://shop-rn-5ba9d.firebaseio.com/orders/${userId}.json`);
            if(!response.ok){
                throw new Error('something went Wrong!')
            }
            const resData = await response.json();
           const loadedOrders = [];
    
           for(const key in resData){
               loadedOrders.push(
                   new Order (
                       key,
                       resData[key].cartItems,
                       resData[key].totalAmount,
                       resData[key].name,
                       resData[key].address,
                       resData[key].email,
                       resData[key].mobile,
                       resData[key].pincode,
                       new Date(resData[key].date)
                   )
               );
           }
           dispatch({type:SET_ORDER, orders:loadedOrders})
        } catch (err) {
            // send custom
            throw err;
        }   
    }
}

export const addOrder = (cartItems, totalAmount,name, address,email,mobile,pincode) => {
    return async (dispatch,getState) => {
        const date = new Date();
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        //any async code you want!
        const response = await fetch(`https://shop-rn-5ba9d.firebaseio.com/orders/${userId}.json?auth=${token}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               cartItems,
               totalAmount,
               name,
               address,
               email,
               mobile,pincode,
               date: date.toISOString()
            })
        });
        if(!response.ok){
            throw new Error('something went wrong!')
        }
        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData:{
                id:resData.name,
                items:cartItems, amount:totalAmount,
                name:name,
                address:address,
                email:email,
                mobile:mobile,
                pincode:pincode,
                 date:date
            }
        })
    }
   
}