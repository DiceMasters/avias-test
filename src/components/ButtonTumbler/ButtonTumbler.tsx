import {useDispatch, useSelector} from 'react-redux'
import {filterSlice} from '../../store/sortTickets'
import {selectSort, selectSortOptions} from '../../filters.selectors'
import './style.scss'

interface IButtonTumblerProps {
  value: string
  items: IButtonTumblerItem[]
  onChange: Function
}

export interface IButtonTumblerItem {
  value: string
  name: string
}

const ButtonTumbler = (props: IButtonTumblerProps) => {
  const dispatch = useDispatch()
  const sort = useSelector(selectSort)
  const sortOptions = useSelector(selectSortOptions)

  const buttonItems = sortOptions.map((v, i) => {
    return (
      <div
        className={`button-tumbler__item ${
          sort === v.value ? 'button-tumbler__item_active' : ''
        }`}
        key={`button-tumbler-${i}`}
      >
        <button onClick={() => dispatch(filterSlice.actions.setSort(v.value))}>
          {v.name}
        </button>
      </div>
    )
  })

  return <div className="button-tumbler">{buttonItems}</div>
}

export default ButtonTumbler
