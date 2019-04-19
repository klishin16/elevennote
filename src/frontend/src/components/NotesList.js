import React  from 'react';
import PropTypes from 'prop-types';

import "./css/NotesList.css"

class NotesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            notes: props.notes,
        }
    }
    render() {
        const listItems = this.state.notes.map((note) => 
            <li key={note.id}>
                <h4>{note.title} Id = {note.id}</h4>
            </li>
        );
        return (
            <ul id="notes">
                { listItems }
            </ul>
        );
    }
}

export default NotesList