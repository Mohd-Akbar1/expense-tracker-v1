import {configureStore} from "@reduxjs/toolkit"
import transactionsReducer from "./slices/transactions.js"  
import userReducer from "./slices/user.js"

export default configureStore({
    reducer: {
        transactions: transactionsReducer,
        user: userReducer,
      
       
    },
})
