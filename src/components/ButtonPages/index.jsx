import { Component } from "react";
import './styles.css'

export class ButtonPages extends Component {
    render() {
        const {text, onClick, disabled} = this.props
        return (
            <button 
                className='button' 
                onClick={onClick}
                disabled={disabled}>
                {text}
            </button>
        )
    }
}