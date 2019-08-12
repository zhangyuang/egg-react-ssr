import React, { Component } from 'react'

function OnlyCsr (WrappedComponent) {
  class OnlyCsrClass extends Component {
    constructor (props) {
      super(props)
      this.state = {
        isCsr: false
      }
    }

    componentDidMount () {
      this.setState({
        isCsr: true
      })
    }

    render () {
      return this.state.isCsr ? <WrappedComponent {...this.props} /> : <div />
    }
  }
  for (const key in WrappedComponent) {
    OnlyCsrClass[key] = WrappedComponent[key]
  }
  return OnlyCsrClass
}

export default OnlyCsr
