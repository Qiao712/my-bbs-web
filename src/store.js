/**
 * 全局储存
 */
import {reactive} from "vue"
import messageApi from "./api/messageApi"

const store = {
    state: reactive({
        currentUser: null,
        privateMessageCount: 0, //未读私信数量
        systemMessageCount: 0,  //未读系统消息数量
    }),

    setCurrentUser(user){
        this.state.currentUser = user
    },

    //刷新未读消息数量
    refreshMessageCount(){
        if(this.state.currentUser){
            messageApi.getUnacknowledgedPrivateMessageCount().then(
                response => this.state.privateMessageCount = response.data
            )
    
            messageApi.getUnacknowledgedSystemMessageCount().then(
                response => this.state.systemMessageCount = response.data
            )
        }
    }
}
export default store