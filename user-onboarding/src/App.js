import React, { useState, useEffect } from "react";
import './App.css';
import Form from './Form';
import User from './User';
import schema from './Schema';
import axios from 'axios';
import * as yup from "yup";

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  role: '',
  tos: false
};

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  role: ''
}


const initialUsers = [];
const initialDisabled = true;

function App() {

  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    axios
        .get('https://reqres.in/api/users')
        .then((res) => {
          setUsers([res.data, ...users]);
          setFormValues(initialFormValues);
        })
        .catch((err) => {
          console.log(err);
        });
};

const postNewUser = (newUser) => {
  axios
    .post('https://reqres.in/api/users', newUser)
    .then((res) => {
      setUsers([res.data, ...users]);
      setFormValues(initialFormValues);
    })
    .catch((err) => {
      console.log(err);
    });
};

const inputChange = (name, value) => {
  yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    })
    .catch((err) => {
      setFormErrors({
        [name]: err.errors[0],
      });
    });

  setFormValues({
    ...formValues,
    [name]: value,
  });
};

const formSubmit = () => {
  const newUser = {
    name: formValues.name.trim(),
    email: formValues.email.trim(),
    role: formValues.role.trim()
  }
  postNewUser(newUser);
};

useEffect(() => {
  getUsers();
}, []);

useEffect(() => {
  schema.isValid(formValues).then((valid) => {
    setDisabled(!valid);
  });
}, [formValues]);

  return (
    <div className="App">
      <Form 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {users.map((user) => {
        return <User key={user.id} details={user} />;
      })}
    </div>
  );
}

export default App;
