/*
課題 5
(1) 価格が3000円未満の本だけを検索して表示してください。
*/
SELECT * FROM books WHERE price < 3000;

/*
(2) 「Web開発の基礎」という本（id: 3）を削除してください。
(3) 削除後、booksテーブルの全データを表示して確認してください。
*/
--(2)
DELETE FROM books WHERE id = 3;

--(3)
SELECT * FROM books;