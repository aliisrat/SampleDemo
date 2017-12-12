package com.bluesquare.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Table(name = "inventory_details")
@Component
public class InventoryDetails {
	
	@Id
	@Column(name = "inventory_details_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long inventoryDetailsId;
	
	@ManyToOne
	@JoinColumn(name="inventory_id")
	private Inventory inventory;
	
	@ManyToOne
	@JoinColumn(name="product_id")
	private Product product;
	
	@Column(name="rate", precision = 19, scale = 2, columnDefinition="DECIMAL(19,2)")
	private float rate;
	
	@Column(name="quantity")
	private long quantity;
		
	@Column(name="amount", precision = 19, scale = 2, columnDefinition="DECIMAL(19,2)")
	private double amount;

	public long getInventoryDetailsId() {
		return inventoryDetailsId;
	}

	public void setInventoryDetailsId(long inventoryDetailsId) {
		this.inventoryDetailsId = inventoryDetailsId;
	}

	public Inventory getInventory() {
		return inventory;
	}

	public void setInventory(Inventory inventory) {
		this.inventory = inventory;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public float getRate() {
		return rate;
	}

	public void setRate(float rate) {
		this.rate = rate;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "InventoryDetails [inventoryDetailsId=" + inventoryDetailsId + ", inventory=" + inventory + ", product="
				+ product + ", rate=" + rate + ", quantity=" + quantity + ", amount=" + amount + "]";
	}
	
	
}
