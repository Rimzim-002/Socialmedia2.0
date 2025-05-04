import * as yup from 'yup';

export const validateRequest = async (
  schema: yup.ObjectSchema<any>,
  data: any,
) => {
  return await schema.validate(data, { abortEarly: false });
};
