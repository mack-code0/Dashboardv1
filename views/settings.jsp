<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="headerlink.jsp" />
</head>
<body>
		<sql:query var="rs" dataSource="jdbc/mack">
			select * from user where id=${user.id}
		</sql:query>
		
		
        <nav class="w-100 p-4 d-flex justify-content-between top-nav">
            <div class="d-flex">
                <img src="${pageContext.request.contextPath}/styling/images/dashboard.png" class="img-sm mr-2 my-auto">
                <p id="dashboard" class="my-auto">Dashboard</p>
            </div>
            
            <img src="${pageContext.request.contextPath}/styling/images/logo.png" class="img-sm">
        </nav>


    <div class="allers d-flex w-100">    
        <nav class="side-nav d-flex flex-column align-items-center">
            <div class="d-flex justify-content-start px-3 pb-2 pt-5 w-75 border-bottom">
                <img src="${pageContext.request.contextPath}/styling/images/content.png" class="my-auto img-smm mr-2">
                <p class="my-auto">
                    <a href="${pageContext.request.contextPath }/dashboardspage">Dashboard</a>
                </p>
            </div>

            <div class="d-flex justify-content-start px-3 pb-2 pt-5 w-75 border-bottom">
                <img src="${pageContext.request.contextPath}/styling/images/new.png" class="my-auto img-smm mr-2">
                <p class="my-auto">
                    <a href="${pageContext.request.contextPath }/addpage">New Purchase</a>
                </p>
            </div>
            
            <div class="d-flex justify-content-start px-3 pb-2 pt-5 w-75 border-bottom">
                <img src="${pageContext.request.contextPath}/styling/images/items (1).png" class="my-auto img-smm mr-2">
                <p class="my-auto">
                    <a href="${pageContext.request.contextPath }/updatepage">Update Purchase</a>
                </p>
            </div>

            <div class="d-flex justify-content-start px-3 pb-2 pt-5 w-75 border-bottom">
                <img src="${pageContext.request.contextPath}/styling/images/settings.png" class="my-auto img-smm mr-2">
                <p class="my-auto active">
                    <a href="${pageContext.request.contextPath }/settingspage">Settings</a>
                </p>
            </div>

            <div class="d-flex justify-content-start px-3 pb-2 pt-5 w-75 border-bottom">
                <img src="${pageContext.request.contextPath}/styling/images/logout.png" class="my-auto img-smm mr-2">
                <p class="my-auto">
                    <a href="#">Logout</a>
                </p>
            </div>
        </nav>

        <main class="main-in-add">

            <div class="main-add-inner p-4">
                <h2 class="mb-5">Settings <i class="bx bx-link-alt"></i></h2>
            
                <form class="d-flex justify-content-between">
                    <!--First Group-->
                    <c:forEach var="row" items="${rs.rows}">
	                    <div class="form-group w-50 pr-4">
	                        <div class="form-group mb-4">
	                            <label for="name" class="form-label">System Name</label>
	                            <input value="${row.systemname}" id="name" name="name" class="form-control form-input">
	                        </div>
	
	                        <div class="form-group mb-4">
	                            <label for="currency" class="form-label">Currency</label>
	                            <select id="currency" name="currency" class="form-control form-input">
	                                <option value="dollar">USD</option>
	                                <option value="naira">NGN</option>
	                            </select>
	                        </div>
	
	                        <div class="form-group mb-4">
	                            <label for="phone" class="form-label">Phone</label>
	                            <input value="${row.phone}" id="phone" name="phone" type="number" class="form-control form-input" placeholder="+000 0000 00">
	                        </div>
	                    </div>
	                    <!--End of First Group-->
	                    <!--Second Group-->
	                    <div class="form-group w-50">
	                        <div class="form-group mb-4">
	                            <label for="email" class="form-label">Email</label>
	                            <input value="${row.email}" id="email" name="email" type="email" class="form-control form-input">
	                        </div>
	                        
	                        <div class="form-group mb-4">
	                            <label for="address" class="form-label">Address</label>
	                            <input value="${row.address}" id="address" name="address" type="text" class="form-control form-input" placeholder="">
	                        </div>
	
	                        <div class="form-group d-flex justify-content-end mt-5">
	                            <button type="submit" class="btn blue-bg text-white px-4 py-3 mr-3">Update</button>
	                            <button type="reset" class="btn bg-dark text-white px-4 py-3">Reset</button>
	                        </div>
	                    </div>
                    </c:forEach>
                    <!--End of Second Group-->
                </form>


                <h2 class="mb-5 mt-5">Admin <i class="bx bx-link"></i></h2>
            
                <form class="d-flex justify-content-between">
                    <!--First Group-->
                    <div class="form-group w-50 pr-4">
                    <c:forEach var="secRow" items="${rs.rows}">
                        <div class="form-group mb-4">
                            <label for="name" class="form-label">Name</label>
                            <input value="${secRow.name}" id="name" name="name" class="form-control form-input">
                        </div>
					</c:forEach>
                        <div class="form-group mb-4">
                            <label for="oldpass" class="form-label">Current Password</label>
                            <input id="oldpass" name="oldpass" type="password" class="form-control form-input" placeholder="">
                        </div>
                    </div>
                    <!--End of First Group-->
                    <!--Second Group-->
                    <div class="form-group w-50">
                        <div class="form-group mb-4">
                            <label for="newpass" class="form-label">New Password</label>
                            <input id="newpass" name="newpass" type="password" class="form-control form-input" placeholder="">
                        </div>

                        <div class="form-group mb-4">
                            <label for="repnewpass" class="form-label">Repeat New Password</label>
                            <input id="repnewpass" name="repnewpass" type="password" class="form-control form-input" placeholder="">
                        </div>

                        <div class="form-group d-flex justify-content-end mt-5">
                            <button type="submit" class="btn blue-bg text-white px-4 py-3 mr-3">Update</button>
                            <button type="reset" class="btn bg-dark text-white px-4 py-3">Reset</button>
                        </div>
                    </div>
                    <!--End of Second Group-->
                </form>
                
                <div class="w-25">
                	<div class="bg-light" id="flip">More Options</div>
					<div id="panel">
						<button type="reset" class="btn bg-danger text-white px-4 py-1">Delete Account</button>
					</div>
				</div>
				
            </div>

        </main>
    </div>
    
    
    <script src="${pageContext.request. contextPath}/styling/js/jquery-3.4.1.js"></script>
    
<script> 
$(document).ready(function(){
    $("#flip").click(function(){
        $("#panel").slideToggle("slow");
    });
});
</script>

    <script>
	    <%if(request.getAttribute("success")=="1"){%>
		    Swal.fire({
	            icon: 'success',
	            title: 'Successfully Added to Database',
	            showConfirmButton: false,
	            timer: 1500
	        })
		<%}%>	
    </script>
    
    <script src="${pageContext.request. contextPath }/styling/js/bootstrap.min.js"></script>
</body>
</html>