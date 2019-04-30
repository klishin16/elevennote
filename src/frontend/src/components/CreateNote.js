import React from 'react'

import "./css/CreateNote.css"

class CreateNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
        }
    }

    //handl взывается при изменение любого поля формы
    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    //handle добавить заметку
    handle_create_note = (e, data) => {
        e.preventDefault();
        //console.log(data);
        var data = {
            'title': this.state.title,
            'body': this.state.body
        }
        fetch("http://localhost:8000/api/notes", {
            method: 'POST',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    }

    render() {
        return (
            <div id="warp">
                <p className="h2">Create new note form</p>
                <form onSubmit={(e) => this.handle_create_note(e, this.state)}>
                    <div className="form-group">
                        <label htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control" id="inputTitle" name="title" placeholder="Enter title" onChange={this.handle_change} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Note body</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="body" placeholder="Enter node body" onChange={this.handle_change}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Note</button>
                </form>
            </div>
        )
    }
}

export default CreateNote