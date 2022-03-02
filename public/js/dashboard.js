var outer_prod_ref;
document.querySelectorAll(".stow").forEach(element => {
    element.addEventListener("click", function(){
    	//Parameters
        var prod_ref = element.querySelector("#prod-ref").innerText;
        outer_prod_ref = prod_ref;
        var prod_name = element.querySelector("#prod-name").innerHTML;
        var prod_desc = element.querySelector("#prod-desc").innerHTML;
        
        //Bootstraping the buttons
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn action-btn-2 btn-danger',
                cancelButton: 'btn action-btn-1 mr-4'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            html:  '<div class="w-100 text-left">'
                    +'<p class="mt-3"><b class="text-success"><u>Name:</u></b><br>'+prod_name+'</p><br>'
                    +'<p class="mt-n4"><b class="text-primary"><u>Description:</u></b><br>'+prod_desc+'</p>'
                    +'</div>',
            title: "Product Id: "+prod_ref,
            text: "You won't be able to revert this!",
            //   icon: 'info',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: '<i class="bx bx-trash mr-2"></i>Delete Product',
            cancelButtonText: '<i class="bx bx-link-alt mr-2"></i>Update Product',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                io();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                window.location.href = "/updateproduct/"+prod_ref+"";
            }
        })
    })
});


function io(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger mr-3'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
        	$.ajax({
        		url: "/admin/deleteproduct",
        		type: "post",
        		data: {prodId : outer_prod_ref},
        		success: function(){
                    swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
        			setTimeout(function(){
        				location.reload();
        			}, 2000);
        		},
        		error: function(){
        			swalWithBootstrapButtons.fire(
                            'An error Occured',
                            'Your file has not been deleted.',
                            'error'
                        )
        		}
        	})

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your Product is safe :)',
                'error'
            )
        }
    })
}


