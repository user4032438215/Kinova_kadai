# 課題 1
Node.js から PostgreSQL に接続するための準備をしてください。

■ 実装する内容
1. サーバーコード（index.js）に pg パッケージを読み込む 
2. PostgreSQL 接続用の Pool インスタンスを作成する 
3. 接続情報を設定する 
```
user: "postgres"
host: "localhost"
database: "kinova_sample"（データベース講座で作成した DB 名）
password: 各自が設定したパスワード
port: 5432
```


# 課題 2
フロントエンドから送信された本の情報をデータベースに保存する API を作成してください。
■API の仕様
エンドポイント: POST /api/books
受け取るデータ（JSON）:
```json
{
"title": "本のタイトル",
"author": "著者名",
"price": 価格（数値）
}
```
処理内容:
1. title、author、price が全て送信されているか確認
2. 不足がある場合はエラーを返す
3. books テーブルに INSERT する（プレースホルダを使用）
4. 成功したら追加したデータを含む JSON を返す


# 課題 3
books テーブルに保存されている全ての本の情報を取得する API を作成してください。
■API の仕様
エンドポイント: GET /api/books
処理内容:
1. books テーブルから全てのデータを SELECT する
2. 取得したデータを JSON 配列として返す
レスポンス形式:
```json
{
"ok": true,
"books": [ {...}, {...}, ... ]
}
```


# 課題 4
指定された ID の本の情報を更新する API を作成してください。
■API の仕様
エンドポイント: PUT /api/books/:id
URL パラメータ: id（更新対象の本の ID）
受け取るデータ（JSON）:
```json
{
"title": "新しいタイトル",
"author": "新しい著者名",
"price": 新しい価格
}
```
処理内容:
1. URL から id を取得する（req.params.id）
2. title、author、price が全て送信されているか確認
3. 指定された ID の本の情報を UPDATE する
4. 更新後のデータを返す

## 課題4：本の情報を更新するAPIを作る
やること：
1. URLから本のIDを受け取る（例：/api/books/3 → IDは3）
2. 新しいタイトル・著者・価格を受け取る
3. そのIDの本を更新する（SQLのUPDATE文）
4. 更新したデータを返す


# 課題 5
指定された ID の本を削除する API を作成し、さらにフロントエンドから
全ての CRUD 操作を実行できるようにしてください。
■ サーバー側（index.js）
エンドポイント: DELETE /api/books/:id
URL パラメータ: id（削除対象の本の ID）
処理内容:
1. URL から id を取得する
2. 指定された ID の本を DELETE する
3. 削除された本のデータを返す
■ フロントエンド側（main.js）
本の一覧を取得して表示する機能
各本に「削除」ボタンを追加する機能
削除ボタンを押したら DELETE /api/books/:id を呼び出す