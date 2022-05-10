<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%--<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>--%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<title>Insert title here</title>
</head>
<%--<sec:authorize access="isAuthenticated()">--%>
<%--	<sec:authentication property="principal" var="principal"/>--%>
<%--</sec:authorize>--%>
<body>
	<div class="jumbotron" style="margin-bottom: 0">
		<h1>MyBoard</h1>
	</div>
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark mb-3">
		<!-- Links -->
		<ul class="navbar-nav mr-auto">
		     <li class="nav-item active"><a class="nav-link" href="/">HOME</a>
			</li>
			<li class="nav-item"><a class="nav-link" href="/board/insert">BoardInsert</a>
			</li>
			<li class="nav-item"><a class="nav-link" href="/board/list">BoardList</a>
			</li>
	   </ul>
	   		<ul class="navbar-nav">
<%--	   		<sec:authorize access="isAnonymous()">--%>
<%--				<li class="nav-item"><a class="nav-link" href="/login">로그인</a>--%>
<%--				</li>--%>
<%--				<li class="nav-item"><a class="nav-link" href="/register">회원가입</a>--%>
<%--				</li>--%>
<%--			</sec:authorize>--%>
<%--			<sec:authorize access="isAuthenticated()">--%>
<%--				<li class="nav-item">--%>
<%--				<a class="nav-link" href="/logout">--%>
<%--				로그아웃(<sec:authentication property="principal.user.username"/>)/	${principal.user.username }</a>--%>
<%--			--%>
<%--				</li>--%>
<%--		 </sec:authorize>--%>
	   </ul>
	</nav>