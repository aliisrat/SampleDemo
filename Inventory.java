package com.bluesquare.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import com.bluesquare.entities.OrderDetails.NumericBooleanDeserializer;
import com.bluesquare.entities.OrderDetails.NumericBooleanSerializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Table(name = "inventory")
@Component
public class Inventory {
	
	@Id
	@Column(name = "inventory_transaction_id")
/*	@GenericGenerator(name = "sequence_inventory_transaction_id", strategy = "com.bluesquare.utils.InventoryTransactionIdGenerator")
	@GeneratedValue(generator = "sequence_inventory_transaction_id")*/
	private String inventoryTransactionId;	
	
	@ManyToOne
	@JoinColumn(name="supplier_id")
	private Supplier supplier;
	
	@Column(name = "total_amount", precision = 19, scale = 2, columnDefinition="DECIMAL(19,2)")
	private double totalAmount;
	
	@Column(name = "total_amount_tax", precision = 19, scale = 2, columnDefinition="DECIMAL(19,2)")
	private double totalAmountTax;
	
	@Column(name = "total_quantity")
	private long totalQuantity;
	
	@Column(name="inventory_added_datetime")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date inventoryAddedDatetime;
	
	@Column(name="inventory_payment_datetime")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date inventoryPaymentDatetime;
	
	@JsonProperty
	@JsonSerialize(using = NumericBooleanSerializer.class)
	@JsonDeserialize(using = NumericBooleanDeserializer.class)
	@Column(name="paid_status")
	private boolean payStatus;

	public String getInventoryTransactionId() {
		return inventoryTransactionId;
	}

	public void setInventoryTransactionId(String inventoryTransactionId) {
		this.inventoryTransactionId = inventoryTransactionId;
	}

	

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
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

	public Date getInventoryAddedDatetime() {
		return inventoryAddedDatetime;
	}

	public void setInventoryAddedDatetime(Date inventoryAddedDatetime) {
		this.inventoryAddedDatetime = inventoryAddedDatetime;
	}

	public Date getInventoryPaymentDatetime() {
		return inventoryPaymentDatetime;
	}

	public void setInventoryPaymentDatetime(Date inventoryPaymentDatetime) {
		this.inventoryPaymentDatetime = inventoryPaymentDatetime;
	}

	public boolean isPayStatus() {
		return payStatus;
	}

	public void setPayStatus(boolean payStatus) {
		this.payStatus = payStatus;
	}

	public long getTotalQuantity() {
		return totalQuantity;
	}

	public void setTotalQuantity(long totalQuantity) {
		this.totalQuantity = totalQuantity;
	}

	@Override
	public String toString() {
		return "Inventory [inventoryTransactionId=" + inventoryTransactionId + ", supplier=" + supplier
				+ ", totalAmount=" + totalAmount + ", totalAmountTax=" + totalAmountTax + ", totalQuantity="
				+ totalQuantity + ", inventoryAddedDatetime=" + inventoryAddedDatetime + ", inventoryPaymentDatetime="
				+ inventoryPaymentDatetime + ", payStatus=" + payStatus + "]";
	}



	
	
}
