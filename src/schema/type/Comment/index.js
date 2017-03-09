import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import { toGlobalId } from 'graphql-relay';

/* eslint-disable camelcase */

import PostType from 'type/Post';
import Avatar from 'type/User/Avatar';
import CommentLinks from 'type/Comment/Links';

import { globalIdField, link } from 'field/identifier';
import { content } from 'field/content';
import { date } from 'field/date';
import metaField from 'field/meta';
import author from 'field/author';

import Post from 'data/Post';

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'An object.',
  fields: () => ({
    id: globalIdField(),
    ...author,
    ...date,
    ...content,
    ...link,
    post: {
      type: PostType,
      description: 'The ID of the associated post object.',
      resolve: comment => (
        comment.post > 0 ? Post.load(toGlobalId('Post', comment.post)) : null
      ),
    },
    parent: {
      type: GraphQLID,
      description: 'The ID for the parent of the object.',
      resolve: comment => (
        comment.parent > 0 ? toGlobalId('Comment', comment.parent) : null
      ),
    },
    author_name: {
      type: GraphQLString,
      description: 'Display name for the object author.',
    },
    author_url: {
      type: GraphQLString,
      description: 'URL for the object author.',
    },
    status: {
      type: GraphQLString,
      description: 'State of the object.',
    },
    type: {
      type: GraphQLString,
      description: 'Type of Comment for the object.',
    },
    author_avatar_urls: {
      type: new GraphQLList(Avatar),
      description: 'Avatar URLs for the object author.',
      resolve: comment => (
        Object.keys(comment.author_avatar_urls).map(key => ({
          size: key,
          url: comment.author_avatar_urls[key],
        }))
      ),
    },
    meta: metaField(),
    _links: { type: CommentLinks },
  }),
});

export default CommentType;