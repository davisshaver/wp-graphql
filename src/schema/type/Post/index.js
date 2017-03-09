import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';
import { toGlobalId } from 'graphql-relay';

/* eslint-disable camelcase */

import PostInterface from 'interface/Post';
import CategoryType from 'type/Category';
import TagType from 'type/Tag';
import PostLinks from 'type/Post/Links';

import { globalIdField, slug, guid, link } from 'field/identifier';
import { title, content, excerpt } from 'field/content';
import { date, modified } from 'field/date';
import { comment_status, ping_status } from 'field/status';
import { type, template, format, sticky } from 'field/post';
import { featuredMedia } from 'field/media';
import metaField from 'field/meta';
import author from 'field/author';

import Category from 'data/Category';
import Tag from 'data/Tag';

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'A read-only post object.',
  interfaces: [PostInterface],
  isTypeOf(post) {
    return post.type === 'post';
  },
  fields: {
    id: globalIdField(),
    ...date,
    ...guid,
    ...modified,
    ...slug,
    ...type,
    ...link,
    ...title,
    ...content,
    ...excerpt,
    ...comment_status,
    ...ping_status,
    ...template,
    ...format,
    ...author,
    featured_media: featuredMedia(),
    meta: metaField(),
    // extra post fields
    ...sticky,
    _links: { type: PostLinks },
    categories: {
      type: new GraphQLList(CategoryType),
      description: 'The terms assigned to the object in the category taxonomy.',
      resolve: ({ categories }) => {
        if (categories.length) {
          return Promise.all(categories.map(cat => toGlobalId('Category', cat)).map(Category.load));
        }
        return null;
      },
    },
    tags: {
      type: new GraphQLList(TagType),
      description: 'The terms assigned to the object in the post_tag taxonomy.',
      resolve: ({ tags }) => {
        if (tags.length) {
          return Promise.all(tags.map(tag => toGlobalId('Tag', tag)).map(Tag.load));
        }
        return null;
      },
    },
  },
});

export default PostType;