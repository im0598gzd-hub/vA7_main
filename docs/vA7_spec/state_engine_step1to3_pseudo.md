vA7 相空間エンジン Step1〜3 準コード設計（初心者向け）

この文書は、vA7 の「日次シグナル生成（Phase 3）」のうち、
最初の3ステップ（データ取得 → ベクトル生成 → 過去比較） を
実装前の設計図としてまとめたものです。

コードはまだ書きません。
「どんな関数（処理）が必要で、何を返すのか」だけを整理します。

■ Step 1：データ取得（market_indicators）
目的

特定の日付（例：昨日）に対応する市場データを NeonDB から取り出す。

関数案（疑似コード）
function fetchIndicatorByDate(targetDate):
    // 1. NeonDB から targetDate のデータを1件取得
    // 2. 欠損していたら "skip" を返す
    return indicatorRecord or null

返すもの

指標データ（例：RSI, MACD, VIX, S&P500, USDJPY, US10Y）

データがなければ null（この日は処理しない）

この段階でやらないもの

計算

状態判断

ロジック
→ すべて後のステップが担当。

■ Step 2：ベクトル生成（相空間モデル）
目的

Step 1 のデータを「多次元ベクトル」に変換する。

例：

[ RSI値, MACD値, VIX値, SP500値, USDJPY値, US10Y金利 ]

関数案（疑似コード）
function buildStateVector(indicatorRecord):
    // indicatorRecord の6つの値を使って
    // 数値の配列（ベクトル）を作る
    return vector[]

返すもの

数字のリスト（float配列）

ここで重要なこと

単純に「値を配列に並べるだけ」でよい

正規化・高度な前処理は後回しでOK

思想レイヤでは「軽量・家庭料理」が優先されているため複雑化しない

■ Step 3：過去データとの距離計算
目的

今日のベクトルが「過去と比べてどれくらい変化したか」を数値で把握する。

関数案（疑似コード）
function fetchRecentVectors(days):
    // 過去 days 日間の market_indicators を取得
    // 各レコードを vector に変換してリストで返す
    return vectorList

function calculateCosineDistance(vectorA, vectorB):
    // 2つのベクトルの類似度を計算する
    // cos距離：値が小さいほど似ている
    return distanceValue

function findClosestVector(todayVector, recentVectorList):
    // todayVector と最も距離が近い過去ベクトルを探す
    // 近さの統計もオプションで返す
    return closestVector, distanceSummary

返すもの

もっとも近い過去ベクトル

距離の概要（例：平均・最小・最大）

後でクラスタ判定に使う recentVectors の一覧

■ Step1〜3 の全体像（初心者向け図）
Step1：データ取得（NeonDB）
    ↓
indicatorRecord

Step2：ベクトル生成
    ↓
todayVector

Step3：過去比較（距離計算）
    ↓
closestVector, distanceSummary, recentVectors


ここまで終えると、
Step 4 のクラスタ判定に進める「準備が100％整った状態」 になる。

■ この文書の位置づけ

まだ「実装（コード）」ではない

あくまで「地図」

明日の実装作業を迷わず進めるための準備

vA7 思想（軽量・責務分離・構造化）と完全整合

以上
