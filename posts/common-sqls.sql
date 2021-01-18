
-- How to check total connection or process
SELECT * from INFORMATION_SCHEMA.PROCESSLIST where db = 'some_db' ORDER BY `PROCESSLIST`.`TIME`  DESC