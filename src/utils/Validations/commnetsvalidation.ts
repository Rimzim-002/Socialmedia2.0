import * as yup from 'yup';

export const commentSchema = yup.object().shape({
  post_id: yup.string().required('post_id is required'),
  user_id: yup.string().required('user_id is required'),
  reply_id: yup.string().nullable(),
  content: yup
    .string()
    .min(1, 'minimum one character is needed')
    .required('comment is required'),
});

export const getAllCommentsSchema = yup.object().shape({
  post_id: yup.string().required('post_id is required'),
  user_id: yup.string().required('user id is required'),

});

export const deleteCommentSchema = yup.object().shape({
  id: yup.string().required('comment id is required'),
  user_id: yup.string().required('user id is required'),
});

export const updateCommentSchema = yup.object().shape({
  id: yup.string().required('comment id is required'),
  user_id: yup.string().required('user id is required'),

});

export const getCommentSchema = yup.object().shape({
  id: yup.string().required('comment id is required'),
});
