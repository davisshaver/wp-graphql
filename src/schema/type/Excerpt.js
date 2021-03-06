import { GraphQLObjectType } from 'graphql';

import rendered from 'field/rendered';
import raw from 'field/raw';
// 'protected' is a reserved word in JS
import protectedField from 'field/protected';

const Excerpt = new GraphQLObjectType({
  name: 'Excerpt',
  description: 'The excerpt for the object.',
  fields: {
    ...rendered,
    ...raw,
    ...protectedField,
  },
});

export default Excerpt;
