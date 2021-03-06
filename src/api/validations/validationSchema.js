const Joi = require('joi');

const signupSchema = Joi.object({
  fname: Joi.string()
    .pattern(/^[a-zA-Z. ]+$/i)
    .min(3)
    .max(30)
    .required()
    .messages({
      '*': `fname can only cotain alphabets and . (dot), and should be 3-30 characters long`
    }),
  lname: Joi.string()
    .pattern(/^[a-zA-Z. ]+$/i)
    .min(3)
    .max(30)
    .required()
    .messages({
      '*': `lname can only cotain alphabets and . (dot), and should be 3-30 characters long`
    }),
  email: Joi.string().email().required().messages({
    '*': `email should be string type and in valid format`
  }),
  password: Joi.string()
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-._!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|])[A-Za-z\d\-._!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|]{8,}$/i
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
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-._!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|])[A-Za-z\d\-._!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|]{8,}$/i
    )
    .messages({
      '*': 'password should be at least 8 characters long, and contain min one digit and one special symbol'
    })
});

const userUpdateSchema = Joi.object({
  fname: Joi.string()
    .pattern(/^[a-zA-Z. ]+$/i)
    .min(3)
    .max(30)
    .messages({
      '*': `fname can only cotain alphabets and . (dot), and should be 3-30 characters long`
    }),
  lname: Joi.string()
    .pattern(/^[a-zA-Z. ]+$/i)
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
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-._!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|])[A-Za-z\d\-._!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|]{8,}$/i
    )
    .messages({
      '*': 'password should be at least 8 characters long, and contain min one digit and one special symbol'
    })
});

const postSchema = Joi.object({
  body: Joi.alternatives().conditional('update', [
    {
      is: true,
      then: Joi.string().min(2).max(1000).messages({
        'string.base': '{{#label}} should be a string',
        'any.required': '{{#label}} is required',
        'string.min': '{{#label}} should be minimum 2 characters',
        'string.max': '{{#label}} should maximum 1000 characters'
      }),
      otherwise: Joi.string().required().min(2).max(1000).messages({
        'string.base': '{{#label}} should be a string',
        'any.required': '{{#label}} is required',
        'string.min': '{{#label}} should be minimum 2 characters',
        'string.max': '{{#label}} should maximum 1000 characters'
      })
    }
  ]),
  images: Joi.array().items(Joi.string()).messages({
    'array.base': '{{#label}} should be an array of strings',
    'array.includes': '{{#label}} contains non string value at {{#pos}}'
  }),
  tags: Joi.array().items(Joi.string()).messages({
    'array.base': '{{#label}} should be an array of strings',
    'array.includes': '{{#label}} contains non string value at {{#pos}}'
  }),
  visibility: Joi.string().valid('public', 'friends', 'me').messages({
    'string.base': '{{#label}} should be a string',
    'any.only': '{{#label}} can only take "public", "friends", and "me"'
  }),
  update: Joi.boolean()
});

const pageLimitSchema = Joi.object({
  page: Joi.string()
    .pattern(/^[0-9]*$/)
    .messages({
      '*': '{{#label}} should be a positive number'
    }),
  limit: Joi.string()
    .pattern(/^[0-9]*$/)
    .messages({
      '*': '{{#label}} should be a positive number'
    })
});

const commentSchema = Joi.object({
  body: Joi.string().min(1).max(500).required()
});

const emailSchema = Joi.string().email().required().messages({
  'string.base': '{{#lable}} should be a string',
  'string.email': '{{#lable}} should be a valid email',
  'any.required': '{{#label}} is required'
});

module.exports = {
  signupSchema,
  resetPassSchema,
  userUpdateSchema,
  postSchema,
  pageLimitSchema,
  commentSchema,
  emailSchema
};
