import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import { fetchData } from 'data';
import { decodeIDs } from 'utils';

// there is no batch mechanism on this endpoint
const path = process.env.WP_TYPES_ENDPOINT || 'wp/v2/types';
const typeLoader = new Dataloader(opaque => (
  fetchData(path, {}, 1000 * 60 * 10)
    .then(({ data: { body } }) => decodeIDs(opaque).map(id => body[id]))
));

class Type {
  getID() {
    return toGlobalId(this.constructor.name, this.slug);
  }

  static getEndpoint() {
    return path;
  }

  static async load(id) {
    const data = await typeLoader.load(id);
    return data ? Object.assign(new Type(), data) : null;
  }

  static async collection(args = {}) {
    const { data: { body } } = await fetchData(path, args);
    return Object.keys(body).map(key => Object.assign(new Type(), body[key]));
  }
}

export default Type;