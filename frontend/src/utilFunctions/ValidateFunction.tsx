const validateNotEmpty = (value: string): boolean => {
  return value.trim() !== "";
};

const validateEmail = (value: string): boolean => {
  // Basic email validation example
  return /\S+@\S+\.\S+/.test(value);
};

const validatePassword = (value: string): boolean => {
  // Password validation example (e.g., minimum length)
  // Password must be at least 8 characters long and contain at least one uppercase letter,
  // one lowercase letter, one digit, and one special character
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return regex.test(value);
};

export { validateEmail, validateNotEmpty, validatePassword };
