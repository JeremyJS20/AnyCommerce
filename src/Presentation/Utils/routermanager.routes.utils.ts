export const PublicRoutes = {
    HOME: '/',
    PRODUCTS: '/products',
    PRODUCTSWITHFILTERS: '/products?page=:page&filters=:filters&sort=:sort',
    PRODUCTDETAILS: '/products/:id',

    STORES: '/stores',
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    FORGOTTENPASSWORD: '/forgottenpassword',
    RESETPASSWORD: '/resetpassword/:token'
}

export const PrivateRoutes = {
    ACCOUNT: '/account',
    MYPROFILE: 'myprofile',
    MYORDERS: 'myorders',
    MYPURCHASES: 'mypurchases',
    MYLISTS: 'mylists',
    MYPAYMENTMETHODS: 'mypaymentmethods',
    ACCOUNTFILTERS: '?page=:page&filters=:filters&sort=:sort',
    STORES: '/stores',
    DASHBOARD: '/dashboard',
    DASHBOARDACCOUNT: '/dashboard/account',
    DASHBOARDORDERS: '/dashboard/orders',
    DASHBOARDSTORES: '/dashboard/stores',
}