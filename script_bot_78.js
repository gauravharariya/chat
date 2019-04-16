var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
var url="/faqbot";

var urlMap=new Map();
	urlMap.set("passwordReset","/password/reset");

$(document).ready(function(){
    $(".chat-closed").on("click",function(e){
        $(".chat-header,.chat-content").removeClass("hide");
        $(this).addClass("hide");
    });

    $(".chat-header").on("click",function(e){
        $(".chat-header,.chat-content").addClass("hide");
        $(".chat-closed").removeClass("hide");
    });

    $(".close-header").on("click",function(e){
    	$('.discussion li:not(:first):not(:last)').remove();
 });
});

/*$(document).ready(function(){
	$('#start-record-btn').on("click",function(e){
		popup();
		$(this).addClass("hide");
		
	});
});
function popup(){
	document.getElementById("speech_ok").style.display = "block";
}*/
function speech(){
	document.getElementById("speech_ok").style.display = "inline-block";
			$.ajax({
			url:'/speech',
			type:'GET',
			success : function(response){
				document.getElementById("speech_ok").style.display = "none";
				$('#start-record-btn').show();
				if (!$.trim(response)){
					document.getElementById("speech_ok").style.display = "none";
					$('#start-record-btn').show();
					console.log(response)
				}
				else{
				var datas = response;
				addIn(datas);
				document.getElementById("speech_ok").style.display = "none";
				$('#start-record-btn').show();
				console.log(datas);
				var data = 'input='
						+ encodeURIComponent(datas);
				$.ajax ({
					url:url,
					type:'POST',
					data:data,
					success:function(response){
						var newSend = response+'\r'+'\n';
						document.getElementById("speech_ok").style.display = "none";
						$('#start-record-btn').show();
						addOut(newSend);
						console.log(newSend);
					},
					error:function(xhr, status, error){
						document.getElementById("speech_ok").style.display = "none";
						$('#start-record-btn').show();
						console.log(error);
					}
				});
				
				}}
				
		});
	document.getElementById("speech_ok").style.display = "none";
				$('#start-record-btn').show();	
}

function addIn(input) {
/* 	$("#edit").html($("#edit").html()+ "<br />"+ input+'\r'+'\n');
 */	
	today = new Date()
	dayindex = today.toLocaleString(navigator.language, {
    hour: '2-digit',
    minute:'2-digit'
  });
	var user = "<li class='self'><div class='avatar'><img alt='chatbox' src='static/user.png'/>"+
				"</div><div class='messages'><p>"+input+"</p></div></li>"+
				"<div class='time'><p>"+dayindex+"</p></div>";
	
	document.getElementById("ref").insertAdjacentHTML('beforebegin', user);
	var elem = document.getElementById('main');
	  elem.scrollTop = elem.scrollHeight;
 }
 
function addOut(output) {
	/* 	$("#edit").html($("#edit").html()+ "<br />"+ input+'\r'+'\n');
	 */	
	today = new Date()
	dayindex = today.toLocaleString(navigator.language, {
    hour: '2-digit',
    minute:'2-digit'
  });
	var AI = "<li class='other'><div class='avatar'><img alt='chatbox' src='static/Logoed.PNG' id='image'/>"+
				"</div><div class='messages-out'><p>"+output+"</p></div></li>"+
				"<div class='time-out'><p>"+dayindex+"</p></div>";
	document.getElementById("ref").insertAdjacentHTML('beforebegin', AI);
	var elem = document.getElementById('main');
	  elem.scrollTop = elem.scrollHeight;
}

$(document).ready(function() {
     //added missing-v quotes 
     $('#close').click(function() {
        location.reload();     
     });    
   });  
 
function txtbox(ele) {
    if(event.key === 'Enter') {
        alert(ele.value);        
    }
}
	
$("#edit").change(function() {
	  scrollToBottom();
	});
	
function scrollToBottom() {
	  $('#edit').scrollTop($('#object')[0].scrollHeight);
	}


$(document).ready(function() {
    $('#mainscreen').submit(
        function(event) {
            var input = $('#input').val();
           	var send= input+'\r'+'\n';
           	addIn(send);
            $('#input').val("");
            var data = 'input='
                    + encodeURIComponent(input);
            $.ajax({
                url: url,
                data : data,
                type : "POST",
                success : function(response) {                   
                   var newSend= response+'\r'+'\n';
                   addOut(newSend);
                   $('#input').focus();
                },
                error : function(xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
            return false;
        });
    });
