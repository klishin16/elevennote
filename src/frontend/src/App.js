import React  from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import NoteDetail from './components/NoteDetail';
import './App.css';

class App extends React.Component {
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
      edit_note: false, // + 1 подумать
      current_note: {},
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

  

  //handle enter
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

  //handle registaration
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

  //handle escape
  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, email: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };
  
  //========================================= API Functions ====================================

  //Получаем замeтки
  get_notes = () => {
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

  //Отобразить форму для создания новой заметки
  handle_create_note = () => {
    console.log("Создаем заметку");
    this.setState({
      edit_note: false,
      adding_note: true,
    });
  }

  //Отобразить форму редактирования заметки
  handle_edit_note = (note_id) => {
    var m;
    this.state.notes.map((note) => {
      if(note.id === note_id) {
        m = note;
      }
    })
    this.setState({
      current_note: m,
      adding_note: false,
      edit_note: true
    })
  }

  render() {
    //Форма входа и регистрации
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

    //Вывод списка заметок
    let notesList;
    if (this.state.got_notes && this.state.logged_in) {
      notesList = <NotesList notes={this.state.notes} handle_edit_note={(note_id) => this.handle_edit_note(note_id)}/>
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
          {this.state.logged_in && this.state.adding_note ? <CreateNote/> : null}
          {this.state.logged_in && this.state.edit_note ? <NoteDetail data={this.state.current_note}/> : null}
         </div>
        </div>
      
      </div>
    )
  }
}

export default App;