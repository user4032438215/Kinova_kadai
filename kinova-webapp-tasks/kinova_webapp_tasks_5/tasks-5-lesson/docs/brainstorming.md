# APIを通じてDBとつなごう

## このレッスンの目的：APIを通じたpsqlのCRUD操作を理解する
Create（作成）：新しいデータを登録する
Read（読み取り）：既存のデータを取得する
Update（更新）：既存のデータを変更する
Delete（削除）：不要なデータを削除する


1. ## APIとPostgreSQLをつなぐ準備
やること
PostgreSQLをインストールして、psqlで接続できるようにする 済
> \lでデータベース一覧を一応チェックする
>  CREATE DATABASE lesson_5_sample; でDB新規作成
users テーブルを作る（名前・メッセージ・作成日時を保存） 済
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
Node.jsで pg パッケージをインストールする → npm install pg 済
index.js に PostgreSQL接続設定を書く（Poolを使う） 済
---
2. ## Create（データ追加）
やること
APIに /api/users のPOSTルートを作る 済
req.body から name と message を受け取る 済 >分割代入でコンパクトに記述
SQLで INSERT INTO users (name, message) を実行
プレースホルダ $1, $2 を使って安全に書く
```js
const sql = "INSERT INTO users (name, message) VALUES ($1, $2)";
pool.query(sql, [name, message])
```
フロントにフォームを作って、fetch() でPOST送信する 済 11/08/01:36 
**次回は『Read（データの取得）』から**

3. ## Read（データ取得）
やること
APIに /api/users のGETルートを作る
SQLで SELECT * FROM users を実行して result.rows を返す
フロントに「取得ボタン」を追加
fetch() でGETリクエスト → JSONで受け取る
JavaScriptで <table> を組み立てて画面に表示する
---
4. ## Update（データ更新）
やること
APIに /api/users/:id のPUTルートを作る
req.params.id でIDを取得、req.body で新しい値を受け取る
SQLで UPDATE users SET name = $1, message = $2 WHERE id = $3 を実行
```js
pool.query(sql, [name, message, id])
```
フロントに「更新フォーム」を追加（ID・名前・メッセージ）
fetch() でPUTリクエスト → 結果を画面に表示する
---
**11082018 Update（データ更新）まで 済 次回 Delete（データ削除）から**

5. ## Delete（データ削除）
やること
APIに /api/users/:id のDELETEルートを作る
req.params.id でIDを取得
SQLで DELETE FROM users WHERE id = $1 を実行
```js
pool.query(sql, [id])
```
フロントに「削除フォーム」を追加（IDだけ）
fetch() でDELETEリクエスト → 結果を画面に表示する