import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ITransferFilterItem} from './../components/TransferFilter/TransferFilter'
import {ITicket, ITicketSegment} from './../components/Tickets/ITicket'

interface IFiltersState {
  filtersOptions: {value: number | null; name: string}[]
  sortOptions: {value: string; name: string}[]
  filters: (number | null)[]
  sort: string | null
}

const initialState: IFiltersState = {
  filtersOptions: [
    {value: null, name: 'Все'},
    {value: 0, name: 'Без пересадок'},
    {value: 1, name: '1 пересадка'},
    {value: 2, name: '2 пересадки'},
    {value: 3, name: '3 пересадки'}
  ],
  sortOptions: [
    {value: 'chipest', name: 'Самый дешевый'},
    {value: 'fastest', name: 'Самый быстрый'}
  ],
  filters: [null],
  sort: null
}

export const filterSlice = createSlice({
  name: 'filter',
  reducers: {
    checkFilter(state, action: PayloadAction<number | null>) {
      const filterId = action.payload
      if (state.filters.includes(filterId)) {
        state.filters = state.filters.filter((f) => f !== filterId)
      } else {
        state.filters.push(filterId)
      }
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload
    }
  },
  initialState
})
