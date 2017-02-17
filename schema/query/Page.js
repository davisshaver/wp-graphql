import { GraphQLInt } from 'graphql';

import PAGE_ORDERBY from 'enum/PageOrderby';

import PageCollectionType from 'type/Page/Collection';
import PageType from 'type/Page';
import Page from 'data/Page';
import { itemResolver } from 'utils';
import { pagination, filter, date, hierarchical, author, slug } from 'query/args';

export default {
  pages: {
    type: PageCollectionType,
    args: (
      Object.assign({}, pagination, filter, date, hierarchical, author, slug, {
        menu_order: {
          type: GraphQLInt,
          description: 'Limit result set to posts with a specific menu_order value.',
        },
        orderby: { type: PAGE_ORDERBY },
      })
    ),
    resolve: () => ({ results: [] }),
  },
  page: itemResolver(PageType, Page),
};
