import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function toSelectors(selectors) {
  return function mapStateToProps(state) {
    return selectors.reduce((combinedProps, selector) => {
      if (!selector.name)
        throw new Error('`name` (String) export required for every connected selector', selector)

      if (!selector.select)
        throw new Error('`select` (Function) export required for every connected selector', selector)

      return {
        ...combinedProps,
        [selector.name]: selector.select(state)
      }
    }, {})
  }
}

function toActions(actions) {
  return function mapDispatchToProps(dispatch) {
    return (actions || []).reduce((combinedActionCreators, action) => {
      const { name, ...actionFns } = action
      if (!name)
        throw new Error('`name` (String) export required for every connected action')

      return {
        ...combinedActionCreators,
        [name]: bindActionCreators(actionFns, dispatch)
      }
    }, {})
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  // TODO: test for clobbering names
  const combinedStateAndActions = Object.keys(dispatchProps).reduce((acc, key) => {
    acc[key] = {
      ...acc[key],
      ...dispatchProps[key]
    }
    return acc
  }, stateProps)

  return {
    ...ownProps,
    ...combinedStateAndActions
  }
}

export default function connectTo(selectors, actions) {
  return connect(toSelectors(selectors), toActions(actions), mergeProps)
}
