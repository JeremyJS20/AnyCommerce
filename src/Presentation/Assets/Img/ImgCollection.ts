import anyCommerceIconLight from './anycommerce-icon-light.png';
import anyCommerceIconDark from './anycommerce-icon-dark.png';
import eCommerce from './ecommerce.jpg';
import visa from './visalogo.png';
import mastercard from './mastercardlogo.png';
import paypal from './paypallogo.png';
import discovercard from './discoverlogo.png';
import americanexpress from './americanexpresslogo.png';
import unknowncard from './unknowncardlogo.png';


export {
    anyCommerceIconLight,
    anyCommerceIconDark,
    eCommerce,
    visa,
    mastercard, 
    paypal
}


export type imgCollectionType = "mastercard" | "visa" | 'discovercard' | "americanexpress" | "unknowncard" | "anyCommerceLight" | "anyCommerceDark" | "ecommerce" | "paypal";

export const imgs: {
    visa: string,
    mastercard: string,
    discovercard: string,
    americanexpress: string,
    unknowncard: string,
    anyCommerceLight: string,
    anyCommerceDark: string,
    ecommerce: string,
    paypal: string
} = {
    visa: visa,
    mastercard: mastercard,
    discovercard: discovercard,
    americanexpress: americanexpress,
    unknowncard: unknowncard,
    anyCommerceDark: anyCommerceIconDark,
    anyCommerceLight: anyCommerceIconLight,
    ecommerce: eCommerce,
    paypal: paypal
}