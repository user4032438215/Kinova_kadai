/*
課題 3
現在貸出中（returned が '未返却'）の本の情報を、以下の形式で表示してください。
本のタイトル
著者名
借りた人の名前
貸出日
JOINを使って、booksテーブルとrentalsテーブルを結合してください。
 */
SELECT
  books.title AS 本のタイトル,
  books.author AS 著者名,
  rentals.borrower AS 借りた人の名前,
  rentals.rental_date AS 貸出日
FROM
  books
  JOIN rentals ON books.id = rentals.book_id
WHERE
  rentals.returned = '未返却';
  