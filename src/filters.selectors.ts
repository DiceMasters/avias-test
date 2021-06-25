import {createSelector} from '@reduxjs/toolkit'
import {StateType} from './store'

const selectFilterState = (state: StateType) => state.filters

export const selectFilterOptions = createSelector(
  selectFilterState,
  (s) => s.filtersOptions
)
export const selectFilters = createSelector(selectFilterState, (s) => s.filters)
export const selectGetIsFilter = createSelector(
  selectFilters,
  (filters) => (filterValue: number | null) => filters.includes(filterValue)
)

export const selectSort = createSelector(selectFilterState, (s) => s.sort)
export const selectSortOptions = createSelector(
  selectFilterState,
  (s) => s.sortOptions
)
