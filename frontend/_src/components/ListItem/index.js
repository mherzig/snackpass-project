import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

import './listItem.scss'

dayjs.extend(duration)
dayjs.extend(relativeTime)

const ListItem = ({ index, style, data }) => {
  const {
    name,
    restaurant,
    quantityPurchased,
    lastPurchased
  } = data[index]

  const timeAgo = dayjs
    .duration(dayjs().diff(dayjs(lastPurchased)))
    .humanize()

  return (
    <div style={style} className="list-item">
      <div>
        <strong>{name}</strong> <em>@ {restaurant}</em>
      </div>
      <div>
        <span>Last ordered {timeAgo} ago</span>
        <span>{quantityPurchased} purchased recently</span>
      </div>
    </div>
  )
}

ListItem.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ListItem