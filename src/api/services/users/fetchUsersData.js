import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

const fetchUsersData = async (userId, queryOptions) => {
  const pattern = `.*${queryOptions.name}.*`;
  const userProj = {
    fname: true,
    lname: true,
    profilePic: true
  };

  const users = await User.find(
    {
      $or: [
        {
          $or: [
            {
              fname: { $regex: pattern, $options: 'i' },
              blocked: { $ne: userId }
            },
            {
              lname: { $regex: pattern, $options: 'i' },
              blocked: { $ne: userId }
            }
          ]
        },
        { email: queryOptions.email, blocked: { $ne: userId } }
      ]
    },
    userProj
  )
    .skip((queryOptions.page - 1) * queryOptions.limit)
    .limit(queryOptions.limit);

  if (!users) throw new APIError(404, 'No user was found');

  return users;
};

export default fetchUsersData;
