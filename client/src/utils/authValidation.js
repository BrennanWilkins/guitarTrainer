export const validate = (email, pass) => {
  const emailTest = (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (email.length === 0 || pass.length === 0) {
    return 'Email and Password cannot be empty.';
  }
  if (!emailTest.test(email)) {
    return 'Please enter a valid email.';
  }
  if (pass.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  return '';
};
