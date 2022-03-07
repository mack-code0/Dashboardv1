<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="headerlink.jsp" />
</head>
<body>

<main>
        <div class="w-50 mx-auto main my-5">
            <img src="${pageContext.request.contextPath}/styling/images/logo.png" class="mb-5" width="170">

            <p class="p1 mb-4">Sign Up<i class="bx bxs-lock"></i></p>
            
            <a class="a-text" href="#">
                <div class="blues d-flex justify-content-center py-2 mb-4">
                    <i class="bx bxl-google mr-1"></i><p class="my-auto">Sign up with Google</p>
                </div>
            </a>

             <p class="subtitle fancy mt-5 mb-4"><span>or</span></p>
            
             <form action="${pageContext.request.contextPath}/registeruser">
                 <div class="form-group">
                     <label class="form-label">Company's Email</label>
                      <input required name="email" class="form-control form-input">
                 </div>

                 <div class="form-group">
                    <label class="form-label">Company Name</label>
                    <input required name="name" class="form-control form-input">
                </div>

                <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input required name="phone" class="form-control form-input">
                </div>

                <div class="form-group">
                    <label class="form-label">Address</label>
                    <input required name="address" class="form-control form-input">
                </div>

                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input required name="password" type="password" class="form-control form-input">
                </div>

                <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <input required name="pass" type="password" class="form-control form-input">
                </div>

                <div class="form-group d-flex mt-3">
                    <p class="check_box_text">Already have an account? <a href="${pageContext.request.contextPath}" class="a-text">Login</a></p>
                </div>

                <button class="btn blue-bg text-white px-4">Sign Up</button>
             </form>
        </div>
    </main>

</body>
</html>