package com.bluesquare.models;

import java.util.Date;

import com.bluesquare.entities.Supplier;

public class InventoryReportView {

	private long srno;
	private String transactionId;
	private Supplier supplier;
	private double totalQuantity;
	private double totalAmount;
	private double totalAmountTax;
	private double amountPaid;
	private double amountUnPaid;
	private Date paymentDate;
	private String payStatus;
	public InventoryReportView(long srno, String transactionId, Supplier supplier, double totalQuantity,
			double totalAmount, double totalAmountTax, double amountPaid, double amountUnPaid, Date paymentDate,
			String payStatus) {
		super();
		this.srno = srno;
		this.transactionId = transactionId;
		this.supplier = supplier;
		this.totalQuantity = totalQuantity;
		this.totalAmount = totalAmount;
		this.totalAmountTax = totalAmountTax;
		this.amountPaid = amountPaid;
		this.amountUnPaid = amountUnPaid;
		this.paymentDate = paymentDate;
		this.payStatus = payStatus;
	}
	public long getSrno() {
		return srno;
	}
	public void setSrno(long srno) {
		this.srno = srno;
	}
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	public Supplier getSupplier() {
		return supplier;
	}
	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}
	public double getTotalQuantity() {
		return totalQuantity;
	}
	public void setTotalQuantity(double totalQuantity) {
		this.totalQuantity = totalQuantity;
	}
	public double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public double getTotalAmountTax() {
		return totalAmountTax;
	}
	public void setTotalAmountTax(double totalAmountTax) {
		this.totalAmountTax = totalAmountTax;
	}
	public double getAmountPaid() {
		return amountPaid;
	}
	public void setAmountPaid(double amountPaid) {
		this.amountPaid = amountPaid;
	}
	public double getAmountUnPaid() {
		return amountUnPaid;
	}
	public void setAmountUnPaid(double amountUnPaid) {
		this.amountUnPaid = amountUnPaid;
	}
	public Date getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}
	public String getPayStatus() {
		return payStatus;
	}
	public void setPayStatus(String payStatus) {
		this.payStatus = payStatus;
	}
	@Override
	public String toString() {
		return "InventoryReportView [srno=" + srno + ", transactionId=" + transactionId + ", supplier=" + supplier
				+ ", totalQuantity=" + totalQuantity + ", totalAmount=" + totalAmount + ", totalAmountTax="
				+ totalAmountTax + ", amountPaid=" + amountPaid + ", amountUnPaid=" + amountUnPaid + ", paymentDate="
				+ paymentDate + ", payStatus=" + payStatus + "]";
	}
}
