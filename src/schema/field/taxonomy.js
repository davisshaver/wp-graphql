import {
  GraphQLInt,
} from 'graphql';
import { toGlobalId } from 'graphql-relay';

import TaxonomyType from 'type/Taxonomy';
import Taxonomy from 'data/Taxonomy';

export default {
  taxonomy: {
    type: TaxonomyType,
    description: 'Type attribution for the term.',
    resolve: obj => Taxonomy.load(toGlobalId('Taxonomy', obj.taxonomy)),
  },
  count: {
    type: GraphQLInt,
    description: 'Number of published posts for the term.',
  },
};