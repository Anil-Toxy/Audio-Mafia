$(document).ready(function(){
			$('#home').show();
			$('#albums').hide();
			$('#tracks').hide();

		$('#home1').click(function(){
			$('#home').show();
			$('#albums').hide();
			$('#tracks').hide();
			console.log($('#home1'));
		});
		$('#albums1').click(function(){
			$('#home').hide();
			$('#albums').show();
			$('#tracks').hide();
		});
		$('#tracks1').click(function(){
			$('#home').hide();
			$('#albums').hide();
			$('#tracks').show();
		});
});