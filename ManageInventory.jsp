<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>

<head>
     <%@include file="components/header_imports.jsp" %>
     
     <script>var myContextPath = "${pageContext.request.contextPath}"</script>
      <script type="text/javascript" src="resources/js/hashtable.js"></script>
   <script type="text/javascript" src="resources/js/manageInventory.js"></script>
    <style>
        tr [colspan="2"] {
            text-align: center;
        }
        
        tr,
        td,
        th {
            text-align: center;
        }
    	/* .modal .modal-content {
    padding: 10px !important;
} */
	#order{
	width:90% !important;
	max-height:80% !important;
	}
	.dropdown-content{
	max-height:250px !important;
	}
    </style>
    <script>
        $(document).ready(function() {
            $("#BankDetails").css("display", "none");
            $(".cash").change(function() {
                $("#BankDetails").css("display", "none");
            });
            $(".cheque").change(function() {
                $("#BankDetails").css("display", "block");
            });
        });
    </script>


</head>

<body>
   <!--navbar start-->
   	<%@include file="components/navbar.jsp" %>
    <!--navbar end-->
    <!--content start-->
    <main>
     
        <div class="col s10 l3 m6 right offset-s2" >
            <a class="btn waves-effect waves-light blue-gradient" href="${pageContext.request.contextPath}/openAddMultipleInventory"><i class="material-icons left" >add</i>Add Inventory</a>
        </div>
       
		<div class="col s10 l3 m6 left offset-s2" style="margin-left:2%;">
            <a class="btn waves-effect waves-light blue-gradient" href="${pageContext.servletContext.contextPath}/SupplierOrderProducts?orderStatus=add" ><i class="material-icons left" >add</i>Order Products</a>
        </div>
       	  <div class="col s10 l3 m6 center offset-s2">
            <a class="btn waves-effect waves-light blue-gradient" href="${pageContext.request.contextPath}/fetchLast24HoursOrdersForEdit"><i class="material-icons left" >edit</i>Edit Orders</a>
        </div>
        <div class="row">
         
            <div class="col s12 l12 m12">
             <br>
                <table class="striped highlight bordered centered " id="tblData" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th rowspan="2" class="print-col">Sr.No</th>
                            <th rowspan="2" class="print-col">Product Name</th>
                            <th rowspan="2" class="print-col">Product Code</th>
                            <th rowspan="2" class="print-col" >Category</th>
                            <th rowspan="2" class="print-col">HSN Code</th>
                            <th rowspan="2" class="print-col">Brand</th>
                            <th rowspan="2" class="print-col">Quantity in Stock</th>
                            <th rowspan="2" class="print-col">Threshold</th>
                            <th rowspan="2" class="print-col">Rate/Unit (Without Tax)</th>
                            <th rowspan="2" class="print-col">Rate/Unit (with tax)</th>
                            <th rowspan="2" class="print-col">Taxable Amount</th>
                            <th rowspan="2" class="print-col">% Tax</th>
                            <th rowspan="2" class="print-col">% Tax Slab</th>
                            <th rowspan="2" class="print-col">Total Amount</th>
                            <th colspan="2">Action</th>
                            <!-- <th rowspan="2">Edit</th> -->

                        </tr>
                        <tr>
                            <th>Add</th>
                            <th>Order</th>
                        </tr>
                    </thead>

                    <tbody id="inventoryTB">
                     <c:if test="${not empty inventoryProductsList}">
							<c:forEach var="listValue" items="${inventoryProductsList}">
                        <tr>
                            <td><c:out value="${listValue.srno}"/></td>
                            <td><c:out value="${listValue.product.productName}"/></td>
                            <td><c:out value="${listValue.product.productCode}"/></td>
                            <td><c:out value="${listValue.product.categories.categoryName}"/></td>
                            <td><c:out value="${listValue.product.categories.hsnCode}"/></td>
                            <td><c:out value="${listValue.product.brand.name}"/></td>
                            <td><c:out value="${listValue.product.currentQuantity}"/></td>
                            <td><c:out value="${listValue.product.threshold}"/></td>
                            <td><fmt:formatNumber type="number" minFractionDigits="2" maxFractionDigits="2" value="${listValue.product.rate}" /></td>
                            <td><fmt:formatNumber type="number" minFractionDigits="2" maxFractionDigits="2" value="${listValue.rateWithTax}" /></td>
                            <td><fmt:formatNumber type="number" minFractionDigits="2" maxFractionDigits="2" value="${listValue.taxableAmount}" /></td>
                            <td>
                            	<%-- <button class="btn-flat blue-text" onclick="showTaxCalculation(${listValue.product.productId})" title="view tax calculation"> --%>
                            	<fmt:formatNumber type="number" minFractionDigits="2" maxFractionDigits="2" value="${listValue.tax}" />
                            	<!-- </button> -->
                            </td>
                            <td><c:out value="${listValue.product.categories.igst}"/>%</td>
                            <td>
                            	<fmt:formatNumber type="number" minFractionDigits="2" maxFractionDigits="2" value="${listValue.taxwithAmount}" />
                            </td>
                            <td><button class="btn blue-gradient" onclick="showAddQuantity(${listValue.product.productId})">Add</button></td>
                            <%-- <td><button class="btn blue" onclick="showOrderProductQuantity(${listValue.product.productId})">Order</button></td> --%>
                           <td><button class="btn blue-gradient" onclick="showOrderOneProduct(${listValue.product.productId})">Order</button></td>
                            <!-- <td><button href="#singleOrder" class="modal-trigger btn blue">order</button></td> -->
                            <!-- <td><button class="btn-flat blue-text" ><i class="material-icons tooltipped blue-text " data-position="right" data-delay="50" data-tooltip="Edit" >edit</i></button></td> -->
                            <!-- Modal Trigger -->
                            <!--<td><a href="#delete" class="modal-trigger"><i class="material-icons tooltipped" data-position="right" data-delay="50" data-tooltip="Delete">delete</i></a></td>-->
                        </tr>
                        
					</c:forEach>
					</c:if>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Modal Structure for Tax Details -->
        <div id="tax" class="modal" style="width:40%;">
            <div class="modal-content">
                <h5 class="center">Tax Details</h5>
                <hr>
                <br>
                
                <table class="centered highlight tblborder" border="2">
					<thead>
                    <tr>
                        <th colspan="2">%CGST</th>                        
                        <th colspan="2">%SGST</th>
                        <th colspan="2">%IGST</th>
                        <th rowspan="2">Total tax Amount</th>
                    </tr>
                    <tr>
                        <th>%</th>
                        <th>Amount</th>
                        <th>%</th>
                        <th>Amount</th>
                        <th>%</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="cgstPerId"></td>
                            <td id="cgstAmtId"></td>
                            <td id="sgstPerId"></td>
                            <td id="sgstAmtId"></td>
                            <td id="igstPerId"></td>
                            <td id="igstAmtId"></td>
                            <td id="taxAmountId"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="divider"></div>
            
            <div class="modal-footer row">
            <div class="col s12 m12 l4 offset-l4 center">
                <a href="#!" class="modal-action modal-close waves-effect btn blue">Close</a>
                </div>
            </div>
        </div>

        <!--Modal Structure for Add Inventory-->
        <div id="add" class="modal">
            <div class="modal-content">
                <div class="row  ">
                    <h5 class="center">Add Inventory </h5>
                    <hr>
                    <form action="${pageContext.request.contextPath}/saveOneInventory" method="post" id="addQuantityForm" class="col s12 l9 m9 push-l1 push-m1">
                       <input id="productlistinput" type="hidden" class="validate" name="productIdList"> 	
                       <input id="productIdForAddQuantity" type="hidden" >
                        <div class="row">
                            <div class="input-field col s12 l4  m5 push-l2 offset-m1">
                                <input id="productName" type="text">                                 
                                <label for="productName" class="active black-text">Product:</label>
                            </div>
							<div class="input-field col s12 l4 push-l2 m5">
                                <select id="supplierIdForaddQuantity" name="supplierId">
							    </select>
                            </div>
                            <div class=" col s12 l4  m5 push-l2 right" style="margin-top:4%">
                                <a href="${pageContext.servletContext.contextPath}/addSupplier" class="btn waves-effect"  style="letter-spacing:0.2px;">Add New Supplier</a>
                            </div>
                        </div>
                        <div class="row">
                             <div class="input-field col s12 l4 push-l2 m5 push-m2">
                            <!--<i class="material-icons prefix">mode_edit</i>-->
                            <input id="supplierRate" type="text" readonly>
                            <label for="supplierRate" class="active black-text">Rate :</label>
                           </div>
                        	<div class="input-field col s12 l4 push-l2 m5 push-m2">
                            <!--<i class="material-icons prefix">mode_edit</i>-->
                            <input id="addquantity" type="text">
                            <label for="addquantity" class="active black-text">Enter Quantity : </label>
                          </div>
                          <div class="input-field col s12 l4 push-l2 m5 push-m2">
                           <input id="paymentDate" type="text" name="paymentDate" title="Enter Payment Date" class="datepicker">
                           <label for="paymentDate" class="active black-text">Payment Date</label>
                    	</div>
                        </div>
                        <div class="row">
                        <div class=" col s12 l4  m5 offset-l2">
		                       <h6 class="red-text"><b>Total Amount(Without Tax)</b> : <span id="finalTotalAmount">0</span></h6>
		                           <br>		
		                           <br>
		                   </div>
                        	  <div class=" col s12 m5 l4  push-m1 offset-l2">
		                       <h6 class="red-text"><b>Total Amount(With Tax)</b> : <span id="finalTotalAmountWithTax">0</span></h6>
		                       <br>
		
		                       <br>
		                   </div>
                        </div>		                                           
                     </form>
                </div>
            </div>
            <div class="divider"></div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col s6 m6 l3 offset-l3">
                        <a href="#!" class="modal-action waves-effect  btn" id="addQuantityId">ADD</a>
                    </div>
                    <div class="col s6 m6 l3 pull-l1">
                        <a href="#!" class="modal-action waves-effect modal-close btn red">close</a>
                    </div>

                </div>
            </div>
        </div>
        <!-- Modal Structure for single order -->
        <div id="singleOrder" class="modal">
            <div class="modal-content">
                <h6 class="center-align">Order Information</h6>                
                <hr>	
              
                    
                        <form action="${pageContext.servletContext.contextPath}/orderBook" method="post" id="orderBookFormOneOrderId" class="col s12 l12 m12  ">
							<input id="productWithSupplikerlistOneOrderId" type="hidden" class="validate" name="productIdList">
                        	<input type='hidden' id='currentUpdateRowId'>
                        	<div class="row">
                      <div class="col s12 m12 l12">
                             <div class="input-field col s12 m6 l4">
                             		<input id="productIdOneOrderId" type="hidden" readonly>
                               		  <input id="productNameOneOrderId" type="text" readonly>
                                    <label for="productNameOneOrderId" class="black-text">Product</label>
                                </div>
                                <div class="input-field col s12 m6 l4">
                                     <input id="brandIdOneOrderId" type="hidden" readonly>
                                     <input id="brandOneOrderId" type="text" readonly>
                                    <label for="brandOneOrderId" class="black-text">Brand</label>
                                </div>
                                <div class="input-field col s12 m6 l4">
                                      <input id="categoryIdOneOrderId" type="hidden" readonly>
                                      <input id="categoryOneOrderId" type="text" readonly>
                                    <label for="categoryOneOrderId" class="black-text">Category</label>
                                </div>
                                  
                               </div>
                                <div class="col s12 m12 l12">      
                            	<div class="input-field col s12 m6 l4">
                                    <select id="supplierIdOneOrderId" name="supplierId">
                                            <option value="0"  selected>Choose Supplier Name</option>
                                     </select>
                                  
                                </div>
                                <div class="input-field col s12 m6 l4">
                                    <a href="${pageContext.servletContext.contextPath}/addSupplier" class="modal-action waves-effect waves-green btn" style="letter-spacing:0.2px;margin-top:3%">Add New Supplier</a>
                                </div>
                                  </div>
                                   <div class="col s12 m12 l12">   
                                 <div class="input-field col s12 m6 l3">
                                    <input id="orderQuantityOneOrderId" type="text" class="validate" required>
                                    <label for="orderQuantityOneOrderId" class="black-text">Quantity</label>
                                </div>
                              
                              
                                <div class="input-field col s12 m6 l4">
                                     <input id="supplierMobileNumberOneOrderId" type="text" readonly>
                                   <label for="supplierMobileNumberOneOrderId"  class="black-text">Mobile Number</label>
                                </div>
                                <div class="col s12 m6 l2" style="margin-top:4%">
                                    <input type="checkbox" id="OrderMobileNumbercheckerOneOrderId" required/>
                                    <label for="OrderMobileNumbercheckerOneOrderId" class="black-text">Edit</label>
                                    <!-- <a href="#!" class="modal-action waves-effect waves-green btn">Edit</a> -->
                                </div>
                                                  
                               </div>
              </div>
              
                        </form>
                   
            </div>
            <div class="divider"></div>
            <div class="modal-footer row" style="margin-bottom:0;">
                
                    <div class="col s6 m3 l3 offset-l3 offset-m3  ">
                        <button type="button" id="orderProductsButtonOneOrderId" class="modal-action waves-effect  btn">Send sms</button>
                    </div>
                    <div class="col s6 m3 l3 pull-l1 pull-m1">
                        <a href="#!" class="modal-action waves-effect modal-close btn red">close</a>
                    </div>

               
            </div>
        </div>
        
        
        
        
        <!-- Modal Structure for order multiple order -->
       
       <%--  <div id="order" class="modal">
            <div class="modal-content" style="padding:0;">
                <h5 class="center-align">Order Information</h5>                
                <hr>	
               
                    <div class="row">
                        <form action="${pageContext.servletContext.contextPath}/orderBook" method="post" id="orderBookForm" class="col s12 l12 m12">
							<input id="productWithSupplikerlist" type="hidden" class="validate" name="productIdList">
                        	<input type='hidden' id='currentUpdateRowId'>
                            <div class="col s12 l6 m6">
                            <div class="col s12 m12 l12">
                            	<div class="input-field col s12 m6 l6">
                                    <select id="supplierIdForOrder" name="supplierId">
                                            <option value="0"  selected>Choose Supplier Name</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                     </select>
                                    <!--<label>Supplier Name</label>-->
                                </div>
                                 <div class="input-field col s12 m6 l6">
                                    <a href="${pageContext.request.contextPath}/addSupplier" class="modal-action waves-effect waves-green btn" style="letter-spacing:0.2px;margin-top:3%">Add New Supplier</a>
                                </div>
                              </div>  
                                <div class="col s12 m12 l12">
                                <div class="input-field col s12 m6 l6">
                                     <select id="brandIdForOrder" name="brandId">
                                            <option value="0"  selected>Choose Brand</option>
                                           
                                     </select>
                                </div>
                                <div class="input-field col s12 m6 l6">
                                     <select id="categoryIdForOrder" name="categoryId">
                                            <option value="0"  selected>Choose Category</option>
                                            
                                     </select>
                                </div>
                                  </div>
                                    <div class="col s12 m12 l12">
                                <div class="input-field col s12 m6 l6">
                               
                                     <select id="productIdForOrder" name="productId">
                                            <option value="0"  selected>Choose Product</option>
                                            
                                     </select>
                                </div>  
                                	  <div class="input-field col s12 m6 l6">
                                    <input id="supplierRateForOrder" type="text" required readOnly>
                                    <label for="supplierRateForOrder" class="black-text">Rate</label>
                                </div>                              
                                  </div>
                                <!-- </div>
                                  <div class="row"> -->
                                      <div class="col s12 m12 l12">
                                <div class="col s12 m6 l6">
                                    Mobile Number <input id="supplierMobileNumber" type="text">
                                    <!-- <label for="mobile"></label> -->
                                </div>
                                <div class="col s12 m6 l6" style="margin-top:4%">
                                    <input type="checkbox" id="OrderMobileNumberchecker" required/>
                                    <label for="OrderMobileNumberchecker" class="black-text">Edit</label>
                                    <!-- <a href="#!" class="modal-action waves-effect waves-green btn">Edit</a> -->
                                </div>
                                </div>
                                    <div class="col s12 m12 l12">
                                <div class="input-field col s12 m6 l6">
                                    <input id="orderQuantity" type="text" class="validate" required>
                                    <label for="orderQuantity" class="black-text">Quantity</label>
                                </div>
                               
                                
                                <div class="input-field col s12 m6 l4">
                                    <button id="addOrderProduct" type="button" name="addOrderCart" class="modal-action waves-effect waves-green btn" style="margin-top:3%">Add Cart</button>
                                </div>
                                      </div>
                            </div>


                            <div class="col s12 l6 m6">
                                <table class="tblborder">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Supplier Name</th>
                                            <th>Product</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Edit</th>
                                            <th>Cancel</th>
                                        </tr>
                                    </thead>
                                    <tbody id="orderCartTb">
                                        <!-- <tr>
                                            <td>1</td>
                                            <td>Ankit</td>
                                            <td>John</td>
                                            <td>300</td>
                                            <td>5</td>
                                            <td><button type="button" class="btn-flat"><i class="material-icons ">edit</i></button></td>
                                            <td><button type="button" class="btn-flat"><i class="material-icons ">cancel</i></button></td>
                                        </tr> -->
                                    </tbody>
                                </table>
                            </div>



                        </form>
                    </div>
              
            </div>
            <div class="divider"></div>
            <div class="modal-footer row" style="margin-bottom:0;">
               
                    <div class="col s6 m3 l3 offset-l3 offset-m3  ">
                        <button type="button" id="orderProductsButton" class="modal-action waves-effect  btn">Order Products</button>
                    </div>
                    <div class="col s6 m3 l3 pull-l1 pull-m1">
                        <a href="#!" class="modal-action waves-effect modal-close btn red">close</a>
                    </div>

             
            </div>
        </div>
  --%>

       	<div class="row">
			<div class="col s8 m2 l2">
				<div id="addeditmsg" class="modal" style="width:40%;">
					<div class="modal-content">
						<h5 id="msgHead">Error</h5>
						<hr>	
						<h6 id="msg"></h6>
					</div>
					<div class="col s8 m2 l2 offset-l5 modal-footer">
						<a href="#!"
							class="modal-action modal-close waves-effect btn blue-gradient">OK</a>
					</div>
				</div>
			</div>
		</div>
    </main>
    <!--content end-->
</body>

</html>