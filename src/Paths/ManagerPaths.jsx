
const GENERAL = {
    GENERAL: 'manager/general'
}

const USER = {
    LIST_CV: 'manager/list-cv',
    LIST_USER: 'manager/list-user',
    LIST_RES: 'manager/list-restaurant',
}

const RESTAURANT={
    RES_DETAIL: 'manager/restaurant/:restaurantId',
    RES_TABLE:'manager/restaurant/:restaurantId/table'
}


export default {
    ...USER,
    ...GENERAL,
    ...RESTAURANT
}