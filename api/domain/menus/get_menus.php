<?
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-type: application/json');
require_once("{$_SERVER['DOCUMENT_ROOT']}/api/vendor/autoload.php");

$public= $_GET['public'];

$res= [
  'wine'=> null,
  'beer'=> null,
  'liqueur'=> null,
];
$pdo= new \conn\_connect;

$query_wine = "SELECT * FROM `wine` WHERE wine_public='{$public}' ORDER BY wine_key DESC";
$stmt_wine = $pdo->db->prepare($query_wine);
$stmt_wine->execute();
$wines = $stmt_wine->fetchAll(PDO::FETCH_ASSOC);
$res['wine']= $wines;


$query_beer = "SELECT * FROM `beer` WHERE beer_public='{$public}' ORDER BY beer_key DESC";
$stmt_beer = $pdo->db->prepare($query_beer);
$stmt_beer->execute();
$beers = $stmt_beer->fetchAll(PDO::FETCH_ASSOC);
$res['beer']= $beers;


$query_liqueur = "SELECT * FROM `liqueur` WHERE liqueur_public='{$public}' ORDER BY liqueur_key DESC";
$stmt_liqueur = $pdo->db->prepare($query_liqueur);
$stmt_liqueur->execute();
$liqueurs = $stmt_liqueur->fetchAll(PDO::FETCH_ASSOC);
$res['liqueur']= $liqueurs;


$query_tapas = "SELECT * FROM `tapas` WHERE tapas_public='{$public}' ORDER BY tapas_order DESC, tapas_key DESC";
$stmt_tapas = $pdo->db->prepare($query_tapas);
$stmt_tapas->execute();
$tapas = $stmt_tapas->fetchAll(PDO::FETCH_ASSOC);
$res['tapas']= $tapas;

echo json_encode($res);
?>