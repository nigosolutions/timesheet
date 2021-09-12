<?php 

if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["action"])){
	switch ($_POST['action']) {
		case 'insertRecord':
		insertRecord();
		break;
		case 'showProcess':
		showProcess();
		default:
		break;
	}
}

function insertRecord() {
    include 'conn.php';
    $cardid = $_POST['cardid'];
    $stmt = $conn->prepare("INSERT INTO `rfid`(`UID`, `Timestamp`) VALUES (:card, now())");
    $stmt->bindParam(":card", $cardid);
	$stmt->execute();
	
	echo "success";
}

function showProcess()
{
	include 'conn.php';

	$logs = $conn->query("SELECT * FROM `rfid`");
	while($r = $logs->fetch()){
		echo "<tr>";
		echo "<td>".$r['UID']."</td>";
		echo "</tr>";
	}
}

?>
