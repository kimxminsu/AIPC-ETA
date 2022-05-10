<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../includes/header.jsp"%>
<div class="container">
	<h3>Board View</h3>
	<br />
	<div class="form-group">
			<label for="num">글번호:</label> 
			<input type="text" class="form-control" id="num" name="num" value="${board.num}" readonly="readonly">

		</div>
		<div class="form-group">
			<label for="title">제목:</label> 
			<input type="text" class="form-control" id="title" name="title" value="${board.email}" readonly="readonly">

		</div>
		<div class="form-group">
			<label for="writer">글쓴이:</label> 
			<input type="text" class="form-control" id="writer" name="writer" value="${board.name}" readonly="readonly">
		</div>
		<div class="form-group">
			<label for="content">내용:</label>
			<textarea id="content" name="content" id="content" class="form-control" readonly="readonly">${board.phone }</textarea>
		</div>
		
<%--		<c:if test="${principal.user.username == board.writer }">--%>
<%--		<button type="button" id="btnUpdate" class="btn btn-secondary  btn-sm">수정</button>--%>
		<button type="button" id="btnDelete" class="btn btn-danger  btn-sm">삭제</button>
<%--	   </c:if>--%>
	   
<%--	   	<div class="container mt-5">--%>
<%--		<div class="form-group">--%>
<%--			<label for="comment">Comment:</label>--%>
<%--			<textarea class="form-control" rows="5" id="msg" name="text"></textarea>--%>
<%--		</div>--%>
<%--		<button type="button" class="btn btn-success" id="commentBtn">Comment Write</button>--%>
	</div>
	<div id="replyResult"></div>
</div>

<script>
<%--var init =function(){--%>
<%--	$.ajax({--%>
<%--		type:"get",--%>
<%--		url :"/reply/list/"+$("#num").val()--%>
<%--	})--%>
<%--	.done(function(resp){--%>
<%--		//alert(resp.length);--%>
<%--		var str="<table class='table table-hover mt-3'>";--%>
<%--		$.each(resp, function(key, val){--%>
<%--			str +="<tr>"--%>
<%--			str +="<td>"+ val.user.id+"</td>"--%>
<%--			str += "<td>"+val.content+"</td>"--%>
<%--			str += "<td>"+val.regdate+"</td>"--%>
<%--			if("${principal.user.id}"== val.user.id){--%>
<%--				str += "<td><a href='javascript:fdel("+val.cnum +")'>삭제</a></td>"--%>
<%--			}--%>
<%--			str +="</tr>"--%>
<%--		})--%>
<%--		$("#replyResult").html(str);--%>
<%--	})--%>
<%--	.fail(function(e){--%>
<%--		alert("error :" + e);--%>
<%--	})--%>
<%--}--%>
<%--//댓글--%>
<%--function fdel(cnum){--%>
<%--	$.ajax({--%>
<%--		type:"delete",--%>
<%--		url :"/reply/delete/"+cnum--%>
<%--	})--%>
<%--	.done(function(resp){--%>
<%--		alert(resp + "번 글 삭제 성공")--%>
<%--		init();--%>
<%--	})--%>
<%--	.fail(function(){--%>
<%--		alert("댓글 삭제 실패")--%>
<%--	})--%>
<%--}--%>


<%--$("#btnUpdate").click(function(){--%>
<%--	if(confirm("정말 수정할까요?")){--%>
<%--		location.href="/board/update/${board.num}";--%>
<%--	}--%>
<%--})--%>
$("#btnDelete").click(function(){
	if(confirm("정말삭제 할까요")){
		$.ajax({
			type:"DELETE",
			url : "/board/delete/${board.num}",
			success : function(resp){
				if(resp=="success"){
					alert("삭제성공")
					location.href="/board/list"
				}
			}, //success
			error : function(e){
				alert("삭제 실패");
			}
		})
	}
})
//댓글쓰기
<%--$("#commentBtn").click(function(){--%>
<%--	if(${empty principal.user}){--%>
<%--		alert("로그인 하세요");--%>
<%--		location.href="/login";--%>
<%--		return;--%>
<%--	}--%>
<%--	if($("#msg").val()==""){--%>
<%--		alert("댓글을 적으세요")--%>
<%--		return;--%>
<%--	}--%>
<%--	var data ={--%>
<%--			"bnum" : $("#num").val(),--%>
<%--			"content" :$("#msg").val()--%>
<%--	}--%>
<%--	$.ajax({--%>
<%--		type:"POST",--%>
<%--		url : "/reply/insert/"+$("#num").val(),--%>
<%--		contentType:"application/json;charset=utf-8",--%>
<%--		data:JSON.stringify(data)--%>
<%--	})--%>
<%--	.done(function(resp){--%>
<%--		alert("댓글 추가 성공")--%>
<%--		init();--%>
<%--	})--%>
<%--	.fail(function(){--%>
<%--		alert("댓글 추가 실패");--%>
<%--	});--%>
<%--})--%>
<%--init();--%>
</script>

</body>
</html>