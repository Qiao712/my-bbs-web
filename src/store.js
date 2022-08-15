/**
 * 全局储存
 */
import {reactive} from "vue"

const store = {
    state: reactive({
        currentUser: null
    }),

    setCurrentUser(user){
        this.state.currentUser = user
    }
}
export default store