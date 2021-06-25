import {useDispatch, useSelector} from 'react-redux'
import {filterSlice} from '../../store/sortTickets'
import {
  selectFilters,
  selectFilterOptions,
  selectGetIsFilter
} from '../../filters.selectors'
import './style.scss'

interface ITransferFilterProps {}

export interface ITransferFilterItem {
  value: null | number
  name: string
  active: boolean
}

const TransferFilter = (props: ITransferFilterProps) => {
  const dispatch = useDispatch()
  const filterOptions = useSelector(selectFilterOptions)
  const getIsFilter = useSelector(selectGetIsFilter)

  const handleChange = (value: ITransferFilterItem) => {
    dispatch(filterSlice.actions.checkFilter(value.value))
  }

  const transferItems = filterOptions.map((v, i) => {
    return (
      <div className="transfer-filter__list-item" key={`transfer-${i}`}>
        <label>
          <input
            type="checkbox"
            checked={getIsFilter(v.value)}
            onChange={() => handleChange(v)}
          />
          {v.name}
        </label>
      </div>
    )
  })

  return (
    <div className="transfer-filter">
      <div className="transfer-filter__title">Колличество пересадок</div>
      <div className="transfer-filter__list">{transferItems}</div>
    </div>
  )
}

export default TransferFilter
