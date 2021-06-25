import {configureStore} from '@reduxjs/toolkit'
import {filterSlice} from './sortTickets'

const store = configureStore({
  reducer: {
    filters: filterSlice.reducer
  }
})

export type StateType = ReturnType<typeof store.getState>

export default store
