
var print_btn = document.querySelector(".print-btn");
var starts = "<main class='container'>"
			+"<div class='border-bottom my-5 d-flex justify-content-between align-items-center'>"
			+"<img src='"+for_print+"/styling/images/logo.png' width='100'>"
			+"<p class='mt-3'>Products</p>"
			+"</div>";
var ends = "</main>";
print_btn.addEventListener("click", function() {
	var table = document.querySelector("table").outerHTML;
	var a = window.open('', '', 'height=700, width=700');
	a.document.write("<html><head><link rel='stylesheet' href="+for_print+"/styling/css/bootstrap.min.css></head><body>");
//	a.document.write("<button id='new_print'>Print</button>");
	a.document.write(starts);
	a.document.write(table);
	a.document.write(ends);
//	a.document.getElementById("new_print").addEventListener("click", function(){
//		a.print();
//	})
	a.document.addEventListener("dblclick", function(){
		a.print();
	});
	a.document.write("</body></html>");
	a.document.close();
});
