class APIResponse {
    success(res, data = { status: 200, message: 'Sucess', data: {} }) {
        return res.status(data.status).json(data);
    }
    error(res, data = { status: 500, message: 'Error', data: {} }) {
        return res.status(data.status).json({ error: Error });
    }
}
module.exports = new APIResponse();
export {};
