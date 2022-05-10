<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ include file="../includes/header.jsp" %>   
<div class="container">
  <h3>Board Insert</h3>
  <form action="insert" method="post">
    <div class="form-group">
      <label for="email">제목 :</label>
      <input type="text" class="form-control" id="email" placeholder="Enter title" name="email">
    </div>
    <div class="form-group">
      <label for="name">작성자:</label>
      <input type="text" class="form-control" id="name" name="name"
<%--                   value="${principal.user.username }" readonly="readonly"--%>
      >
    </div>
    <div class="form-group">
      <label for="phone">내용:</label>
      <textarea class="form-control" rows="5" id="phone" name="phone"></textarea>
    </div>
    <button type="submit" class="btn btn-primary btn-sm">글쓰기</button>
  </form>
</div>

</body>
</html>