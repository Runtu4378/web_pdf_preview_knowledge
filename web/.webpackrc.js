import { resolve } from 'path';

const { PUBLIC_PATH } = process.env;
const publicPath = PUBLIC_PATH || '/';

export default {
  alias: {
    components: resolve(__dirname,'./src/components'),
    utils: resolve(__dirname,'./src/utils'),
  },
}
