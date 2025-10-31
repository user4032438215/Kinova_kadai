-- https://developer.mozilla.org/ja/docs/Glossary/SQL

/*
 よく使われる命名規則（ベストプラクティス）
テーブル名 英語の小文字＋複数形 単数形（user）は避ける傾向あり
カラム名 英語の小文字＋スネークケース キャメルケース（userName）は避ける
主キー（PK）id テーブル内で一意になるように
外部キー（FK）{参照先テーブル名（単数形）}_id（例：user_id）  **users_id は非推奨**
日時カラム _at を接尾辞に（例：created_at, updated_at） 一貫性が重要
日付カラム _on を接尾辞に（例：publish_on） 時刻と区別しやすい
*/




/*
図書館システムで使用する以下の2つのテーブルを作成してください。←CREATE TABELコマンド

■booksテーブル（本の情報）
@tablename
@id: 連番のID（主キー）
@title: 本のタイトル（TEXT型、NULL不可）
@author: 著者名（TEXT型、NULL不可）
@price: 価格（INTEGER型）←“整数”を入れるための箱

■rentalsテーブル（貸出記録）
tablename
id: 連番のID（主キー）
book_id: 本のID（INTEGER型、外部キー、booksテーブルのidを参照）
borrower: 借りた人の名前（TEXT型、NULL不可）
rental_date: 貸出日（DATE型）
returned: 返却済みかどうか（TEXT型、デフォルト値は '未返却'）
*/


-- booksテーブル（本の情報）
CREATE TABLE books (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
	  price INTEGER
        );


-- rentalsテーブル（貸出記録）
CREATE TABLE rentals (
          id SERIAL PRIMARY KEY,
          book_id TEXT NOT NULL,
          rental_date DATE,
	  returned TEXT DEFAULT '未返却'
        );