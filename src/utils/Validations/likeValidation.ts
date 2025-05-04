import * as yup from 'yup';

const addLikeSchema = yup.object({
  user_id: yup
    .string()
    .required('User ID is required'),
  
  type: yup
    .string()
    .oneOf(['post', 'comment'], 'Type must be either "post" or "comment"')
    .required('Type is required'),
  
  post_id: yup
    .string()
    .nullable()
    .test('post-id-required', 'Post ID is required when type is "post"', function(value) {
      const { type } = this.parent;
      if (type === 'post' && !value) {
        return this.createError({ message: 'Post ID is required when type is "post"' });
      }
      return true; // or false if you want to reject the input
    }),

  comment_id: yup
    .string()
    .nullable()
    .test('comment-id-required', 'Comment ID is required when type is "comment"', function(value) {
      const { type } = this.parent;
      if (type === 'comment' && !value) {
        return this.createError({ message: 'Comment ID is required when type is "comment"' });
      }
      return true; // or false if you want to reject the input
    }),

  
});

export default addLikeSchema;
