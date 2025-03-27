<?php
namespace conn;
require_once('vendor/env.php');

class conn_db {
	public $db_host,$db_user,$db_password,$db_name,$con;
	
	function connectDB(){
		$this->db_host = getenv('EX1_DB_HOST');
		$this->db_user = getenv('EX1_DB_USERNAME');
		$this->db_password = getenv('EX1_DB_PASSWORD');
		$this->db_name = getenv('EX1_DB_NAME');
		$this->con = mysqli_connect($this->db_host, $this->db_user, $this->db_password, $this->db_name); // 데이터베이스 접속

		if ($this->con->connect_errno) { die('Connection Error : '.$con->connect_error); } // 오류가 있으면 오류 메세지 출력
	}
}
?>