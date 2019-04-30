import React  from 'react';

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
            <li id="noteItem" key={note.id} onClick={() => this.props.handle_edit_note(note.id)}>
                <h4>{note.title}</h4>
                <h5>{note.body}</h5>
                <hr/>
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