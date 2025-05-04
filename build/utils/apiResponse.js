class APIResponse {
    success(res, data = { status: 200, message: 'Success', data: {} }) {
        return res.status(data.status).json({
            status: data.status,
            message: data.message,
            data: data.data ?? {},
        });
    }
    error(res, data = { status: 500, message: 'Error', data: {} }) {
        return res.status(data.status).json({
            status: data.status,
            message: data.message,
            data: data.data ?? {},
        });
    }
}
export default new APIResponse();
