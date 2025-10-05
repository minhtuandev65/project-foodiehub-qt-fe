import StaffReducer from '../reducer/modules/StaffReducer'
import ManagerReducer from '../reducer/modules/ManagerReducer'
import AuthReducer from '../reducer/modules/AuthReducer'
import AdminReducer from '../reducer/modules/AdminReducer'


export default {
    auth: AuthReducer,
    staff: StaffReducer,
    manager: ManagerReducer,
    admin: AdminReducer
}
