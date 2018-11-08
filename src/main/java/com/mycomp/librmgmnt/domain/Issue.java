package com.mycomp.librmgmnt.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Issue {
    private @Id @GeneratedValue Long id;
    private String bookname, customer, dttim;
 
    private Issue() {}

	public Issue(String bookname, String customer, String dttim) {
		super();
		this.bookname = bookname;
		this.customer = customer;
		this.dttim = dttim;
	}

	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getDttim() {
		return dttim;
	}

	public void setDttim(String dttim) {
		this.dttim = dttim;
	}

	
   
	








	
   
}