import { FunctionComponent } from "react";

const icons:any = {
    search: 'fa-solid fa-magnifying-glass',
    cart: 'fa-solid fa-cart-shopping',
    sun: 'fa-regular fa-sun',
    moon: 'fa-regular fa-moon',
    globe: 'fa-solid fa-earth-americas',
    x: 'fa-solid fa-x',
    bars: 'fa-solid fa-bars',
    plus: 'fa-solid fa-plus',
    minus: 'fa-solid fa-minus',
    trash: 'fa-solid fa-trash',
    mail: 'fa-solid fa-envelope',
    key: 'fa-solid fa-key',
    eye: 'fa-solid fa-eye',
    eyeSlash: 'fa-solid fa-eye-slash',
    arrowDown: 'fa-solid fa-chevron-down',
    arrowRight: 'fa-solid fa-angle-right',
    doubleArrowRight: 'fa-solid fa-angles-right',
    arrowLeft: 'fa-solid fa-angle-left',
    doubleArrowLeft: 'fa-solid fa-angles-left',
    horizontalDots: 'fa-solid fa-ellipsis',
    verticalDots: 'fa-solid fa-ellipsis-vertical',
    starFilled: 'fa-solid fa-star',
    starHalfFilled: 'fa-regular fa-star-half-stroke',
    starEmpty: 'fa-regular fa-star',
    box: 'fa-solid fa-box-open',
    filter: 'fa-solid fa-filter',
    dollarSign: 'fa-solid fa-dollar-sign',
    list: 'fa-solid fa-list',
    sort: 'fa-solid fa-sort',
    heartEmpty: 'fa-regular fa-heart',
    heartFilled: 'fa-solid fa-heart',
    info: 'fa-solid fa-circle-info',
    user: 'fa-regular fa-circle-user',
    copyright: 'fa-regular fa-copyright',
    xTwitter: 'fa-brands fa-x-twitter ',
    instagram: 'fa-brands fa-instagram ',
    bell: 'fa-solid fa-bell',
    signOut: 'fa-solid fa-arrow-right-from-bracket',
    store: 'fa-solid fa-store',
    orders: 'fa-solid fa-bag-shopping',
    money: 'fa-solid fa-money-bill',
    moneyTransaction: 'fa-solid fa-money-bill-transfer',
    edit: 'fa-solid fa-pen',
    clock: 'fa-solid fa-clock',
    sliders: 'fa-solid fa-sliders',
    check: 'fa-solid fa-circle-check',
    question: 'fa-solid fa-circle-question',
    address: 'fa-solid fa-map-location-dot'
};

export const Icon: FunctionComponent<{icon: string, size: 'xs'|'sm'|'md'|'base'|'lg'|'xl'|'2xl'|'4xl'|'6xl', color?: string}> = ({ ...props }) => {

    const { icon, size, color} = props;

    return <i className={`${icons[icon]} ${color? props.color: 'text-inherit'} text-${size} `}></i>
};