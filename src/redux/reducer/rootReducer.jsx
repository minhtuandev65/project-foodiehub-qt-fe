import StaffReducer from '../reducer/modules/StaffReducer'
import ManagerReducer from '../reducer/modules/ManagerReducer'
import AuthReducer from '../reducer/modules/AuthReducer'


export default {
    auth: AuthReducer,
    staff: StaffReducer,
    manager: ManagerReducer,
}
