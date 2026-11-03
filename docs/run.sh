#!/usr/bin/bash

dcdoc io-read \
        --inputs index.js test/test.js \
      dcdoc-parse \
        --matchers ~/Documents/dcdoc-zone/model/lib/block-short.js ~/Documents/dcdoc-zone/parse/lib/matcher/block/short.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/short/*.js \
        --matchers ~/Documents/dcdoc-zone/model/lib/block.js ~/Documents/dcdoc-zone/parse/lib/matcher/block/short2.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/line/*.js \
        --quick-match docs/quick-match.js \
      --json \
      > docs/template-data.json

dcdoc io-read \
        --inputs index.js test/test.js \
      dcdoc-parse \
        --matchers ~/Documents/dcdoc-zone/model/lib/block-short.js ~/Documents/dcdoc-zone/parse/lib/matcher/block/short.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/short/*.js \
        --matchers ~/Documents/dcdoc-zone/model/lib/block.js ~/Documents/dcdoc-zone/parse/lib/matcher/block/short2.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/line/*.js \
        --quick-match docs/quick-match.js \
      array-to-tree \
      --json \
      > docs/template-tree.json

# exit 0

dcdoc io-read \
        --inputs index.js test/test.js \
      dcdoc-parse \
        --matchers ~/Documents/dcdoc-zone/model/lib/block-short.js ~/Documents/dcdoc-zone/parse/lib/matcher/block/short.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/short/*.js \
        --matchers ~/Documents/dcdoc-zone/model/lib/block.js ~/Documents/dcdoc-zone/parse/lib/matcher/block/short2.js ~/Documents/dcdoc-zone/parse/lib/matcher/section/line/*.js \
        --quick-match docs/quick-match.js \
      array-to-tree \
      render-tree \
        --registry ~/Documents/dcdoc-zone/testbed/tree/byte-size/registry/markdown.js \
        --type-template block BlockTree \
        --var baseLevel 0 \
      insert-into-template \
        --template docs/readme.template \
      body-to-stdout \
      > readme.md
