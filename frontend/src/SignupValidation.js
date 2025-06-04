function Validation(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid';

  if (!values.password) errors.password = 'Password is required';
  else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters';

  if (!values.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
  else if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match';

  if (!values.role) errors.role = 'Role is required'; // This enforces role selection

  return errors;
}

export default Validation;
