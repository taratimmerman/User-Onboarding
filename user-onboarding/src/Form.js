import React from 'react';

export default function Form(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = (event) => {
        event.preventDefault();
        submit();
      };

      const onChange = (event) => {
        const { name, value, type, checked } = event.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
      };

      return(
          <form onSubmit={onSubmit}>
              <div className='submit'>
                  <h2>User Onboarding</h2>
                  <div>
                      <div>{errors.name}</div>
                      <div>{errors.email}</div>
                      <div>{errors.password}</div>
                      <div>{errors.role}</div>
                      <div>{errors.tos}</div>
                  </div>
                  <label>
                      <input
                        placeholder='Name'
                        value={values.username}
                        onChange={onChange}
                        name='name'
                        type='text' 
                        />
                  </label>
                  <label>
                     <input
                        placeholder='Email'
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                     />
                  </label>
                  <label>
                     <input
                        placeholder='Password'
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                     />
                  </label>
                  <label>
                      <select onChange={onChange} value={values.role} name='role'>
                        <option value=''>- Select an option -</option>
                        <option value='client'>Client</option>
                        <option value='quality assurance'>Quality Assurance</option>
                        <option value='project manager'>Project Manager</option>
                        <option value='developer'>Developer</option>
                      </select>
                  </label>    
                  <label>
                      Terms of Service
                      <input
                        checked={values.tos}
                        onChange={onChange}
                        name='tos'
                        type='checkbox'
                      />
                  </label>
                  <button disabled={disabled}>Submit</button>
              </div>
          </form>
      );
};