export const PublicRoutes = {
    HOME: '/',
    PRODUCTS: '/products',
    PRODUCTSWITHFILTERS: '/products?page=:page&filters=:filters&sort=:sort',

    STORES: '/stores',
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    FORGOTTENPASSWORD: '/forgottenpassword',
    RESETPASSWORD: '/resetpassword/:token'
}

export const PrivateRoutes = {
    DASHBOARD: '/dashboard',
    DASHBOARDACCOUNT: '/dashboard/account',
    DASHBOARDORDERS: '/dashboard/orders',
    DASHBOARDSTORES: '/dashboard/stores',
}