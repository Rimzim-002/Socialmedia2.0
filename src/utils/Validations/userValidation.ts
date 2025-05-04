import * as yup from 'yup';

const passwordValidation = yup
  .string()
  .required('Password is required')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/,
    'Password must be at least 8 characters, include uppercase, lowercase, and a number/special character',
  );

const emailValidation = yup
  .string()
  .required('Email is required')
  .email('Invalid email format');

// Signup Schema
export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(20)
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters'),
  email: emailValidation,
  password: passwordValidation,
});

// Signin Schema
export const signinSchema = yup.object().shape({
  email: emailValidation,
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Update User Schema
export const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .optional()
    .min(2, 'Name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters'),
  email: yup.string().optional().email('Invalid email format'),
  password: passwordValidation.optional(),
});
