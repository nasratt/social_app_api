import User from '../models/user.model.js';
import APIError from '../helpers/apiError.js';

const fetchUsersData = async (name, email, page = 1, limit = 50) => {
  const pattern = `.*${name}.*`;
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
            { fname: { $regex: pattern, $options: 'i' } },
            { lname: { $regex: pattern, $options: 'i' } }
          ]
        },
        { email }
      ]
    },
    userProj
  )
    .skip((page - 1) * limit)
    .limit(limit);

  if (!users) throw new APIError(404, 'No user was found');

  return users;
};

export default fetchUsersData;
