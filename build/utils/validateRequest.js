export const validateRequest = async (schema, data) => {
    return await schema.validate(data, { abortEarly: false });
};
