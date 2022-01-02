import Joi from 'joi';

const signupSchema = Joi.object({
  fname: Joi.string().alphanum().min(3).max(50).required().messages({
    '*': `fname should be a string of alphanumeric characters with 3-50 length`
  }),
  lname: Joi.string().alphanum().min(3).max(50).required().messages({
    '*': `lname should be a string of alphanumeric characters with 3-50 length`
  }),
  email: Joi.string().email().required().messages({
    '*': `email should be string type and valid`
  }),
  // .message('email is not valid')
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i
      )
    )
    .messages({
      '*': 'password should be at least 8 characters long, and contain min one digit and one special symbol'
    }),
  conf_password: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('conf_password')
    .messages({ 'any.only': '{{#label}} and password does not match' })
});

export { signupSchema };
