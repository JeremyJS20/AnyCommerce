import { createContext, Dispatch, PropsWithChildren, useEffect, useState } from "react";
import { cartProducts } from "../Utils/types.utils";

const defaultValue = {
    cart: [{
        productInfo: {
            id: '',
            name: '',
            cost: 0,
            stock: 0,
            category: '',
            dates:{
                creation: new Date()
            },
            rating: [0, null],
            img: '',
          },
          cartInfo: {
            amount: 0,
          }
    }],
    setCart: (cart:cartProducts[]): any => { }
}

export const CartContext = createContext(defaultValue);

const CartContextProvider = ({ children }: PropsWithChildren): JSX.Element => {

    const [cart, setCart] = useState<cartProducts[]|null|undefined>(JSON.parse(String(localStorage.getItem('cart'))) as cartProducts[]);
    
    useEffect(() => {
        const temp = JSON.stringify(cart);
        const temp2 = String(localStorage.getItem('cart'));
        
        if(temp !== temp2){
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    return (
        <CartContext.Provider value={{
            cart: cart as cartProducts[],
            setCart: setCart as Dispatch<cartProducts[]>
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;