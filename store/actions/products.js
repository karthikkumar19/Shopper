import  Product from '../../models/Product';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
// import {Notifications} from 'expo';

export const fetchProduct = () => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        try{
            const response = await fetch('https://shop-rn-5ba9d.firebaseio.com/products.json');
            if(!response.ok){
                throw new Error('something went Wrong!')
            }
            const resData = await response.json();
           const loadedProducts = [];
    
           for(const key in resData){
               loadedProducts.push(
                   new Product(
                       key,
                       resData[key].ownerId,
                       resData[key].title,
                       resData[key].imageUrl,
                       resData[key].description,
                       resData[key].price
                   )
               );
           }
           dispatch({type:SET_PRODUCT, products:loadedProducts,
             userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            // userProducts: loadedProducts
        })
        } catch (err) {
            // send custom
            throw err;
        }     
    }
}

export const deleteProduct = productId => {
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        await fetch(`https://shop-rn-5ba9d.firebaseio.com/products/${productId}.json?auth=${token}`,{
             method:'DELETE',
         });
         if(!response.ok){
            throw new Error('something went wrong')
        }
         dispatch(
             {
        type: DELETE_PRODUCT,
        pid:productId
    }
         )
     }
}

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch,getState) => {
        //any async code you want!
        // let pushToken;
        // let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        // if(statusObj.status !== 'granted'){
        //      statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        // }
        // if(statusObj.status !== 'granted'){
        //     pushToken = null;
        // }else{
        //     pushToken = await Notifications.getExpoPushTokenAsync();
        // }

        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://shop-rn-5ba9d.firebaseio.com/products.json?auth=${token}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId,
                ownerPushToken: ''
            })
        });
        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData:{
                id:resData.name,
                title,
                description,
                price,
                imageUrl,
                ownerId: userId
            }
        })
    }
  
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch,getState) => {
        const token = getState().auth.token;

      const response = await fetch(`https://shop-rn-5ba9d.firebaseio.com/products/${id}.json?auth=${token}`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        });
      
        if(!response.ok){
            throw new Error('something went wrong')
        }

        dispatch(
            {
                type: UPDATE_PRODUCT,
                pid: id,
                productData:{
                    title,
                    description,
                    
                    imageUrl
                }
            }
        )
    }
    
};

