import { Response } from 'express';

class APIResponse {
  success(res: Response, data = { status: 200, message: 'Sucess', data: {} }) {
    return res.status(data.status).json(data);
  }

  error(res: Response, data = { status: 500, message: 'Error', data: {} }) {
    return res.status(data.status).json({ error: Error });
  }
}

module.exports = new APIResponse();
