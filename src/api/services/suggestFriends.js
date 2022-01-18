import mongoose from 'mongoose';

import User from '../models/user.model.js';

const { ObjectId } = mongoose.Types;

/* Uses mongoDB aggregation to find the friends of user's
 * friends, this may include mutual friends and the user
 * itself also, which is not ideal for suggestions, hence
 * they are filtered out by 2 match stages. Then, suggestions
 * of user is replace with user document and after prjection
 * it is returned.
 */
const suggestFriends = async (userId) => {
  try {
    const suggestions = await User.aggregate([
      {
        $match: {
          _id: ObjectId(userId)
        }
      },
      {
        $graphLookup: {
          from: 'users',
          startWith: '$friends',
          connectFromField: 'friends',
          connectToField: '_id',
          as: 'suggestions',
          maxDepth: 1
        }
      },
      {
        $unwind: {
          path: '$suggestions',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          $expr: {
            $not: {
              $in: ['$suggestions._id', '$friends']
            }
          }
        }
      },
      {
        $match: {
          $expr: {
            $not: {
              $in: ['$suggestions._id', [ObjectId(userId)]]
            }
          }
        }
      },
      { $replaceRoot: { newRoot: '$suggestions' } },
      {
        $project: {
          hash: false,
          verified: false,
          inRequests: false,
          outRequests: false,
          blocked: false,
          createdAt: false,
          updatedAt: false,
          __v: false
        }
      }
    ]).exec();

    return suggestions;
  } catch (err) {
    throw err;
  }
};

export default suggestFriends;
