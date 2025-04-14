<?php 
spl_autoload_register(function($path) {
	$path= str_replace('\\', '/', $path);
	$path= "{$_SERVER['DOCUMENT_ROOT']}/api/{$path}.php";
	// print("path: {$path}");
	require_once $path;
});
?>