
const GENERAL={
    HOME:'/home'
}

const USER = {
    PROFILE: '/profile'
}

const RESTAURANT={
    RES_DETAIL: '/restaurant/:restaurantId',
    RES_TABLE:'/restaurant/:restaurantId/table'
}


export default {
    ...USER,
    ...GENERAL,
    ...RESTAURANT
}