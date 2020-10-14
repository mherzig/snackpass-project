import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { getMoreItems } from '../../state/actions/trending'

import ListItem from '../ListItem'

const ListContainer = ({ itemData, hasMoreItems, callGetMoreItems }) => {
  // special case to start getting items
  if (!itemData.length && hasMoreItems) {
    callGetMoreItems()
  }

  const handleItemsRendered = ({
    overscanStopIndex,
    visibleStopIndex,
  }) => {
    if (overscanStopIndex === visibleStopIndex && hasMoreItems) {
      // if overscan is the same as visible, we have reached the bottom
      callGetMoreItems()
    }
  }

  return (
    <AutoSizer>
      {({ height, width }) => {
        const itemSize = width > 500 ? 60 : 100;

        return (
          <FixedSizeList height={height} width={width}
            itemCount={itemData.length} itemSize={itemSize}
            itemData={itemData} onItemsRendered={handleItemsRendered}>
              {ListItem}
          </FixedSizeList>
        )
      }}
    </AutoSizer>
  )
}

ListContainer.propTypes = {
  itemData: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMoreItems: PropTypes.bool.isRequired,
  callGetMoreItems: PropTypes.func.isRequired,
}

const mapStateToProps = ({
  trending: { items, nextPage },
}) => ({
  itemData: items,
  hasMoreItems: !!nextPage
})
const mapActionsToProps = dispatch => ({
  callGetMoreItems: () => dispatch(getMoreItems())
})

export default connect(mapStateToProps, mapActionsToProps)(ListContainer)