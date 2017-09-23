/**
 *  @file       binding.js
 *  @brief      The main entry of Binding.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       09/21/2017 created.
 *  @date       09/22/2017 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2017 Yiwei Chiao
 *  @details
 *
 *  The Binding's entry: main.
 */
'use strict';

const fs = require('fs');

/**
 * 接受一個 config 檔的名稱，傳回一個 binding 物件。
 *
 * @name config
 * @function
 * @param config - 設定檔 (configuration file) 檔名
 * @returns {Object}
 */

const getChapters = doc => {
  return fs.readdirSync(doc).filter(
    d => fs.statSync(doc + '/' + d).isDirectory()
  )
};

const book = '../doc';

const refUrl = /\[(\w+)\]: *(https?:\/\/[\w-./]+\w$)/;
let inComments = false;
let isLF = false;

const urls = {};

const isCmtClosing = line => {
  return line.match(/-->$/);
}

const isCmtOpening = line => {
  return line.match(/^<!---/);
}

const isRefUrl = line => {
  let refDef = false;

  let link = line.match(refUrl);

  if (link) {
    urls[link[1]] = link[2]

    refDef = true;
  }

  return refDef;
};

const binding = chap => {
  let toc = JSON.parse(
    fs.readFileSync(book + '/' + chap + '/toc.json'),
  );
  
  let oName = book + '/' + chap + '/md/' + 'chapter_' + chap + '.md';

  try {
    fs.renameSync(oName, oName + '.old');
  }
  catch (e) {
    // old file not exist; do nothing.
  }

  const date = (new Date()).toISOString().replace(
    /(\d+)-(\d+)-(\d+).*/,
    "$2/$3/$1"
  );

  const comments = [
    '<!---\n',
    `  @file       chapter_${chap}.md\n`,
    `  @date       ${date} created.\n`,
    '  @copyright  CC-BY, (C) 2017 Yiwei Chiao\n',
    '  @detail\n',   
    '    This file is machine-generated. DONOT MODIFY IT DIRECTLY.\n',
    '-->\n',
  ]

  let f = fs.openSync(book + '/' + chap + '/md/chapter_' + chap + '.md', 'a');

  for (let line in comments) {
    fs.writeFileSync(f, comments[line]);
  }

  toc.section.forEach(sec => {
    let txt = fs.readFileSync(book + '/' + chap + '/md/' + sec + '.md', 'utf8').split('\n');

    for (let line in txt) {
      if (inComments) {
        if (isCmtClosing(txt[line])) {
          inComments = false;
        }

        continue;
      }

      if (isCmtOpening(txt[line])) {
        if (!(isCmtClosing(txt[line]))) {
          inComments = true;
        }

        continue;
      }

      if (isRefUrl(txt[line])) {
        continue;
      }

      if (isLF) {
        if (txt[line].length == 0) {
          continue;
        }
        else {
          isLF = false;
        }
      }

      if (txt[line].length == 0) {
        isLF = true;
      }

      fs.writeFileSync(f, txt[line] + '\n');
    } // od
  });

  for (let key in urls) {
    fs.writeFileSync(f, `[${key}]: ${urls[key]}\n`);
  }

  fs.writeFileSync(f, `\n<!--- chapter_${chap}.md -->`);

  fs.closeSync(f);
};

getChapters(book).forEach( chap => {
  binding(chap);
});

// binding.js
