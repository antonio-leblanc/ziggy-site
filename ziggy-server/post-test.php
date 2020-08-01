<?php

if (!isset($_POST['subject'])){
  echo 'No Subject';
  exit();
} else {
  $subject = $_POST['subject'];
}

?>

<form action ='post-test.php' method='post'> 
    <input type="text" name="subject" placeholer="Subject">
    <input type="text" name="dog_name" placeholer="Name">
    <input type="submit">
</form>
    