import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      //logged_in: localStorage.getItem('token') ? true : false,
      logged_in: false,
      email: '',
      got_notes: false,
      notes: [],
      adding_note: false, //---------------------------------------------подумать 
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ email: json.email });
        });
    }
  }

  componentDidUpdate() {
    if(this.state.logged_in && !this.state.got_notes) {
      //setTimeout(this.get_notes, 1000) //  -----------------------------убрать
      this.get_notes()
    }
  }

  

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/jwt-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({ 
          logged_in: true,
          displayed_form: '',
          email: json.user.email
        });
      });
  };

  get_notes = () => {
    //Получаем замeтки
    fetch("http://localhost:8000/api/notes", {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({ 
        notes: json,
        got_notes: true, 
      })
    });
  }

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          email: json.email
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, email: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  //handle добавить заметку
  handle_add_note = () => {
    console.log("Добавляем заметку...");
    var data = {
        'title': 'Я 2 заметка через API',
        'body': 'Что то про меня'
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

  //Отобразить форму для создания новой заметки
  handle_create_note = () => {
    console.log("Создаем заметку")
    this.setState({
      adding_note: true,
    });
  }

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    //Вывод заметок
    let notesList;
    if (this.state.got_notes && this.state.logged_in) {
      notesList = <NotesList notes={this.state.notes} />
    } else if(this.state.logged_in && !this.state.got_notes) {
      notesList = <p>Loading...</p>;
    } else {
      notesList = null;
    }
    let notesSidebar;
    if (this.state.logged_in) {
      notesSidebar = (
        <div>
          <p className="h2">Notes list</p>
          <button className="btn btn-outline-warning" onClick={() => this.handle_create_note()}>Create new note</button>
          <nav id="sidebar">
            {notesList}
          </nav>
        </div>
        
      )
    } else {
      notesList = null;
    }// Это все исправить 

    //Добавить заметку
    let addNote;
    if(this.state.logged_in && this.state.got_notes) {
      addNote = <button className='btn btn-danger' onClick={() => this.handle_add_note()}>Добавить запись</button>
    } else {
      addNote = null;
    }

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
          email={this.state.email}
        />
        {form}

        <div className="row">
         <div className="col-4">
          {notesSidebar}
         </div>

         <div className="col-8">
          {this.state.adding_note ? <CreateNote/> : null}
         </div>
        </div>
      
        
        {addNote}
      </div>
    );
  }
}

export default App;