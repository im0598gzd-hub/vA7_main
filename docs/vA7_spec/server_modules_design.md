vA7 server.ts 分割設計（初心者向け・平易版）

この文書は、vA7 の実装を始める前に
「server.ts に何を書き、他のファイルに何を書くのか」
を明確にするための設計メモです。

目的は、コードが大きくなって混乱しないように
あらかじめ責務（担当する仕事）を分けておくこと です。

1. server.ts の役割（最小限にする）

server.ts は 入口専用ファイル として扱う。

やることは次の3つだけ。

サーバーの起動準備

必要なルート（API）の登録

最低限の初期化処理

server.ts にロジック（計算）を書かない。
DB操作も書かない。
状態推定も書かない。

実装が巨大化するのを防ぐための重要ルール。

2. routes（API ルート）の役割

ここは「どのURLでどんな処理を呼ぶか」を決める場所。

例

GET /indicators  
GET /signals  
POST /tasks/daily-signal


routes の役割は “受付係”。

複雑な処理は routes の中でやらず、必ず logic フォルダの関数に渡す。

3. logic（ロジック層）の役割

ここが vA7 の頭脳 となる部分。
相空間計算・距離計算・クラスタリング・関係性評価など、
すべてここに置く。

予定しているファイル例

stateVector.ts（ベクトル生成）

clustering.ts（クラスタ判断）

relations.ts（関係性モデル）

constraints.ts（制約モデル）

signalDecision.ts（状態決定）

confidence.ts（確度計算）

これらは「計算だけ」を担当する。

DB への保存はしない。

4. db（データアクセス層）の役割

ここは NeonDB にアクセスする専用の場所。

indicatorsRepo.ts（market_indicators の取得）

signalsRepo.ts（market_signals の保存）

aiOutputsRepo.ts（ai_outputs の保存）

DB操作を logic に混ぜないこと。

ロジックは「計算するだけ」。
データ取得・保存は「db が担当する」。

5. batch（バッチ処理）の役割

日次の状態推定（シグナル生成）を行う処理。

dailySignalJob.ts

やること：

昨日のデータを取る

vA7 のロジック（logic 層）を順番に呼び出す

結果を NeonDB に保存する

ここでも複雑な計算は書かず、必ず logic を使う。

6. 全体のイメージ（初心者向け 図）
server.ts   ← サーバーの入り口（受付手続きのスタート）

└─ routes/   ← URLごとの受付係
     └─ signals.ts
     └─ indicators.ts

└─ logic/    ← vA7の頭脳（計算）
     └─ stateVector.ts
     └─ clustering.ts
     └─ relations.ts
     └─ constraints.ts
     └─ signalDecision.ts
     └─ confidence.ts

└─ db/       ← データの出し入れ
     └─ indicatorsRepo.ts
     └─ signalsRepo.ts
     └─ aiOutputsRepo.ts

└─ batch/    ← 日次処理
     └─ dailySignalJob.ts

7. なぜこの分割が重要なのか（初心者向け説明）

server.ts が巨大化しない

どこを触ればよいか迷わなくなる

後からAIが機能を拡張しやすくなる

あなた（人間）も見やすい構造になる

vA7 の思想（“責務分離”“軽量実装”）とも完全一致している。

以上。
