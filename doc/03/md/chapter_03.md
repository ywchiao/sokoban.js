<!---
  @file       chapter_03.md
  @date       10/13/2017 created.
  @copyright  CC-BY, (C) 2017 Yiwei Chiao
  @detail
    This file is machine-generated. DONOT MODIFY IT DIRECTLY.
-->
# HTML5/CSS3

 在網頁瀏覽器 (browser) 上，[JavaScript][wikiECMAScript]
 ([ECMAScript][]) 控制**程式行為** (behavior)，
 [HTML][wikiHTML] ([Hyper Text Markup Language][wikiHTML]) 決定文件
 的**組織結構** (structure)，而
 [CSS][wikiCSS] ([Cascading Style Sheets][wikiCSS])
 處理**排版**(style)。三者各司其職。

 [Sokoban.js][sokobanjs] 專案既然是一個網頁遊戲專案，自然少不了
 [HTML][wikiHTML] 和 [CSS][wikiCSS]。只是專案重心在
 [JavaScript][mdnJavaScript]，所以
 [HTML][mdnHTML]，[CSS][mdnCSS] 只會簡單帶過使用到的部份。其餘更全面的介紹
 或進階的主題，需要去參考其它的資源 (如這裡給的連結：[HTML][mdnHTML]，和
 [CSS][mdnCSS])。

## index.html

  首先，在 `sokoban/htdocs` 資料夾下，建立 `index.html` 檔案，內容如下：

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Sokoban: A Puzzle Game</title>
    <meta name="author" content="Yiwei Chiao">
    <meta name="description" content="A web-based Sokoban (倉庫番) game.">
    <meta name="keywords" content="Javascript, game, Sokoban">
  </head>
  <body>
    Hello World!
  </body>
</html>
```

 在 `index.html` 的內容列表中，用 `<>` 框起的字串稱為**標記** (*tag*)，
 它們也就是 [HTML][wikiHTML] 標記語言的組成部份。針對 [HTML][wikiHTML]
 較詳細的介紹放在這一章的後半，這裡需要注意的只是 `<body>` 和 `</body>`
 夾起的 `Hello World!`。

 準備好 `sokoban/htdocs` 資料夾下的 `index.html` 後，可以開啟瀏覽器，在瀏
 覽器的網址列內輸入：

  * Windows: `file:///d:/sokoban/htdocs/index.html`
  * Linux: `file:///home/ywchiao/sokoban/htdocs/index.html`
  * MacOs: `file:///Users/ywchiao/sokoban/htdocs/index.html`

 其中 Windows 的 `d:`，Linux/MacOS 裡的 `ywchiao` 請依個人情況更改。在
 Linux/MacOS 系統如果不清楚路徑要怎麼打，可以在 terminal 下利用 `cd` 指令，
 切換工作目錄到 `sokoban/htdocs` 之後，輸入 `pwd`
 (Present Working Directory)，依螢幕輸出打就行了；而 Windows 則可以利用
 檔案總管，切換資料夾到 `sokoban/htdocs` 後，在檔管總管的瀏覽器列空白處，
 點一下滑鼠左鍵就可以看到要輸入的內容。

 如果瀏覽器的網址列輸入正確，應該會看見如 Figuer \ref{file:index} 的畫面。

 ![瀏覽器開啟 `index.html`\label{file:index}](images/file_index.png)

### [HTML][mdnHTML] 標題 `<h1> ... <h6>`

 Figure \ref{file:index} 看起來沒什麼不同？的確如此，因為前面提過，
 [HTML][wikiHTML] 的用途在決定文件**結構** (structure)，而非呈現。不過，
 一些簡單的效果還是有的。修改:

 ```html
 <body>
   Hello World!
 </body>
 ```

 成為：

 ```html
 <body>
   <h1>Hello World!</h1>
 </body>
 ```

 存檔後，重新整理網頁，可以發現 `Hello World!` 的字型大小變了。這是因為
 `<h1></h1>` 是 [HTML][mdnHTML] 用來標記**標題** (Heading) 的 *tag*；
 其中，`<h1>` 標記標題的開始，而 `</h1>` 則標記標題的結束。排版習慣上，標題
 的字體通常會比內文大一些。所以，[HTML][mdnHTML] 的 heading tags，標記的
 文字也會大一些。

 [HTML][mdnHTML] 總共定義了六 (6) 級的 heading 大小，分別以 `<h1>`.
 `<h2>`。一直到 `<h6>` 標記。可以逐一試試效果。

<!-- intro.md -->

# Node.js 的 `fs` 系統

 之前的 `httpd/index.js` 檔案可以接受使用者連線，傳回簡單的 `Hello World!`
 訊息； `htdocs/index.html` 則是 [HTML][mdnHTML] 版的 `Hello World!`。
 如果將兩者結合，也就是當伺服器收到使用者要求時，它會回傳 `index.html` 的
 內容；這樣的 `index.js` 就有點真正的網頁伺服器的樣子了。

 修改過的 `httpd/index.js` 內容如下：

```javascript
 1. 'use strict';
 2.
 3. let http = require('http');
 4.
 5. http.createServer((request, response) => {
 6.   // 取得 node.js 的 fs 模組
 7.   let fs = require('fs')
 8.
 9.   fs.readFile('../htdocs/index.html', (err, data) => {
10.     response.writeHead(200, {
11.       'Content-Type': 'text/html'
12.     });
13.
14.     response.write(data);
15.
16.     response.end();
17.   });
18. }).listen(8088);
19.
20. // log message to Console
21. console.log('伺服器啟動，連線 url:  http://127.0.0.1:8088/');
```

 和原來的 `index.js` 內容比較，主要的變化出現在第 6 行到第 17 行這段 `callback` 函數的內容。具體的說是：

  * 第 7 行：利用 `require('fs')` 載入了 [Node.js][nodejs] 的
   [`fs`][fs] ([File System][fs])模組，並將產生的物件放入同名的 `fs` 變數
   內。
  * 第 9 行：呼叫 [`fs`][fs] 物件的 [`readFile`][readfile] 方法；讀入
   `index.html` 檔案；有趣的在第二個參數的 `callback` 函數。  
   這個 `callback` 函數本身需要兩個參數：  
    * `err`：代表 [`readFile()`][readfile] 執行中發生錯誤。
    * `data`: 代表讀取成功的資料。
   目前的 `index.js` 檔案暫時不處理錯誤，所以並沒有對 `err` 進行處理。而讀入
   的 `data` 就直接準備傳送給客戶端 (瀏覽器)。
  * 第 10 到 16 行：和之前一樣，呼叫 [`response`][serverresponse] 三步
   走；不一樣的是，現在這幾行變成
   [`readFile(fname, callback)`][readfile] 第二個參數： `callback`
   函數的內容：
    - 第 10 行，[`writeHead(...)`][responsewritehead]；因為傳回的資料
     現在是 `html`，所以 `'Content-Type'`([MIME Type][mime]) 設為
     `'text/html'`。
    - 第 14 行，[`write(data)`][responsewrite]：呼叫
     [`response`][serverresponse] 的 [`write`][`responsewrite`]
     方法將讀入的資料 (`data`) 傳送給客戶端 (瀏覽器)
    - 第 16 行，[`end()`][responseend]：**結東**
     [`response`][serverresponse] 物件的工作，確實將資料傳送出去。

## 非同步 (asynchronous) 的 `fs.readFile(...)`

  如果去查 `index.js` 第 9 行的 [`fs.readFile(...)`][readfile] 說明
  文件，會注意到文件特別強調它是 *asynchronous* (**非同步**) 的。這是
  [Node.js][nodejs] 的一個特點。[Node.js]][nodejs] 提供的模組裡的 [API][]s (Application Programming Interface: 應用程式介面)，除非特
  別聲明，或者如 [readFile(...)][readfile] 的姊妹函數
  [readFileSync(...)][readfilesync] 般，函數名稱裡就帶有 *Sync* (*SYNChronous*)，全部都是 **非同步** (*asynchronous*) 的。

  所謂 **非同步** (*asynchronous*) 指得是，以 [readFile(...)][readfile]
  方法為例，[Node.js][nodejs] **不會等** 檔案讀取完畢之後才進行下一步；
  **[Node.js][nodejs] 啟動 I/O 作業，開始讀取檔案後，就去處理程式下一步指
  令了；一直到 I/O 系統完成了工作，才會透過 [readFile(...)][readfile] 的
  `callback` 函數，通知 [Node.js][nodejs] 回頭進行讀取資料的後續處理。**

  這樣設計的好處是，同樣以 [readFile(...)][readfile] 為例，如果讀取的檔案很
  大，[Node.js][nodejs] 可以不用傻傻的在那兒等檔案讀完，而可以先去忙其它事，
  等檔案讀完再回頭處理。從而最大化運算核心和記憶體的使用效率。

<!-- fs.md -->

# HTML 簡介

 [HTML][wikiHTML] 是 [HyperText Markup Language][wikiHTML] (超文本
 標記語言) 的縮寫。[**標記語言**][wikiMarkupLang]
 ([markup language][wikiMarkupLang]) 和[程式語言][wikiProgLang]
 ([programming language][wikiProgLang]) 有本質的不同。
 如 [HTML][wikiHTML]
 這樣的[標記語言][wikiMarkupLang]設計上是為[**文本**][wikiText]
 ([text][wikiText]) 的不同部份加上**標記** (tag)，方便工作人員或處理工具
 理解原始設計者／創作者的創作意圖，進而依據這些預先定義好的**標記**意義進行後製
 (post-production) 加工。
 在 Web 相關領域，目前常見的標記語言有
 [HTML][wikiHTML]，[Markdown][wikiMarkdown]，[XML][wikiXML]，
 [YAML][wikiYAML] 等。
 每個[標記語言][wikiMarkupLang]都有它想解決的問題和想達成的目的。

## [HTML][mdnHTML] 結構

 [HTML][mdnHTML] 採用的**標記**，稱為 [HTML][mdnHTML] *tag*，
 都以**成對**的角括號 `<...>` 包夾，成 `<tag>` 型式；如 `<h1>`，`<h2>`
 等。

 之前提過，[HTML][mdnHTML] 是設計來規範文件的結構。而一個最簡單的
 [HTML][mdnHTML] 結構大概如下所示：

```html
<html>
  <head>
    <title>HTML 簡介</title>  
  </head>
  <body>
    Hello HTML。
  </body>
</html>
```

 由上面的 [HTML][mdnHTML] 內容可以注意到幾件事情：

 * [HTML][mdnHTML] 檔案開頭與結束分別是 `<html>` 與 `</html>` 的 *tag*
  其中 `<tag>` 稱為 *tag* **開始**標記，而 `</tag>` 則稱為 *tag* **結東**
  標記。
 * [HTML][mdnHTML] 的內容可以分為 `<head></head>` 和 `<body></body>`
  兩大區塊：
    - `<head></head>`: 放置 .html 作者想讓瀏覽器知道，除了文件結構之外，
     一些額外的處理**注意事項**，相關檔案，和被稱為
     [*meta-data*][wikiMetadata] 的文件描述。在
     [GitHub][github] 上有一份整理的很好的文可以參考：
     [*HEAD*][githubHead]
    - `<body></body>`: [HTML][mdnHTML] 真正要呈現的內容。
 * [HTML][mdnHTML] *tag* **不**
  區分大小寫，不過 [HTML5][mdnHTML5] 建議採用**全**小寫。

## `index.html` 的 `<head></head>`

  `htdocs/index.html` 裡的 `<head></head>` 內容如下：

```html
1.  <head>
2.    <meta charset="utf-8">
3.    <meta name="viewport" content="width=device-width, initial-scale=1.0">
4.
5.    <title>Sokoban: A Puzzle Game</title>
6.    <meta name="author" content="Yiwei Chiao">
7.    <meta name="description" content="A web-based Sokoban (倉庫番) game.">
8.    <meta name="keywords" content="Javascript, game, Sokoban">
9.  </head>
```

  * 第 2 行：通知瀏覽器，`index.html` 採用的內容編碼是 `utf-8`。
  * 第 3 行：預設使用設備的全螢幕顯示；放大倍率是 `1.0`
  * 第 5 行：網頁的標題 (title)；這個值會被用作網址列的內容，我的最愛，或搜尋
   引擎。
  * 第 6~8 行：網頁基本資訊，提供給搜尋引擎或網路爬蟲處理。

[github]: https://github.com/
[wikiText]: https://en.wikipedia.org/wiki/Text_(literary_theory)

<!-- html.md -->

[android]: https://developer.android.com
[ECMAScript]: https://www.ecma-international.org/publications/standards/Ecma-262.htm
[nodejs]: https://nodejs.org/en
[sokoban]: https://en.wikipedia.org/wiki/Sokoban
[sokobanjs]: https://github.com/ywchiao/sokoban.js.git
[sokoban.android]: https://github.com/ywchiao/sokoban
[atom]: https://atom.io
[babeljs]: https://babeljs.io
[browserify]: http://browserify.org
[git]: https://git-scm.com
[github]: https://github.com
[ide]: https://en.wikipedia.org/wiki/Integrated_development_environment
[rollupjs]: https://rollupjs.org
[torvalds]: https://en.wikipedia.org/wiki/Linus_Torvalds
[typescript]: https://www.typescriptlang.org
[uglifyjs]: https://github.com/mishoo/UglifyJS2
[vcs]: https://en.wikipedia.org/wiki/Version_control
[vscode]: https://github.com/Microsoft/vscode
[webpack]: https://webpack.github.io
[brew]: https://github.com/Homebrew/brew
[cli]: https://en.wikipedia.org/wiki/Command-line_interface
[cmder]: https://github.com/cmderdev/cmder
[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[npm]: https://www.npmjs.com
[nvm]: https://github.com/creationix/nvm
[vim]: https://vim.sourceforge.io
[xcode]: https://developer.apple.com/xcode
[commonmark]: http://commonmark.org
[gfm]: https://github.github.com/gfm
[gitignore]: https://git-scm.com/docs/gitignore
[markdown]: https://en.wikipedia.org/wiki/Markdown
[MIT]: https://opensource.org/licenses/MIT
[scriptingLanguage]: https://en.wikipedia.org/wiki/Scripting_language
[shellScript]: https://en.wikipedia.org/wiki/Shell_script
[sokoban.js]: https://github.com/ywchiao/sokoban.js.git
[amd]: http://requirejs.org/docs/whyamd.html
[arrowfunction]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[clientrequest]: https://nodejs.org/api/http.html#http_class_http_clientrequest
[closure]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Closures
[commonjs]: http://www.commonjs.org
[console]: https://nodejs.org/api/console.html#console_class_console
[createserver]: https://nodejs.org/api/http.html#http_http_createserver_requestlistener
[http]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
[httpmod]: https://nodejs.org/api/http.html#http_http
[httpserver]: https://nodejs.org/api/http.html#http_class_http_server
[iife]: https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
[JavaScript]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript
[let]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/let
[mdn]: https://developer.mozilla.org/zh-TW
[mime]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
[require]: https://nodejs.org/api/modules.html#modules_require
[responseend]: https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
[responsewrite]: https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback
[responsewritehead]: https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
[serverlisten]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
[serverresponse]: https://nodejs.org/api/http.html#http_class_http_serverresponse
[strict]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
[var]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/var
[Unicode]: https://zh.wikipedia.org/wiki/Unicode
[utf8]: https://zh.wikipedia.org/wiki/UTF-8
[mdnCSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[mdnHTML]: https://developer.mozilla.org/en-US/docs/Web/HTML
[mdnJavaScript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[wikiCSS]: https://en.wikipedia.org/wiki/Cascading_Style_Sheets
[wikiECMAScript]: https://en.wikipedia.org/wiki/ECMAScript
[wikiHTML]: https://en.wikipedia.org/wiki/HTML
[API]: https://en.wikipedia.org/wiki/Application_programming_interface
[fs]: https://nodejs.org/api/fs.html#fs_file_system
[readfile]: https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
[readfilesync]: https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
[githubHead]: https://github.com/joshbuchea/HEAD
[mdnHTML5]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[wikiMarkdown]: https://en.wikipedia.org/wiki/Markdown
[wikiMarkupLang]: https://en.wikipedia.org/wiki/Markup_language
[wikiMetadata]: https://en.wikipedia.org/wiki/Metadata
[wikiProgLang]: https://en.wikipedia.org/wiki/Programming_language
[wikiXML]: https://en.wikipedia.org/wiki/XML
[wikiYAML]: https://en.wikipedia.org/wiki/YAML
[^android]: https://developer.android.com
[^ECMAScript]: https://en.wikipedia.org/wiki/ECMAScript
[^nodejs]: https://nodejs.org
[^sokoban]: https://en.wikipedia.org/wiki/Sokoban
[^sokobanjs]: https://github.com/ywchiao/sokobna.js
[^sokoban.android]: https://github.com/ywchiao/sokoban
[^atom]: https://atom.io
[^babeljs]: https://babeljs.io
[^browserify]: http://browserify.org
[^git]: https://git-scm.com
[^github]: https://github.com
[^ide]: https://en.wikipedia.org/wiki/Integrated_development_environment
[^rollupjs]: https://rollupjs.org
[^torvalds]: https://en.wikipedia.org/wiki/Linus_Torvalds
[^typescript]: https://www.typescriptlang.org
[^uglifyjs]: https://github.com/mishoo/UglifyJS2
[^vcs]: https://en.wikipedia.org/wiki/Version_control
[^vscode]: https://github.com/Microsoft/vscode
[^webpack]: https://webpack.github.io
[^brew]: https://github.com/Homebrew/brew
[^cli]: https://en.wikipedia.org/wiki/Command-line_interface
[^cmder]: https://github.com/cmderdev/cmder
[^gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[^npm]: https://www.npmjs.com
[^nvm]: https://github.com/creationix/nvm
[^vim]: https://vim.sourceforge.io
[^xcode]: https://developer.apple.com/xcode
[^commonmark]: http://commonmark.org
[^gfm]: https://github.github.com/gfm
[^gitignore]: https://git-scm.com/docs/gitignore
[^markdown]: https://en.wikipedia.org/wiki/Markdown
[^MIT]: https://opensource.org/licenses/MIT

<!--- chapter_03.md -->