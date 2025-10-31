/*
課題 4
山田次郎さんが借りていた本（rental_idが1番のレコード）が返却されました。
このレコードのreturnedカラムを '返却済' に更新してください。
*/
UPDATE rentals SET returned = '返却済' WHERE id = 1; --どのテーブルにもrental_idというカラムがないためidカラムを指定

/*
更新後、rentalsテーブルの全データを表示して確認してください。
*/
SELECT * FROM rentals;