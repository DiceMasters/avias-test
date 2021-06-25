import './style.scss'

import {ITicket, ITicketSegment} from './ITicket'

import {format, addMinutes, fromUnixTime} from 'date-fns'

interface ITicketsProps {
  items: ITicket[]
}

const Tickets = (props: ITicketsProps) => {
  const formatDuration = (minutes: number): string => {
    const unixTime = addMinutes(fromUnixTime(0), minutes)

    return format(unixTime, 'hhч mmм')
  }

  const tickets = props.items.map((v: ITicket, i: number) => {
    return (
      <div className="tickets__item" key={`ticket-${v.id}`}>
        <div className="tickets__item-price">{v.price}Р</div>

        <div className="tickets__item-carrier">{v.carrier}</div>

        <div className="tickets__item-segments">
          {v.segments.map((segment: ITicketSegment, index: number) => {
            return (
              <div className="tickets__segment">
                <div className="tickets__segment-attr">
                  <span>{`${segment.origin} + ${segment.destination}`}</span>
                  {format(new Date(segment.date), 'hh:mm') +
                    ' - ' +
                    format(
                      addMinutes(new Date(segment.date), segment.duration),
                      'hh:mm'
                    )}
                </div>

                <div className="tickets__segment-attr">
                  <span>В пути</span>
                  {formatDuration(segment.duration)}
                </div>

                <div className="tickets__segment-attr">
                  <span>{segment.stops.length} пересадки</span>
                  {segment.stops.join(', ')}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  })

  return <div className="tickets">{tickets}</div>
}

export default Tickets
