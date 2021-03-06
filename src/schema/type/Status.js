import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

import { globalIdField, slug, name } from 'field/identifier';

const StatusType = new GraphQLObjectType({
  name: 'Status',
  description: 'A post status.',
  fields: {
    id: globalIdField(),
    ...name,
    ...slug,
    public: {
      type: GraphQLBoolean,
      description: 'Whether posts of this status should be shown in the front end of the site.',
    },
    queryable: {
      type: GraphQLBoolean,
      description: 'Whether posts with this status should be publicly-queryable.',
    },
  },
});

export default StatusType;
