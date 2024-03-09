module.exports = {
    generateCredentials: (requestParams, context, ee, next) => {
      context.vars['email'] = `user_${Math.random().toString(36).substring(7)}@example.com`;
      context.vars['password'] = 'password123';
      return next();  
    }
  };
  