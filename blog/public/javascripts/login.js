var loginNameSpace = {}
$(document).ready(function(){
	(function(){
		$("#form-login").bind("submit",function(){
			var username = $(this).find("input[name='username']").val()
			var password = $(this).find("input[name='password']").val()
			$.ajax({
				url:"/ajax/login",
				type:"POST",
				dataType:"JSON",
				data:{"username":username,"password":password},
				success:function(data){
					switch (data.status){
						case 1:
							window.location.href = "/"
						break;
					}

				}
			})
			return false
		})
	})()
	$("#form-reg").bind("submit",function(){
		var username = $(this).find("input[name='username']").val()
		var password = $(this).find("input[name='password']").val()
		$.ajax({
			url:"/ajax/register",
			type:"POST",
			data:{"username":username,"password":password},
			dataType:"JSON",
			beforeSend:function(){
				
			},
			success:function(data){
				switch(data.status){
					case 0:
						window.location.href="/"
					break;
					case 1:
						alert(data.message)
					break;
					case 2:
						alert(data.message)
					break;
					case 3:
						alert(data.message)
					break;
				}
			}
		})
		return false
	})
})

