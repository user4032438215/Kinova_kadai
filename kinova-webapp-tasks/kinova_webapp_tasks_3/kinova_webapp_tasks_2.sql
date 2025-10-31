/*
課題 2
以下のデータを登録してください。
■booksテーブルに3冊の本を追加
1. タイトル: 'プログラミング入門', 著者: '佐藤太郎', 価格: 2800
2. タイトル: 'データベース設計', 著者: '鈴木花子', 価格: 3200
3. タイトル: 'Web開発の基礎', 著者: '田中一郎', 価格: 2500
 */

INSERT INTO
  books (title, author, price)
VALUES
  ('プログラミング入門', '佐藤太郎', 2800),
  ('データベース設計', '鈴木花子', 3200),
  ('Web開発の基礎', '田中一郎', 2500);

/*
■rentalsテーブルに2件の貸出記録を追加
1. book_id: 1, borrower: '山田次郎', rental_date: '2024-02-01', returned: '未返却'
2. book_id: 2, borrower: '佐々木三郎', rental_date: '2024-02-03', returned: '返却済'
 */

 INSERT INTO
  rentals(book_id, borrower, rental_date, returned)
VALUES
  (1, '山田次郎', '2024-02-01', '未返却'),
  (2, '佐々木三郎', '2024-02-01', '返却済');