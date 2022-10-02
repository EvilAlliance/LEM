$(document).ready(function(){
	$('#Login').on('click', function(){
		/* Checking if the inputs are empty, if they are, it will show a message, if not, it will send the
		data to the php file. */
		if($('#CI').val() == "" || $('#Contra').val() == ""){
			Swal.fire(
				'Some input is blanck',
				'Stupid!',
				'info'
			  )
		}else{
			let CI = $('#CI').val();
			let Contra = $('#Contra').val();
			$.ajax({
				url: 'Verificar.php',
				type: 'POST',
				data: {
					CI: CI,
					Contra: Contra
				},
				/* Checking if the data is equal to "No Existe" if it is, it will show a message, if not, it will
				show another message. */
				success: function(data){
					console.log(data);
					if ( data == "No Existe" ) {
						Swal.fire({
							icon: 'error',
							title: 'User and password were not found in data base',
							text: 'Booo'
						  });
					} else {
						console.log(JSON.parse(data));
						Swal.fire(
							'Successful Login!',
							'hip hip hurray',
							'success'
						  );
					};
					
				},
				fail: function () {
					Swal.fire({
						icon: 'error',
						title: 'Can not connect to the Data Base',
						text: 'HAHA'
					});
				}
			});
		}
 
	});
});
function getall(){
	console.log("daf");
};