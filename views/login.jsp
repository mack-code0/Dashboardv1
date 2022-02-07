<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="headerlink.jsp" />
    <style>
    	.error-fixed{
    		position: fixed;
    		top: 0;
    		left: 50%;
    		transform: translateX(-50%);
    	}
    </style>
</head>
<body>
<%
	if(request.getParameter("error")!=null){
%>
	<div class="alert error-fixed alert-danger alert-dismissible fade show" role="alert">
	  <strong>Invalid Login Credentials!</strong>
	  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	    <span aria-hidden="true">&times;</span>
	  </button>
	</div>
<%
	}
%>
	    <main>
        <div class="w-50 mx-auto main my-5">
            <img src="${pageContext.request.contextPath}/styling/images/logo.png" class="mb-5" width="170">

            <p class="p1 mb-4">Login<i class="bx bxs-lock"></i></p>
            
            <a class="a-text" href="#">
                <div class="blues d-flex justify-content-center py-2 mb-4">
                    <i class="bx bxl-google mr-1"></i><p class="my-auto">Login with Google</p>
                </div>
            </a>

             <p class="subtitle fancy mt-5 mb-4"><span>or</span></p>
            
             <form action="${pageContext.request.contextPath}/loginuser">
                 <div class="form-group">
                     <label for="email" class="form-label">Email</label>
                     <input id="email" type="email" name="email" class="form-control form-input" required>
                 </div>

                 <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" type="password" name="password" class="form-control form-input" required>
                </div>

                <div class="form-group">
                    <button class="btn blue-bg text-white px-4 mb-2">Login</button>
                    <p class="check_box_text">Have no account? <a href="${pageContext.request.contextPath}/registerpage" class="a-text">Sign up Here</a></p>
                </div>
            </form>
        </div>
    </main>
    
    
    <script src="${pageContext.request. contextPath}/styling/js/jquery-3.4.1.js"></script>
    <script type="text/javascript" src="${pageContext.request. contextPath }/styling/js/bootstrap.min.js"></script>
</body>
</html>