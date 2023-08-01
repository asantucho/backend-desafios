import Controller from '../controllers/main-controller.js';
import UserController from '../controllers/users-controller.js';
import UserService from '../services/users-services.js';
import { createResponse } from '../utils.js';

const userService = new UserService();
const userController = new UserController(userService);

const createMockRequest = (body, params, user) => {
  return {
    body,
    params,
    user,
  };
};

const handleControllerMethod = async (controllerMethod, reqData, res) => {
  const req = createMockRequest(reqData.body, reqData.params, reqData.user);

  try {
    await controllerMethod(req, res, (error) => {
      if (error) {
        console.log('Error:', error);
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

(async () => {
  const reqData = {
    body: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '0303456',
    },
    params: {},
    user: {},
  };

  const res = {
    data: null,
    status: (code) => {
      return {
        json: (data) => {
          res.data = data;
        },
      };
    },
  };

  console.log('Testing create method...');
  await handleControllerMethod(userController.create, reqData, res);
  console.log('Response:', res.data);
})();
