<?php
     require_once "conexion.php";
     
     $CI = $_POST['CI'];
     $Contra = $_POST['Contra'];

    /* A query to the database. */
     $query = "SELECT rol.ci, rol.contra FROM rol where rol.contra='$Contra' and rol.ci='$CI';";
     $result = mysqli_query($conn, $query);

     /* Checking if the result is greater than or equal to 1, if it is, it will loop through the
     results and add them to an array. If it is not, it will echo "No Existe". */
     if($result->num_rows >= 1){
      while($row = mysqli_fetch_assoc($result)){
       $json[] = array(
       'CI' => $row['ci'],
       'Contra' => $row['contra'],
       );
      }
         echo json_encode($json);
     }else if (isset($result)){
         echo 'No Existe';
      }
?>