<?php
namespace conn;
use \PDO;
require_once("{$_SERVER['DOCUMENT_ROOT']}/api/vendor/env.php");
// require_once('vendor/env.php');


class _connect {
	function __construct(){
		$host = getenv('DB_HOST');
		$user = getenv('DB_USERNAME');
		$password = getenv('DB_PASSWORD');
		$name = getenv('DB_NAME');
		$dbChar = "utf8"; 

		try {
			$dsn = "mysql:host={$host};dbname={$name};charset={$dbChar}";
			$this->db = new PDO($dsn, $user, $password);
			
			// PDO 속성 설정
			$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
			
			// echo "데이터베이스 연결 성공!";
		} catch(PDOException $e) {
			echo "연결 실패: " . $e->getMessage();
		}
	}
}
?>