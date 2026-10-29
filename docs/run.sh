#!/usr/bin/bash

dcdoc io-read \
        --inputs index.js test/test.js \
      dcdoc-parse \
        --matchers ~/Documents/dcdoc-zone/parse/lib/matcher/block/short.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/short/*.js \
        --matchers ~/Documents/dcdoc-zone/parse/lib/matcher/block/short2.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/line-1-data.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/line-2-onward-content.js \
      --json \
      > docs/template-data.json

exit 0


dcdoc io-read \
        --inputs index.js test/test.js \
      dcdoc-parse \
        --section-matchers ~/Documents/dcdoc-zone/parse/lib/matcher/section/line-1-data.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/short/*.js \
        --block-matchers ~/Documents/dcdoc-zone/parse/lib/matcher/block/short.js \
      array-to-tree \
      --json \
      > docs/template-tree.json

dcdoc io-read \
        --inputs index.js test/test.js \
      dcdoc-parse \
        --section-matchers ~/Documents/dcdoc-zone/parse/lib/matcher/section/line-1-data.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/short/*.js \
        --block-matchers ~/Documents/dcdoc-zone/parse/lib/matcher/block/short.js  \
      array-to-tree \
      render-tree \
        --registry ~/Documents/dcdoc-zone/testbed/tree/byte-size/registry/markdown.js \
        --type-template block BlockTree \
        --var baseLevel 0 \
      body-to-stdout \
      > readme.md
      # insert-into-template \
      #   --template docs/readme.template \
      # body-to-stdout \
      # > readme.md
