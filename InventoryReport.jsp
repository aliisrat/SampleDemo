<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html>

<head>
      <%@include file="components/header_imports.jsp" %>
 
 <script type="text/javascript">
    
    function showTransactionDetails(id)
	{
		   $.ajax({
				url : "${pageContext.servletContext.contextPath}/fetchTrasactionDetailsByInventoryId?inventoryId="+id,
				dataType : "json",
				success : function(data) {
				//alert(data);
				var totalAll=0,totalAmtWithTaxAll=0;
				    $("#productOrderedDATA").empty();
					var srno=1;
					for (var i = 0, len = data.length; i < len; ++i) {
						var inventoryDetailList = data[i];
						var igst=inventoryDetailList.product.categories.igst;
						var cgst=inventoryDetailList.product.categories.cgst;
						var sgst=inventoryDetailList.product.categories.sgst;
						
						var total=parseFloat(inventoryDetailList.quantity)*parseFloat(inventoryDetailList.rate);
						var totalAmtWithTax=parseFloat(total)+
												( (parseFloat(total)*parseFloat(igst))/100 )+
												( (parseFloat(total)*parseFloat(cgst))/100 )+
												( (parseFloat(total)*parseFloat(sgst))/100 );
						
						$("#productOrderedDATA").append("<tr>"+
	                           "<td>"+srno+"</td>"+
	                           "<td>"+inventoryDetailList.product.categories.hsnCode+"</td>"+
	                           "<td>"+inventoryDetailList.product.productName+"</td>"+
	                           "<td>"+inventoryDetailList.product.categories.categoryName+"</td>"+	                           
	                           "<td>"+inventoryDetailList.product.brand.name+"</td>"+
	                           "<td>"+inventoryDetailList.quantity+"</td>"+
	                           "<td>"+inventoryDetailList.rate.toFixed(2)+"</td>"+
	                           "<td>"+total.toFixed(2)+"</td>"+
	                           "<td>"+totalAmtWithTax.toFixed(2)+"</td>"+
	                       "</tr>"); 
						srno++;
						totalAmtWithTaxAll=parseFloat(totalAmtWithTaxAll)+totalAmtWithTax;
						totalAll=parseFloat(totalAll)+total;
					}
					
					$("#productOrderedDATA").append("<tr>"+	     
													   "<td colspan='7'><b>All Total</b></td>"+
							                           "<td  class='red-text'><b>"+totalAll.toFixed(2)+"</b></td>"+
							                           "<td  class='red-text'><b>"+totalAmtWithTaxAll.toFixed(2)+"</b></td>"+
							                       "</tr>");
					
					$('.modal').modal();
					$('#product').modal('open');
					
				},
				error: function(xhr, status, error) {
					  	alert("error");
					}
			});
	   }
    
    </script>
    <style>
        tr [colspan="2"] {
            text-align: center;
        }
        
        tr,
        td,
        th {
            text-align: center;
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
    <main class="paddingBody">
        <br>
        <div class="row">
         <br> <br>
            <div class="col s12 l12 m12 ">
                <table class="striped highlight bordered centered " id="tblData" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th class="print-col">Sr.No</th>
                            <th class="print-col">Transaction Id</th>
                            <th>Transaction Details</th>
                            <th class="print-col">Supplier Name</th>
                            <th class="print-col">Total Quantity</th>
                            <th class="print-col">Taxable Amount</th>
                            <th>% Tax</th>
                            <th class="print-col">Total Amount</th>
                            <th class="print-col">Amount Paid</th>
                            <th class="print-col">Balance Amount</th>
                            <th class="print-col">Product taken Date</th>
                            <th class="print-col">Payment Status</th>
                            <th>Pay</th>
                        </tr>
                    </thead>

                    <tbody>
                    <c:if test="${not empty inventoryReportViews}">
					<c:forEach var="listValue" items="${inventoryReportViews}">
                        <tr>
                            <td><c:out value="${listValue.srno}" /></td>
                            <td><c:out value="${listValue.transactionId}" /></td>
                            <td><button class="btn blue-gradient" onclick="showTransactionDetails('${listValue.transactionId}')">View</button></td>
                            <td><a href="${pageContext.servletContext.contextPath}/fetchSupplierListBySupplierId?supplierId=${listValue.supplier.supplierId}"><c:out value="${listValue.supplier.name}" /></a></td>
                            <td><c:out value="${listValue.totalQuantity}" /></td>
                            <td><c:out value="${listValue.totalAmount}" /></td>
                            <td><!-- <a href="#tax">1.5</a> --> &#8377;<fmt:formatNumber type="number" minFractionDigits="2" maxFractionDigits="2" value="${listValue.totalAmountTax-listValue.totalAmount}" /></td>
                            <td><fmt:formatNumber type="number" minFractionDigits="2" maxFractionDigits="2" value="${listValue.totalAmountTax}" /></td>
                            <td><fmt:formatNumber type="number" minFractionDigits="2" maxFractionDigits="2" value="${listValue.amountPaid}" /></td>
                            <td><fmt:formatNumber type="number" minFractionDigits="2" maxFractionDigits="2" value="${listValue.amountUnPaid}" /></td>
                            <td>
                            	<fmt:formatDate pattern = "yyyy-MM-dd" var="date"   value = "${listValue.paymentDate}"  />
		                        <c:out value="${date}" />
                            </td>
                            <td><c:out value="${listValue.payStatus}" /></td>
                            <td><a class="btn blue-gradient" href="${pageContext.servletContext.contextPath}/paymentSupplier?inventoryTransactionId=${listValue.transactionId}">Pay</a></td>
                        </tr>
					</c:forEach>
					</c:if>
                    </tbody>
                </table>
            </div>
        </div>
        <br>
		<!-- Modal Structure for View Product Details -->
        <div id="product" class="modal modal-fixed-footer" style="width:70%;">
            <div class="modal-content">
                <h4 class="center">Product Details</h4>
                <hr>
                <br>
                <table border="2" class="centered tblborder">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>HSN Code</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Total Amount</th>
                            <th>Total Amount With Tax</th>
                        </tr>
                    </thead>
                    <tbody id="productOrderedDATA">
                        <!-- <tr>
                            <td>1</td>
                            <td>Mouse</td>
                            <td>I.T</td>
                            <td>BlueSquare</td>
                            <td>5</td>
                            <td>350</td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
            <div class="modal-footer row">

                <div class="col s12 m6 l6 offset-l1">
                    <a href="#!" class="modal-action modal-close waves-effect btn">Close</a>
                </div>

            </div>
        </div>
        
    </main>
    <!--content end-->
</body>

</html>