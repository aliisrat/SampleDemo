var productList = [];

//var orderProductAndQuantityList = new Hashtable();
var orderSupplierList = [];
var count=1;
$(document).ready(function() {
						
	
						/*if(productListFromController!=null && productListFromController!=undefined)
						{
							var prodctlst = [supplierIdForOrder,productIdForOrder, orderQuantity,supplierMobileNumber];
							orderSupplierList.put(count,prodctlst);
						}*/
						$('#orderQuantity').keypress(function( event ){
						    var key = event.which;
						    
						    if( ! ( key >= 48 && key <= 57 || key === 13 ) )
						        event.preventDefault();
						});
						$('#orderQuantityOneOrderId').keypress(function( event ){
						    var key = event.which;
						    
						    if( ! ( key >= 48 && key <= 57 || key === 13 ) )
						        event.preventDefault();
						}); 
						$('#supplierMobileNumberOneOrderId').keypress(function( event ){
						    var key = event.which;
						    
						    if( ! ( key >= 48 && key <= 57 || key === 13 ) )
						        event.preventDefault();
						}); 
						$('#supplierMobileNumber').keypress(function( event ){
						    var key = event.which;
						    
						    if( ! ( key >= 48 && key <= 57 || key === 13 ) )
						        event.preventDefault();
						}); 
						$('#addOrderProduct').click(function(){
							
							var buttonStatus=$('#addOrderProduct').text();
			            	if(buttonStatus==="Update")
			            	{
			            		updaterow($('#currentUpdateRowId').val());
			            		return false;
			            	}
							
			            	var supplierRateForOrder=$('#supplierRateForOrder').val();
							var productIdForOrder=$('#productIdForOrder').val();
							var supplierIdForOrder=$('#supplierIdForOrder').val();
							var orderQuantity=$('#orderQuantity').val().trim();
							var supplierMobileNumber=$('#supplierMobileNumber').val().trim();
							
							if(productIdForOrder==="0")
							{
								$('#addeditmsg').modal('open');
	                   	     	$('#msgHead').text("Add Product in Cart Warning :");
	                   	     	$('#msg').text("Select Product"); 
	                   	     	return false;
							}
							if(supplierMobileNumber==="" || supplierMobileNumber===undefined || !(/^\d{10}$/.test(supplierMobileNumber)))
							{
								$('#addeditmsg').modal('open');
	                   	     	$('#msgHead').text("Add Product in Cart Warning :");
	                   	     	$('#msg').text("Supplier mobile number not valid"); 
	                   	     	return false;
							}
							if(orderQuantity==="0" || orderQuantity==="" || orderQuantity===undefined)
							{
								$('#addeditmsg').modal('open');
	                   	     	$('#msgHead').text("Add Product in Cart Warning :");
	                   	     	$('#msg').text("Order Quantity not valid"); 
	                   	     	return false;
							}
							
							for (var i=0; i<orderSupplierList.length; i++) {
		              			//alert("supplierId : "+key+" - ProductId : "+value[0]+" - quantity : "+value[1]+" - mobile Number : "+value[2]);
								var value=orderSupplierList[i];
		              			if(value[0]===supplierIdForOrder && value[1] === productIdForOrder)
		              			{
		              				$('#addeditmsg').modal('open');
		                   	     	$('#msgHead').text("Product Select Warning");
		                   	     	$('#msg').text("This Product and Supplier is already added to Cart"); 
		                   	     	return false;
		              			}
		              		}
							
							//orderProductAndQuantityList.put(productIdForOrder,orderQuantity);
							var prodctlst = [supplierIdForOrder,productIdForOrder, orderQuantity,supplierMobileNumber];
							orderSupplierList.push(prodctlst);
							//alert(orderSupplierList.entries());
							var supplierName=$('#supplierIdForOrder option:selected').text();
							var productName=$('#productIdForOrder option:selected').text();
							var supplierRate=$('#supplierRateForOrder').val();
							
							$("#orderCartTb").append(	"<tr id='rowdel_" + count + "' >"+
							                            "<td id='rowcount_" + count + "'>"+count+"</td>"+
							                            "<td id='rowsuppliername_"+count+"'><input type='hidden' id='rowsupplierid_"+count+"' value="+supplierIdForOrder+"><input type='hidden' id='rowsuppliermob_"+count+"' value="+supplierMobileNumber+"><span id='rowsuppliernametb_"+count+"'>"+supplierName+"</span></td>"+
							                            "<td id='rowproductname_"+count+"'><input type='hidden' id='rowproductid_"+count+"' value="+productIdForOrder+"><span id='rowproductnametb_"+count+"'>"+productName+"</span></td>"+
							                            "<td id='rowsupplierrate_"+count+"'>"+supplierRate+"</td>"+
							                            "<td id='roworderquantity_"+count+"'>"+orderQuantity+"</td>"+
							                            "<td id='roweditbutton_" + count + "'><button type='button'  onclick='editrow(" + count + ")' class='btn-flat'><i class='material-icons'>edit</i></button></td>"+
							                            "<td id='rowdelbutton_" + count + "'><button type='button' onclick='deleterow(" + count + ")' class='btn-flat'><i class='material-icons'>cancel</i></button></td>"+
							                        	"</tr>");
							
							count++;
							//alert(orderSupplierList.entries());
						}); 
						
						
						$('#supplierIdForaddQuantity').change(function(){
							var productId=$('#productIdForAddQuantity').val();
							var supplierId=$('#supplierIdForaddQuantity').val();
							$.ajax({
								url : myContextPath+"/fetchSupplierById?supplierId="+supplierId+"&productId="+productId,
								dataType : "json",
								beforeSend: function() {
									$('.preloader-background').show();
									$('.preloader-wrapper').show();
						           },
								success : function(data) {
									
									$('#supplierRate').val(data);
									$('#supplierRate').change();
									
									findTotalAmountAndTax();
									$('.preloader-wrapper').hide();
									$('.preloader-background').hide();
								},
								error: function(xhr, status, error) {
									$('.preloader-wrapper').hide();
									$('.preloader-background').hide();
									  //alert(error +"---"+ xhr+"---"+status);
									$('#addeditmsg').modal('open');
					       	     	$('#msgHead').text("Message : ");
					       	     	$('#msg').text("Supplier Details Not Found"); 
					       	     		setTimeout(function() 
										  {
						     					$('#addeditmsg').modal('close');
										  }, 1000);
									}
							});
							
						});
						
						$('#orderProductsButtonOneOrderId').click(function(){
							
							var supplierId=$('#supplierIdOneOrderId').val();
							var productId=$('#productIdOneOrderId').val();
							var quantity=$('#orderQuantityOneOrderId').val().trim();
							var mobileNumber=$('#supplierMobileNumberOneOrderId').val().trim();
							
							if(supplierId==="0")
							{
								$('#add').modal('close');
								$('#addeditmsg').modal('open');
								$('#msgHead').text("Supplier Order Warning :");
								$('#msg').html("<font color='red'>Select Supplier</font>");
								return false;
							}
							if(productId==="0")
							{
								$('#add').modal('close');
								$('#addeditmsg').modal('open');
								$('#msgHead').text("Supplier Order Warning :");
								$('#msg').html("<font color='red'>Select Product</font>");
								return false;
							}
							if(mobileNumber==="" || mobileNumber===undefined || !(/^\d{10}$/.test(mobileNumber)))
							{
								$('#addeditmsg').modal('open');
	                   	     	$('#msgHead').text("Supplier Order Warning :");
	                   	     	$('#msg').text("Supplier mobile number not valid"); 
	                   	     	return false;
							}
							if(quantity==="0" || quantity==="" || quantity===undefined)
							{
								$('#addeditmsg').modal('open');
	                   	     	$('#msgHead').text("Supplier Order Warning :");
	                   	     	$('#msg').text("Order Quantity not valid"); 
	                   	     	return false;
							}
							
			            	var productIdList=supplierId+"-"+productId+"-"+quantity+"-"+mobileNumber;
			            	//alert(productIdList);
			            	$('#productWithSupplikerlistOneOrderId').val(productIdList);
			            	
			            	var form = $('#orderBookFormOneOrderId');

							$.ajax({
										type : form.attr('method'),
										url : form.attr('action'),
										data : $("#orderBookFormOneOrderId").serialize(),
										success : function(data) 
										{
											if(data=="Success")
											{
													$('#singleOrder').modal('close');
													$('#addeditmsg').modal('open');
													$('#msgHead').text("Success : ");
													$('#msg').html("<font color='green'>Order Book SuccessFully</font>");
													productIdList=null;
											}
											else
											{
													$('#singleOrder').modal('close');
													$('#addeditmsg').modal('open');
													$('#msgHead').text("Failed : ");
													$('#msg').html("<font color='red'>Order Book Failed</font>");
											}
										}
							});
							
						});
						
						$('#orderProductsButton').click(function(){
							//alert(orderSupplierList.entries());
							var productIdList="";
			            	for (var i=0; i<orderSupplierList.length; i++) {
			            		//alert(value[0]+"-"+value[1]+"-"+value[2]+"-"+value[3]);
			            		var value=orderSupplierList[i];
			            		productIdList=productIdList+value[0]+"-"+value[1]+"-"+value[2]+"-"+value[3]+",";
			          		}
			            	productIdList=productIdList.slice(0,-1)
			            	//alert(productIdList);
			            	$('#productWithSupplikerlist').val(productIdList);
			            	
			            	var form = $('#orderBookForm');

							$.ajax({
										type : form.attr('method'),
										url : form.attr('action'),
										data : $("#orderBookForm").serialize(),
										success : function(data) 
										{
											if(data=="Success")
											{
													$('#add').modal('close');
													$('#addeditmsg').modal('open');
													$('#msgHead').text("Success : ");
													$('#msg').html("<font color='green'>Order Book SuccessFully</font>");
													orderSupplierList = [];
													setTimeout(function() 
													{
														window.location.href=myContextPath+"/fetchProductListForInventory";
													}, 1000);
											}
											else if(data==="EditSuccess")
											{
												$('#add').modal('close');
												$('#addeditmsg').modal('open');
												$('#msgHead').text("Success : ");
												$('#msg').html("<font color='green'>Order Edited SuccessFully</font>");
												orderSupplierList = [];
												setTimeout(function() 
												{
													window.location.href=myContextPath+"/fetchLast24HoursOrdersForEdit";
												}, 1000);
											}
											else
											{
													$('#addeditmsg').modal('open');
													$('#msgHead').text("Failed : ");
													$('#msg').html("<font color='red'>Order Book Failed,Try One More Time</font>");
											}
										}
							});
							
						});
						
						
						$('#addQuantityId').click(function(){
							
							var supplierIdd=$("#supplierIdForaddQuantity").val();
							if(supplierIdd==="0")
							{
								$('#addeditmsg').modal('open');
			           	     	$('#msgHead').text("Product Add Inventory Warning");
			           	     	$('#msg').text("Select Supplier");
								return false;
							}
							
							var val = $("#productIdForAddQuantity").val(); 
				             var qty = $('#addquantity').val();
			             	if(qty==="" || qty==undefined)
							{
								$('#addeditmsg').modal('open');
			           	     	$('#msgHead').text("Product Add Inventory Warning");
			           	     	$('#msg').text("Enter Quantity");
								return false;
							}
							var payDate=$('#paymentDate').val();
							if(payDate==="" || payDate==undefined)
							{
								$('#addeditmsg').modal('open');
			           	     	$('#msgHead').text("Product Add Inventory Warning");
			           	     	$('#msg').text("Select Payment date");
								return false;
							}
							var paymentDate=new Date($('#paymentDate').val()).setHours(0,0,0,0);
							var today=new Date().setHours(0,0,0,0);
							if(paymentDate < today)
							{
								$('#addeditmsg').modal('open');
			           	     	$('#msgHead').text("Product Add Inventory Warning");
			           	     	$('#msg').text("Payment date must be today or after todays date");
								return false;
							}
							 
							
							var prdData=[val,qty];
							productList.push(prdData);          	
			            	
			            	
			            	//alert(productList.entries());
			            	var productIdList="";
			            	for (var i=0; i<productList.length; i++) {
			            		var value=productList[i];
			            		productIdList=productIdList+value[0]+"-"+value[1]+",";
			          		}
			            	productIdList=productIdList.slice(0,-1)
			            	//alert(productIdList);
			            	$('#productlistinput').val(productIdList);
			            	
			            	var form = $('#addQuantityForm');

							$.ajax({

										type : form.attr('method'),
										url : form.attr('action'),
										data : $("#addQuantityForm").serialize(),
										success : function(data) {
											if(data=="Success")
											{
													$('#add').modal('close');
													$('#addeditmsg').modal('open');
													$('#msgHead').text("Success : ");
													$('#msg').html("<font color='green'>Quantity update SuccessFully</font>");
													fetchProductList();
													productList=[];													
											}
											else
											{
													$('#addeditmsg').modal('open');
													$('#msgHead').text("Failed : ");
													$('#msg').html("<font color='red'>Quantity updatation Failed</font>");
											}
										}
							});
			            	
			            });
						
						$('#addquantity').keyup(function(){
							findTotalAmountAndTax();							
						});
						
						$('#supplierIdForOrder').change(function(){
							var supplierId=$('#supplierIdForOrder').val();
							$('#productIdForOrder').empty();
							$("#productIdForOrder").append('<option value="0">Choose Product</option>');
							
							$.ajax({
								url : myContextPath+"/fetchProductBySupplierId?supplierId="+supplierId,
								dataType : "json",
								beforeSend: function() {
									$('.preloader-background').show();
									$('.preloader-wrapper').show();
						           },
								success : function(data) {
									
									for(var i=0; i<data.length; i++)
									{								
										//alert(data[i].productId +"-"+ data[i].productName);
										$("#productIdForOrder").append('<option value='+data[i].productId+'>'+data[i].productName+'</option>');										
									}	
									$('.preloader-wrapper').hide();
									$('.preloader-background').hide();
								},
								error: function(xhr, status, error) {
									$('.preloader-wrapper').hide();
									$('.preloader-background').hide();
									  //alert(error +"---"+ xhr+"---"+status);
									$('#addeditmsg').modal('open');
					       	     	$('#msgHead').text("Message : ");
					       	     	$('#msg').text("Product List Not Found"); 
					       	     		setTimeout(function() 
										  {
						     					$('#addeditmsg').modal('close');
										  }, 1000);
									}
							});
							
							
							var supplierId=$('#supplierIdForOrder').val();
							$('#supplierMobileNumber').val('');
							$('#supplierMobileNumber').change();
							$.ajax({
								url : myContextPath+"/fetchSupplierBySupplierId?supplierId="+supplierId,
								dataType : "json",
								success : function(data) {
									
									$('#supplierMobileNumber').val(data.contact.mobileNumber);
									$('#supplierMobileNumber').change();
									
								},
								error: function(xhr, status, error) {
									  //var err = eval("(" + xhr.responseText + ")");
									  //alert("Error");
									}
							});
						});
						
						$('#supplierIdOneOrderId').change(function(){
							
							var supplierId=$('#supplierIdOneOrderId').val();
							$('#supplierMobileNumberOneOrderId').val('');
							$('#supplierMobileNumberOneOrderId').change();
							$.ajax({
								url : myContextPath+"/fetchSupplierBySupplierId?supplierId="+supplierId,
								dataType : "json",
								beforeSend: function() {
									$('.preloader-background').show();
									$('.preloader-wrapper').show();
						           },
								success : function(data) {
									
									$('#supplierMobileNumberOneOrderId').val(data.contact.mobileNumber);
									$('#supplierMobileNumberOneOrderId').change();
									
									$('.preloader-wrapper').hide();
									$('.preloader-background').hide();
								},
								error: function(xhr, status, error) {
									$('.preloader-wrapper').hide();
									$('.preloader-background').hide();
									  //alert(error +"---"+ xhr+"---"+status);
									$('#addeditmsg').modal('open');
					       	     	$('#msgHead').text("Message : ");
					       	     	$('#msg').text("Supplier Details Not Found"); 
					       	     		setTimeout(function() 
										  {
						     					$('#addeditmsg').modal('close');
										  }, 1000);
									}
							});
							
						});
						
						
						$('#categoryIdForOrder').change(function(){
							
							var categoryId=$('#categoryIdForOrder').val();
							var brandId=$('#brandIdForOrder').val();
							var supplierId=$('#supplierIdForOrder').val();
							
							$('#productIdForOrder').empty();
							$("#productIdForOrder").append('<option value="0">Choose Product</option>');
							$.ajax({ 
								url : myContextPath+"/fetchProductBySupplierIdAndCategoryIdAndBrandId?categoryId="+categoryId+"&brandId="+brandId+"&supplierId="+supplierId,
								dataType : "json",
								async :false,
								success : function(data) {
									
										for(var i=0; i<data.length; i++)
										{								
											//alert(data[i].productId +"-"+ data[i].productName);
											$("#productIdForOrder").append('<option value='+data[i].productId+'>'+data[i].productName+'</option>');										
										}	
										//alert("done");
										$("#productIdForOrder").change();
									
									},
									error: function(xhr, status, error) {
										  //var err = eval("(" + xhr.responseText + ")");
										//alert("Error ");
									}
								});
							
						});
						
						$('#brandIdForOrder').change(function(){
							
							var categoryId=$('#categoryIdForOrder').val();
							var brandId=$('#brandIdForOrder').val();
							var supplierId=$('#supplierIdForOrder').val();
							
							$('#productIdForOrder').empty();
							$("#productIdForOrder").append('<option value="0">Choose Product</option>');
							$.ajax({ 
								url : myContextPath+"/fetchProductBySupplierIdAndCategoryIdAndBrandId?categoryId="+categoryId+"&brandId="+brandId+"&supplierId="+supplierId,
								dataType : "json",
								async :false,
								success : function(data) {
									
									for(var i=0; i<data.length; i++)
									{								
										//alert(data[i].productId +"-"+ data[i].productName);
										$("#productIdForOrder").append('<option value='+data[i].productId+'>'+data[i].productName+'</option>');										
									}	
									//alert("done");
									$("#productIdForOrder").change();
									
									},
									error: function(xhr, status, error) {
										  //var err = eval("(" + xhr.responseText + ")");
										//alert("Error ");
									}
								});
							
						});
						
						$('#productIdForOrder').change(function(){
							var productId=$('#productIdForOrder').val();
							var supplierId=$('#supplierIdForOrder').val();
							$.ajax({
								url : myContextPath+"/fetchSupplierById?supplierId="+supplierId+"&productId="+productId,
								dataType : "json",
								success : function(data) {
									
									$('#supplierRateForOrder').val(data);
									$('#supplierRateForOrder').change();
								},
								error: function(xhr, status, error) {
									  //var err = eval("(" + xhr.responseText + ")");
									 // alert("Error ");
									}
							});
							
						});
						
						$("#OrderMobileNumberchecker").change(function() {
						    var ischecked= $(this).is(':checked');
						    if(ischecked)
						    {
						    	$('#supplierMobileNumber').attr('readonly', true);
						    }
						    else
						    {
						    	$('#supplierMobileNumber').attr('readonly', false);
						    }
						});
						$("#OrderMobileNumbercheckerOneOrderId").change(function() {
						    var ischecked= $(this).is(':checked');
						    if(ischecked)
						    {
						    	$('#supplierMobileNumberOneOrderId').attr('readonly', true);
						    }
						    else
						    {
						    	$('#supplierMobileNumberOneOrderId').attr('readonly', false);
						    }
						});
						$('#OrderMobileNumberchecker').attr('checked', true);
						$('#supplierMobileNumber').attr('readonly', true);
						
						$('#OrderMobileNumbercheckerOneOrderId').attr('checked', true);
						$('#supplierMobileNumberOneOrderId').attr('readonly', true);
						
					});

					

/*function showTaxCalculation(productId)
{

	$.ajax({
		url : myContextPath+"/fetchProductTaxcalculation?productId="+productId,
		dataType : "json",
		success : function(data) {
			
			$('#cgstPerId').text(data.cgstPercentage);
			$('#cgstAmtId').text(data.cgstRate);
			$('#sgstPerId').text(data.sgstPercentage);
			$('#sgstAmtId').text(data.sgstRate);
			$('#igstPerId').text(data.igstPercentage);
			$('#igstAmtId').text(data.igstRate);
			$('#taxAmountId').text(data.tax);
			
			$('.modal').modal();
			$('#tax').modal('open');
		},
		error: function(xhr, status, error) {
			  //var err = eval("(" + xhr.responseText + ")");
			  //alert("Error");
			}
	});
	
}*/

function showAddQuantity(productId)
{
	productList=[];
	$('#supplierRate').val('');
	$('#addquantity').val('');
	$('#finalTotalAmount').text('');
	$('#finalTotalAmountWithTax').text('');
	$('#paymentDate').val('');
	
	$('#supplierIdForaddQuantity').empty();
	$("#supplierIdForaddQuantity").append('<option value="0">Choose Supplier</option>');
	
	
	
	$.ajax({
		url : myContextPath+"/fetchSupplierListForAddQuantity?productId="+productId,
		dataType : "json",
		success : function(data) {
			supplierProductLists=data;
			
			for(var i=0; i<supplierProductLists.length; i++)
			{								
				$('#productName').val(supplierProductLists[i].product.productName);			
				$('#productIdForAddQuantity').val(supplierProductLists[i].product.productId);
				$("#supplierIdForaddQuantity").append('<option value='+supplierProductLists[i].supplier.supplierId+'>'+supplierProductLists[i].supplier.name+'</option>');
			}	
			$('#productName').change();
			$('#supplierIdForaddQuantity').change();
			$('.modal').modal();
			$('#add').modal('open');
		},
		error: function(xhr, status, error) {
			  //var err = eval("(" + xhr.responseText + ")");
			$('#addeditmsg').modal('open');
   	     	$('#msgHead').text("Supplier Order : ");
   	     	$('#msg').html("Supplier not Available for this product <br> First Add Supplier For this product"); 
			}
	});
	
}

function findTotalAmountAndTax()
{
	var rate = $('#supplierRate').val();
	var qty= $('#addquantity').val();
	var productId = $("#productIdForAddQuantity").val();
	
	if(rate==="" || rate===undefined)
	{
		rate=0;
	}
	
	if(qty==="" || qty===undefined)
	{
		qty=0;
	}
	
	
	$.ajax({
		url : myContextPath+"/fetchProductByProductId?productId="+productId,
		dataType : "json",
		success : function(data) {
			
			var tempCgst=data.categories.cgst;
			var tempIgst=data.categories.igst;
			var tempSgst=data.categories.sgst;
		
			var ttl=( parseInt(qty) * parseFloat(rate) );
			var amtwithtax=parseFloat(ttl) + ( (parseFloat(ttl)*parseFloat(tempIgst))/100 );/*+ ( (parseFloat(ttl)*parseFloat(tempCgst))/100 ) + ( (parseFloat(ttl)*parseFloat(tempSgst))/100 ) ;*/
			
			$('#finalTotalAmount').text(parseInt(qty) * parseFloat(rate));
			$('#finalTotalAmountWithTax').text(amtwithtax);
		},
		error: function(xhr, status, error) {
			  //var err = eval("(" + xhr.responseText + ")");
			  //alert("Error");
			}
	});
	
}


function fetchProductList()
{

	var t = $('#tblData').DataTable();
	t.clear().draw();
	$.ajax({
		url : myContextPath+"/fetchProductListForInventoryAjax",
		dataType : "json",
		success : function(data) {
			var srno=1;
			
			for (var i = 0, len = data.length; i < len; ++i) {
				var inventoryProductsList = data[i];
				
				t.row.add(
								[
										srno,
										inventoryProductsList.product.productName,
										inventoryProductsList.product.productCode,
										inventoryProductsList.product.categories.categoryName,
										inventoryProductsList.product.categories.hsnCode,
										inventoryProductsList.product.brand.name,
										inventoryProductsList.product.currentQuantity,
										inventoryProductsList.product.threshold,
										inventoryProductsList.product.rate.toFixed(),
										inventoryProductsList.rateWithTax.toFixed(),
										inventoryProductsList.taxableAmount.toFixed(),
										+inventoryProductsList.tax.toFixed(),
										inventoryProductsList.product.categories.igst.toFixed()+"%",
										(inventoryProductsList.taxwithAmount.toFixed()),
										"<button class='btn blue-gradient' onclick='showAddQuantity("+inventoryProductsList.product.productId+")'>Add</button>",
										"<button class='btn blue-gradient' onclick='showOrderOneProduct("+inventoryProductsList.product.productId+")'>Order</button>"
										
										/*,"<button class=' btn-flat '><i class='material-icons tooltipped blue-text ' data-position='right' data-delay='50' data-tooltip='Edit' >edit</i></button>"*/

								]).draw(false); 

				srno = srno + 1;
			}
		}
	});

}

function resetOrderSelectionData()
{
	$('#supplierMobileNumber').val('');
	$('#supplierRateForOrder').val('');
	$('#orderQuantity').val('');
	$('#OrderMobileNumberchecker').attr('checked', true);
	$('#supplierMobileNumber').attr('readonly', true); 
	$("#addOrderProduct").text("Add");	
	
	var source1 = $("#supplierIdForOrder");
	source1.val(0);
	source1.change();
	
	setTimeout(
			  function() 
			  {
				  var source = $("#productIdForOrder");
					source.val(0);
					source.change();
			  }, 1000);
	
	var source2 = $("#categoryIdForOrder");
	source2.val(0);
	source2.change();
	
	var source3 = $("#brandIdForOrder");
	source3.val(0);
	source3.change();
}

function showOrderProductQuantity(productId)
{
	count=1;
	orderSupplierList = [];
	$("#orderCartTb").empty();
	resetOrderSelectionData();
	var selectProduct=false;
	if(parseInt(productId)>0)
	{
		selectProduct=true;
	}
	
	$.ajax({
		url : myContextPath+"/fetchBrandAndCategoryList",
		dataType : "json",
		async:false,
		success : function(data) {
			categoryList=data.categoryList;
			$('#categoryIdForOrder').empty();
			$("#categoryIdForOrder").append('<option value="0">Choose Category</option>');
			for(var i=0; i<categoryList.length; i++)
			{
				$("#categoryIdForOrder").append('<option value='+categoryList[i].categoryId+'>'+categoryList[i].categoryName+'</option>');
			}	
			$("#categoryIdForOrder").change();
			/*if(selectProduct==true){
				var source=$('#categoryIdForOrder');
				source.val(v);
				source.change();
			}*/
			
			brandList=data.brandList;
			$('#brandIdForOrder').empty();
			$("#brandIdForOrder").append('<option value="0">Choose Brand</option>');
			for(var j=0; j<brandList.length; j++)
			{
				$("#brandIdForOrder").append('<option value='+brandList[j].brandId+'>'+brandList[j].name+'</option>');
			}	
			$("#brandIdForOrder").change();
			
			
			supplierList=data.supplierList;
			$('#supplierIdForOrder').empty();
			$("#supplierIdForOrder").append('<option value="0">Choose Supplier</option>');
			for(var k=0; k<supplierList.length; k++)
			{
				$("#supplierIdForOrder").append('<option value='+supplierList[k].supplierId+'>'+supplierList[k].name+'</option>');
			}	
			$("#supplierIdForOrder").change();
			
	
		}
	});
	
	/*if(selectProduct==true){
		
		$.ajax({
				url : myContextPath+"/fetchSupplierListForAddQuantity?productId="+productId,
				dataType : "json",
				async:false,
				success : function(data){
					
					supplierProductLists=data;
					$('#supplierIdForOrder').empty();
					$("#supplierIdForOrder").append('<option value="0">Choose Supplier</option>');
					for(var i=0; i<supplierProductLists.length; i++)
					{	
						$("#supplierIdForOrder").append('<option value='+supplierProductLists[i].supplier.supplierId+'>'+supplierProductLists[i].supplier.name+'</option>');
						
					}
					
					var source=$('#supplierIdForOrder');
					source.val(0);
					source.change();
					
					if(supplierProductLists.length>0)
					{
						$('#productIdForOrder').empty();
						$("#productIdForOrder").append('<option value='+supplierProductLists[0].product.productId+'>'+supplierProductLists[0].product.productName+'</option>');
					}
					
					$('#productIdForOrder').change();
					//$('#productIdForOrder').attr("disabled", true);

					$('.modal').modal();
					$('#order').modal('open');
				
				},
				error: function(xhr, status, error) {
					  //var err = eval("(" + xhr.responseText + ")");
					$('#addeditmsg').modal('open');
           	     	$('#msgHead').text("Supplier Order : ");
           	     	$('#msg').html("Supplier not Available for this product <br> First Add Supplier For this product"); 
					}
			});	
		
	}
	else
	{*/
		$('.modal').modal();
		$('#order').modal('open');
	//}
	
	selectProduct==false;
}

function showOrderOneProduct(id)
{
	$('#orderQuantityOneOrderId').val('');
	$('#orderQuantityOneOrderId').change();
	$('#supplierMobileNumberOneOrderId').val('');
	$('#supplierMobileNumberOneOrderId').change();
	
	$.ajax({
		url : myContextPath+"/fetchSupplierListForAddQuantity?productId="+id,
		dataType : "json",
		async:false,
		success : function(data){
			
			supplierProductLists=data;
			$('#supplierIdOneOrderId').empty();
			$("#supplierIdOneOrderId").append('<option value="0">Choose Supplier</option>');
			for(var i=0; i<supplierProductLists.length; i++)
			{	
				$("#supplierIdOneOrderId").append('<option value='+supplierProductLists[i].supplier.supplierId+'>'+supplierProductLists[i].supplier.name+'</option>');
				
			}
			
			var source=$('#supplierIdOneOrderId');
			source.val(0);
			source.change();
			
			$('#productIdOneOrderId').val(supplierProductLists[0].product.productId);
			$("#productNameOneOrderId").val(supplierProductLists[0].product.productName);
			
			$('#brandIdOneOrderId').val(supplierProductLists[0].product.brand.brandId);
			$('#brandOneOrderId').val(supplierProductLists[0].product.brand.name);
			
			$('#categoryIdOneOrderId').val(supplierProductLists[0].product.categories.categoryId);
			$('#categoryOneOrderId').val(supplierProductLists[0].product.categories.categoryName);
			
			$("#productNameOneOrderId").change();
			$('#brandOneOrderId').change();
			$('#categoryOneOrderId').change();
			
			$('.modal').modal();
			$('#singleOrder').modal('open');
		
		},
		error: function(xhr, status, error) {
			  //var err = eval("(" + xhr.responseText + ")");
			$('#addeditmsg').modal('open');
   	     	$('#msgHead').text("Supplier Order : ");
   	     	$('#msg').html("Supplier not Available for this product <br> First Add Supplier For this product"); 
			}
	});	
}

function editrow(id) {
	$('#currentUpdateRowId').val(id);
	var supplierId=$('#rowsupplierid_'+id).val();
	var productId=$('#rowproductid_'+id).val();
	//alert($('#rowproductrate_'+id).val());
			
	var source1 = $("#supplierIdForOrder");
	var v1=supplierId;
	source1.val(v1);
	source1.change();
	
	setTimeout(
			  function() 
			  {
				  var source = $("#productIdForOrder");
					var v=productId;
					source.val(v);
					source.change();
			  }, 1000);
	
	
	$('#supplierMobileNumber').val($('#rowsuppliermob_'+id).text());
	$('#orderQuantity').val($('#roworderquantity_'+id).text());
	$('#supplierRateForOrder').val($('#rowsupplierrate_'+id).text());
	
	$("#addOrderProduct").text("Update");	
}

function updaterow(id) {
	
	$("#addOrderProduct").text("Add");	
	
	var productIdForOrder=$('#productIdForOrder').val();
	var supplierIdForOrder=$('#supplierIdForOrder').val();
	var orderQuantity=$('#orderQuantity').val();
	var supplierMobileNumber=$('#supplierMobileNumber').val();
	
	/*for (let [key, value] of orderSupplierList.entries()) {
			//alert("supplierId : "+key+" - ProductId : "+value[0]+" - quantity : "+value[1]+" - mobile Number : "+value[2]);
			if(key===supplierIdForOrder && value[0] === productIdForOrder)
			{
				$('#addeditmsg').modal('open');
   	     	$('#msgHead').text("Product Select Warning");
   	     	$('#msg').text("This Product and Supplier is already added to Cart"); 
   	     	return false;
			}
		}*/
	
	//orderProductAndQuantityList.put(productIdForOrder,orderQuantity);
	//$('#rowsupplierid_' + i).val() +","+ $('#rowproductid_' + i).val()
	var supplierId=$('#rowsupplierid_' + id).val();
	var productId=$('#rowproductid_' + id).val();
	
	var tempArray=[];
	for(var i=0; i<orderSupplierList.length; i++)
	{
		var value=orderSupplierList[i];
		if(value[0]!==supplierId || value[1] !== productId)
		{
			tempArray.push(orderSupplierList[i]);
		}
	}
	
	orderSupplierList=[];
	
	for(var i=0; i<tempArray.length; i++)
	{
		orderSupplierList.push(tempArray[i]);
	}
	
	var prodctlst = [supplierIdForOrder,productIdForOrder, orderQuantity,supplierMobileNumber];
	orderSupplierList.push(prodctlst);
	//alert(orderSupplierList);
	
	var supplierName=$('#supplierIdForOrder option:selected').text();
	var productName=$('#productIdForOrder option:selected').text();
	var supplierRate=$('#supplierRateForOrder').val();
	
	var rowCount = $('#orderCartTb tr').length;
	var trData="";
	count=1;
	for(var i=1; i<=rowCount; i++)
	{
		//alert($('#rowcount_'+i).html() +"---"+ $('#rowprocustname_'+i).html() +"---"+ $('#rowdelbutton_'+i).html());
		
		if(id!=i)
		{
			//alert("predata");
			//alert(i+"-(----)-"+$('#tbproductname_' + i).text());
    		 /* trData=trData+"<tr id='rowdel_" + count + "' >"+
       				"<td id='rowcount_" + count + "'>" + count + "</td>"+
       				"<td id='rowproductname_" + count + "'><input type='hidden' id='rowproductkey_" + count + "' value='"+$('#rowproductkey_' + i).val()+"'><center><span id='tbproductname_" + count + "'>"+$('#tbproductname_' + i).text()+"</span></center></td>"+
       				"<td id='rowdelbutton_" + count + "'><button class='btn-flat' type='button' onclick='deleterow(" + count + ")'><i class='material-icons '>clear</i></button></td>"+
       				"</tr>"; */
			
       				trData=trData+"<tr id='rowdel_" + count + "' >"+
                            "<td id='rowcount_" + count + "'>"+count+"</td>"+
                            "<td id='rowsuppliername_"+count+"'><input type='hidden' id='rowsupplierid_"+count+"' value="+$('#rowsupplierid_' + i).val()+"><input type='hidden' id='rowsuppliermob_"+count+"' value="+$('#rowsuppliermob_' + i).val()+"><span id='rowsuppliernametb_"+count+"'>"+$('#rowsuppliernametb_' + i).text()+"</span></td>"+
                            "<td id='rowproductname_"+count+"'><input type='hidden' id='rowproductid_"+count+"' value="+$('#rowproductid_' + i).val()+"><span id='rowproductnametb_"+count+"'>"+$('#rowproductnametb_' + i).text()+"</span></td>"+
                            "<td id='rowsupplierrate_"+count+"'>"+$('#rowsupplierrate_' + i).text()+"</td>"+
                            "<td id='roworderquantity_"+count+"'>"+$('#roworderquantity_' + i).text()+"</td>"+
                            "<td id='roweditbutton_" + count + "'><button type='button'  onclick='editrow(" + count + ")' class='btn-flat'><i class='material-icons'>edit</i></button></td>"+
                            "<td id='rowdelbutton_" + count + "'><button type='button' onclick='deleterow(" + count +")' class='btn-flat'><i class='material-icons'>cancel</i></button></td>"+
                        	"</tr>";
    		 count++;
		}
		else
		{
			trData=trData+"<tr id='rowdel_" + count + "' >"+
				            "<td id='rowcount_" + count + "'>"+count+"</td>"+
				            "<td id='rowsuppliername_"+count+"'><input type='hidden' id='rowsupplierid_"+count+"' value="+supplierIdForOrder+"><input type='hidden' id='rowsuppliermob_"+count+"' value="+supplierMobileNumber+"><span id='rowsuppliernametb_"+count+"'>"+supplierName+"</span></td>"+
				            "<td id='rowproductname_"+count+"'><input type='hidden' id='rowproductid_"+count+"' value="+productIdForOrder+"><span id='rowproductnametb_"+count+"'>"+productName+"</span></td>"+
				            "<td id='rowsupplierrate_"+count+"'>"+supplierRate+"</td>"+
				            "<td id='roworderquantity_"+count+"'>"+orderQuantity+"</td>"+
				            "<td id='roweditbutton_" + count + "'><button type='button'  onclick='editrow(" + count + ")' class='btn-flat'><i class='material-icons'>edit</i></button></td>"+
				            "<td id='rowdelbutton_" + count + "'><button type='button' onclick='deleterow(" + count + ")' class='btn-flat'><i class='material-icons'>cancel</i></button></td>"+
				        	"</tr>";
    		 count++;
		}
		//alert(trData);
	} 
	$("#orderCartTb").html('');
	$("#orderCartTb").html(trData);
	
	//alert(productList.entries());
    //$('#rowdel_' + id).remove();
   // alert('productidlist '+productidlist);
	resetOrderSelectionData();
}

function deleterow(id) {
	
	var supplierIdForOrder=$('#supplierIdForOrder').val();
	
	var supplierId=$('#rowsupplierid_' + id).val();
	var productId=$('#rowproductid_' + id).val();
	var tempArray=[];
	for(var i=0; i<orderSupplierList.length; i++)
	{
		var value=orderSupplierList[i];
		if(value[0]!==supplierId || value[1] !== productId)
		{
			tempArray.push(orderSupplierList[i]);
		}
	}	
	
	orderSupplierList=[];
	
	for(var i=0; i<tempArray.length; i++)
	{
		orderSupplierList.push(tempArray[i]);
	}
	
    var rowCount = $('#orderCartTb tr').length;
	var trData="";
	count=1;
	for(var i=1; i<=rowCount; i++)
	{
		//alert($('#rowcount_'+i).html() +"---"+ $('#rowprocustname_'+i).html() +"---"+ $('#rowdelbutton_'+i).html());
		
		if(id!==i)
		{
			
       				trData=trData+"<tr id='rowdel_" + count + "' >"+
				                    "<td id='rowcount_" + count + "'>"+count+"</td>"+
				                    "<td id='rowsuppliername_"+count+"'><input type='hidden' id='rowsupplierid_"+count+"' value="+$('#rowsupplierid_' + i).val()+"><input type='hidden' id='rowsuppliermob_"+count+"' value="+$('#rowsuppliermob_' + i).val()+"><span id='rowsuppliernametb_"+count+"'>"+$('#rowsuppliernametb_' + i).text()+"</span></td>"+
				                    "<td id='rowproductname_"+count+"'><input type='hidden' id='rowproductid_"+count+"' value="+$('#rowproductid_' + i).val()+"><span id='rowproductnametb_"+count+"'>"+$('#rowproductnametb_' + i).text()+"</span></td>"+
				                    "<td id='rowsupplierrate_"+count+"'>"+$('#rowsupplierrate_' + i).text()+"</td>"+
				                    "<td id='roworderquantity_"+count+"'>"+$('#roworderquantity_' + i).text()+"</td>"+
				                    "<td id='roweditbutton_" + count + "'><button type='button'  onclick='editrow(" + count + ")' class='btn-flat'><i class='material-icons'>edit</i></button></td>"+
				                    "<td id='rowdelbutton_" + count + "'><button type='button' onclick='deleterow(" + count +")' class='btn-flat'><i class='material-icons'>cancel</i></button></td>"+
				                	"</tr>";
    		 count++;
		}
		//alert(trData);
	} 
	$("#orderCartTb").html('');
	$("#orderCartTb").html(trData);
	//alert(productList.entries());
    //$('#rowdel_' + id).remove();
   // alert('productidlist '+productidlist);
	resetOrderSelectionData();
}

function editOrder(supplierOrderIddd)
{
	$('#supplierOrderIdId').val(supplierOrderIddd);
	resetOrderSelectionData(); 
	
	$.ajax({
		url : myContextPath+"/fetchBrandAndCategoryList",
		dataType : "json",
		async:false,
		success : function(data) {
			categoryList=data.categoryList;
			$('#categoryIdForOrder').empty();
			$("#categoryIdForOrder").append('<option value="0">Choose Category</option>');
			for(var i=0; i<categoryList.length; i++)
			{
				$("#categoryIdForOrder").append('<option value='+categoryList[i].categoryId+'>'+categoryList[i].categoryName+'</option>');
			}	
			$("#categoryIdForOrder").change();
			/*if(selectProduct==true){
				var source=$('#categoryIdForOrder');
				source.val(v);
				source.change();
			}*/
			
			brandList=data.brandList;
			$('#brandIdForOrder').empty();
			$("#brandIdForOrder").append('<option value="0">Choose Brand</option>');
			for(var j=0; j<brandList.length; j++)
			{
				$("#brandIdForOrder").append('<option value='+brandList[j].brandId+'>'+brandList[j].name+'</option>');
			}	
			$("#brandIdForOrder").change();
			
			
			supplierList=data.supplierList;
			$('#supplierIdForOrder').empty();
			$("#supplierIdForOrder").append('<option value="0">Choose Supplier</option>');
			for(var k=0; k<supplierList.length; k++)
			{
				$("#supplierIdForOrder").append('<option value='+supplierList[k].supplierId+'>'+supplierList[k].name+'</option>');
			}	
			$("#supplierIdForOrder").change();
			
	
		}
	});
	
	
	if(supplierOrderIddd!=null && supplierOrderIddd!=undefined )
	{
		$.ajax({
			url : myContextPath+"/editSupplierOrderAjax?supplierOrderId="+supplierOrderIddd,
			dataType : "json",
			async :false,
			success : function(data) {
				
				count=1;
				$("#orderCartTb").html('');
				for(var i=0; i<data.length; i++)
				{
					var supplierOrderDetaillist=data[i];
					var supplierIdForOrder=supplierOrderDetaillist.supplier.supplierId;
					var supplierMobileNumber=supplierOrderDetaillist.supplier.contact.mobileNumber;
					var supplierName=supplierOrderDetaillist.supplier.name;
					var productIdForOrder=supplierOrderDetaillist.product.productId;
					var productName=supplierOrderDetaillist.product.productName;
					var supplierRate=supplierOrderDetaillist.supplierRate;
					var orderQuantity=supplierOrderDetaillist.quantity;
					
					var prodctlst = [supplierIdForOrder,productIdForOrder.toString(), orderQuantity.toString(),supplierMobileNumber];
					orderSupplierList.push(prodctlst);
					
					$("#orderCartTb").append("<tr id='rowdel_" + count + "' >"+
				                             "<td id='rowcount_" + count + "'>"+count+"</td>"+
				                             "<td id='rowsuppliername_"+count+"'><input type='hidden' id='rowsupplierid_"+count+"' value="+supplierIdForOrder+"><input type='hidden' id='rowsuppliermob_"+count+"' value="+supplierMobileNumber+"><span id='rowsuppliernametb_"+count+"'>"+supplierName+"</span></td>"+
				                             "<td id='rowproductname_"+count+"'><input type='hidden' id='rowproductid_"+count+"' value="+productIdForOrder+"><span id='rowproductnametb_"+count+"'>"+productName+"</span></td>"+
				                             "<td id='rowsupplierrate_"+count+"'>"+supplierRate+"</td>"+
				                             "<td id='roworderquantity_"+count+"'>"+orderQuantity+"</td>"+
				                             "<td id='roweditbutton_" + count + "'><button type='button'  onclick='editrow(" + count + ")' class='btn-flat'><i class='material-icons'>edit</i></button></td>"+
				                             "<td id='rowdelbutton_" + count + "'><button type='button' onclick='deleterow(" + count + ")' class='btn-flat'><i class='material-icons'>cancel</i></button></td>"+
				                        	 "</tr>");
					count++;
				}
				
			},
			error: function(xhr, status, error) {
				 // alert("Error");
			}
		});
	}
}