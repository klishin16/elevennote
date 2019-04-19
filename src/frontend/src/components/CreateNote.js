import React from 'react'

class CreateNote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            body: '',
        }
    }

    render() {

        return (
            <p>Здесь будет создаваться заметка</p>
        )
    }
}

export default CreateNote