import { resolve } from 'path';

export default {
  "copy": [
    // {
    //   "from": resolve(__dirname,'./src/utils/pdf.js/web/cmaps'),
    //   "to": "static/pdfjs",
    // },
    {
      "from": resolve(__dirname,'./src/static'),
      "to": "static",
    },
  ]
}