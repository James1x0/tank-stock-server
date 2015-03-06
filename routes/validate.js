var express     = require('express'),
    userHandler = require('../handlers/user');

module.exports = function ( app ) {
  var userRouter = express.Router();

  userRouter.get('/:id', userHandler.findById);
  userRouter.post('/', userHandler.create);
  userRouter.put('/:id', userHandler.update);
  userRouter.delete('/:id', userHandler.remove);

  app.use('/api/users', userRouter);
};
