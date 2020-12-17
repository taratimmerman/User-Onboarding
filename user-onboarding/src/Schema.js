import * as yup from 'yup';

export default yup.object().shape({
  name: yup
    .string()
    .required('Name is Required'),
  email: yup
    .string()
    .email('Must be an Email')
    .required('Email is Required'),
  password: yup
    .string()
    .required('Password is Required'),
  role: yup
    .string()
    .oneOf(['client', 'quality assurance', 'project manager', 'developer', ], 'Role is Required'),
  tos: yup
    .boolean(),
});

