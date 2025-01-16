const validateRegister = (req, res, next) => {
  const { 
    first_name, 
    last_name, 
    email, 
    telephone, 
    age,
    address,
    town,
    postcode,
    password 
  } = req.body;

  if (!first_name || !last_name || !email || !telephone || !age || !address || !town || !postcode || !password) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
}; 