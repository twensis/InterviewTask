import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle';

export default class SearchBox extends Component {
    render() {
        const {id, placeHolder, onChange, size, debounceTime} = this.props

        return (
            <Debounce time={debounceTime || 750 } handler="onChange">
                <input id={id} type="text" size={size || 30} placeholder={placeHolder || ""}
                       onChange={onChange}/>
            </Debounce>
        )
    }
}
SearchBox.propTypes = {
    id: PropTypes.string.isRequired,
    debounceTime: PropTypes.number,
    placeHolder:  PropTypes.string,
    size: PropTypes.number
}