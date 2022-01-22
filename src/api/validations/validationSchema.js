import Joi from 'joi';

const signupSchema = Joi.object({
  fname: Joi.string()
    .pattern(/^[a-zA-Z\.]+$/i)
    .min(3)
    .max(30)
    .required()
    .messages({
      '*': `fname can only cotain alphabets and . (dot), and should be 3-30 characters long`
    }),
  lname: Joi.string()
    .pattern(/^[a-zA-Z\.]+$/i)
    .min(3)
    .max(30)
    .required()
    .messages({
      '*': `lname can only cotain alphabets and . (dot), and should be 3-30 characters long`
    }),
  email: Joi.string().email().required().messages({
    '*': `email should be string type and in valid format`
  }),
  // .message('email is not valid')
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|])[A-Za-z\d-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]{8,}$/i
      )
    )
    .messages({
      '*': 'password should be at least 8 characters long, and contain min one digit and one special symbol'
    })
});

const resetPassSchema = Joi.object({
  email: Joi.string().email().required().messages({
    '*': `email should be string type and in valid format`
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|])[A-Za-z\d-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]{8,}$/i
      )
    )
    .messages({
      '*': 'password should be at least 8 characters long, and contain min one digit and one special symbol'
    })
});

const userUpdateSchema = Joi.object({
  fname: Joi.string()
    .pattern(/^[a-zA-Z\.]+$/i)
    .min(3)
    .max(30)
    .messages({
      '*': `fname can only cotain alphabets and . (dot), and should be 3-30 characters long`
    }),
  lname: Joi.string()
    .pattern(/^[a-zA-Z\.]+$/i)
    .min(3)
    .max(30)
    .messages({
      '*': `lname can only cotain alphabets and . (dot), and should be 3-30 characters long`
    }),
  email: Joi.string().email().messages({
    '*': `email should be string type and in valid format`
  }),
  // .message('email is not valid')
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|])[A-Za-z\d-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]{8,}$/i
      )
    )
    .messages({
      '*': 'password should be at least 8 characters long, and contain min one digit and one special symbol'
    })
});

export { signupSchema, resetPassSchema, userUpdateSchema };
