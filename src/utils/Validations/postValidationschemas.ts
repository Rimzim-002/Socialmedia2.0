import * as yup from 'yup';

export const addPostSchema = yup.object().shape({
  image: yup.string().required('Image is required'),
  caption: yup
    .string()
    .required('Caption is required')
    .max(20, 'Caption can be max 20 characters'),
  user_id: yup.string().required('User ID is required'),
});

export const updatePostSchema = yup.object().shape({
  id: yup.string().required('Post ID is required'),
  image: yup.string().required('Image is required'),
  caption: yup.string().required('Caption is required').min(1),
  user_id: yup.string().required('User ID is required'),
});

export const deletePostSchema = yup.object().shape({
  id: yup.string().required('Post ID is required'),
  user_id: yup.string().required('User ID is required'),
});

export const userPostsSchema = yup.object().shape({
  user_id: yup.string().required('User ID is required'),
});

export const singlePostSchema = yup.object().shape({
  id: yup.string().required('Post ID is required'),
  user_id: yup.string().required('User ID is required'),
});
