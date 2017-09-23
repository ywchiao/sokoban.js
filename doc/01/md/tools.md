<!---
  @file       tools.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       09/21/2017 created.
  @date       09/22/2017 last modified.
  @version    0.1.0
  @copyright  CC-BY, (C) 2017 Yiwei Chiao
-->

# 開發工具

  [sokoban.js][sokobanjs] 使用 [Node.js][nodejs] 撰寫。
  [Node.js][nodejs] 本身是一個龐雜的生態系 (eco-system)，如果之前沒有開
  發過 [Node.js][nodejs] 的專案，我們需要先安排好它的工作環境。基本上，我們會需要以下的工具 (tools)：

## [Node.js][nodejs]:

  Javascript/ECMAScript 的工作的運作引擎。

## [Babel][babeljs]:

  Javascript 的 Transpiler；Javascript 在 2009~2011 年間迎來了期待
  已久的真正意義上的標準化改變，但是既存的程式需要維護，瀏覽器 (browser) 的
  支援需要時間趕上。於是我們需要一個能將以新版 Javascript (ECMAPScript
  6/7) 語言撰寫的程式 **轉譯** (transpile) 成瀏覽器/[Node.js][nodejs]
  能理解的 Javascript 的工具。

  [Babel][babeljs] 就是這樣的一個工具。

## [rollup.js][rollupjs]:

  [rollup.js][rollupjs] 是一個能將多個 .js 檔案打包 (pack) 成單一檔案，
  節省瀏覽器下載時間的工具；類似的工具早期有 [browserify][browserifyjs]，
  近期當紅有 [webpack][webpack] 等。

  [sokoban.js][sokobanjs] 採用 [rollup.js][rollupjs]。

  開始時提過了，[Node.js][nodejs] 擁有一個龐雜的_生態系_，不同的問題常常
  都有多個不同的解決方案可供選擇，沒有對錯，只是要小心亂花迷眼。

## [git][git]:

  [git][git] 是 [Linus Torvalds][torvalds] (是，就是 Linux Kernel
  的原作者) 給現代的程式設計師 (programmer) 的另一個禮物；一個功能強大而
  又易用的 **版本管理系統** (Version Control System)。

  在 [sokoban.js][sokobanjs] 專案裡，我們將使用 [git][git] 來管控專案的
  發展。

## [GitHub][github]:

  [GitHub][github] 不是一個工具，它是一個網站，一個雲服務。

  顧名思義，[GitHub][github] 是以 [git][git] 為基礎架設的網路服務；
  無論如何，它是目前最熱的開源軟體集散地；包括 **臉書** (Facebook)，
  **領英** (Linkedin)， **亞馬遜** (Amazon)， **谷歌** (Google)，
  所謂的 _FLAG_ 就業首選，和 **蘋果** (Apple)， **微軟** (Microsoft)
  都將它們開源的軟體放在 [GitHub][github] 上，就可以知道它的熱門程度。

  對程式設計師而言，因為 [GitHub][github] 承載了大量的開源專案，所以已成為
  學習，分享，交流，認識世界同時也被世界看到的場域。所以，儘早加入這個程式設計
  師的社群網絡，對程式設計師的職涯發展絶對是正向的影響。

  [sokoban.js][sokobanjs] 的源碼當然也放在 [GitHub][github] 上。
  對開源軟體而言，[GitHub][github] 的服務是 **免費** 的；而我們的練習專案
  當然是開源的。所以實在沒有理由不去登錄一個 [GitHub][github] 的帳號。

  隨著專案的進展，我們也將慢慢地熟悉 [git][git]/[GitHub][github]
  的使用。

## [atom][atom]:

  [atom][atom] 是 [GitHub][github] 推出的，以 [Node.js][nodejs] 打造
  的開源文字編輯器 (editor)；v1.21 版之後，更和 Facebook 合作將它擴張成一
  個完整的 IDE。

  關於 [Node.js][nodejs]/Javascript 可以作些什麼，[atom][atom] 作了
  一個強而有力的見証；類似的，微軟 (Microsoft) 推出了以
  [Node.js][nodejs]/[TypeScript][typescript] (微軟版 Javascript)
  開發的 [VS Code][vscode]。

[atom]: https://atom.io
[babeljs]: https://babeljs.io
[browserifyjs]: https://browserify.org
[git]: https://git-scm.com
[github]: https://github.com
[nodejs]: https://nodejs.org
[rollupjs]: https://rollupjs.org
[sokobanjs]: https://github.com/ywchiao/sokoban.js
[torvalds]: https://en.wikipedia.org/wiki/Linus_Torvalds
[typescript]: https://www.typescriptlang.org
[vscode]: https://github.com/Microsoft/vscode
[webpack]: https://webpack.github.io

<!--- intro.md -->
