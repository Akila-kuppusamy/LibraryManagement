package com.mycomp.librmgmnt.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Book {
    private @Id @GeneratedValue Long id;
    private String bookName, author, isbn;
 
    private Book() {}
 
   

	public Book( String bookName, String author, String isbn) {
		super();
		
		this.bookName = bookName;
		this.author = author;
		this.isbn = isbn;
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getBookName() {
		return bookName;
	}



	public void setBookName(String bookName) {
		this.bookName = bookName;
	}



	public String getAuthor() {
		return author;
	}



	public void setAuthor(String author) {
		this.author = author;
	}



	public String getIsbn() {
		return isbn;
	}



	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}



	
   
}