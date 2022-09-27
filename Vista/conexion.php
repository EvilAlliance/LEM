/* Connecting to the database. */
<?php
      $conn = mysqli_connect('192.168.1.50','root','','LEMdatabase');
      if(!$conn) {
          echo 'No conectado';
      }
?>