import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import './styles.scss'

import ButtonTumbler from './components/ButtonTumbler/ButtonTumbler'
import TransferFilter from './components/TransferFilter/TransferFilter'
import Tickets from './components/Tickets/Tickets'

import {IButtonTumblerItem} from './components/ButtonTumbler/ButtonTumbler'
import {ITicket, ITicketSegment} from './components/Tickets/ITicket'

import $api from './http'
import {AxiosResponse} from 'axios'
import {selectFilters} from './filters.selectors'
import {nanoid} from 'nanoid'

type TransferTypeValue = 'chipest' | 'fastest'

const App = () => {
  /**
   * State
   */
  const [ticketType, setTicketType] = useState<TransferTypeValue>('chipest')
  const [tickets, setTickets] = useState<ITicket[]>([])

  const ticketTypes: IButtonTumblerItem[] = [
    {value: 'chipest', name: 'Самый дешевый'},
    {value: 'fastest', name: 'Самый быстрый'}
  ]

  /**
   * Methods
   */
  const fetchSearchId = async (): Promise<any> => {
    try {
      const response: AxiosResponse = await $api.get<AxiosResponse>('/search')

      if (response.status === 200) {
        return response.data.searchId
      } else {
        console.warn(response.status, response.statusText)
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const fetchTickets = async (searchId: string = ''): Promise<any> => {
    if (searchId) {
      try {
        const response: AxiosResponse = await $api.get<AxiosResponse>(
          '/tickets',
          {
            params: {
              searchId: searchId
            }
          }
        )

        if (response.status === 200) {
          const id: string = nanoid()
          const dataTickets: ITicket[] = response.data.tickets.map(
            (v: ITicket) => ({...v, id})
          )
          const newTicketsBundle = [...tickets, ...dataTickets]

          setTickets(newTicketsBundle)

          if (!response.data.stop) {
            fetchTickets(searchId)
          }
        } else {
          console.warn(response.status, response.statusText)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error('SearchId is undefined or empty...')
    }
  }

  const updateTickets = async () => {
    const searchId: string = await fetchSearchId()

    setTickets([])
    fetchTickets(searchId)
  }

  const fitlterModes = useSelector(selectFilters)
  const filteredTickets = (): ITicket[] => {
    const dataTickets: ITicket[] = [...tickets]

    let requiredTickets: ITicket[] = []

    /**
     * Если не стоит фильтр: Все
     */
    if (!fitlterModes.includes(null)) {
      for (let i = 0; i <= dataTickets.length; i++) {
        const item: ITicket = {...dataTickets[i]}
        const itemStopLengthArr: number[] = item.segments
          ? item.segments.map((v: ITicketSegment) => v.stops.length)
          : []
        const itemMaxStop = Math.max(...itemStopLengthArr)

        if (fitlterModes.includes(itemMaxStop)) {
          requiredTickets = [...requiredTickets, item]
        }
      }

      return requiredTickets
    }

    return dataTickets
  }

  const sortedTickets = (tickets: ITicket[]): ITicket[] => {
    return tickets.sort((a: ITicket, b: ITicket) => {
      if (ticketType === 'chipest') {
        if (a.price < b.price) return -1
        if (a.price > b.price) return 1
        return 0
      } else {
        const aDuration = a.segments.reduce((acc, cur) => acc + cur.duration, 0)
        const bDuration = b.segments.reduce((acc, cur) => acc + cur.duration, 0)

        if (aDuration < bDuration) return -1
        if (aDuration > bDuration) return 1
        return 0
      }
    })
  }

  useEffect(() => {
    /**
     * Update sort/filter modes Effect
     */
    if (!tickets.length) {
      updateTickets()
    }
  }, [])

  return (
    <div className="App">
      <div className="App-layout">
        <div className="App-layout__transfer">
          <TransferFilter />
        </div>

        <div className="App-layout__tickets">
          <ButtonTumbler
            value={ticketType}
            items={ticketTypes}
            onChange={(value: TransferTypeValue) => setTicketType(value)}
          />

          <Tickets items={sortedTickets(filteredTickets())} />
        </div>
      </div>
    </div>
  )
}

export default App
