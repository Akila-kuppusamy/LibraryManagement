package com.mycomp.librmgmnt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import com.mycomp.librmgmnt.domain.Author;
import com.mycomp.librmgmnt.domain.AuthorRepository;
import com.mycomp.librmgmnt.domain.Book;
import com.mycomp.librmgmnt.domain.BookRepository;
import com.mycomp.librmgmnt.domain.Customer;
import com.mycomp.librmgmnt.domain.CustomerRepository;
import com.mycomp.librmgmnt.domain.Issue;
import com.mycomp.librmgmnt.domain.IssueRepository;

@SpringBootApplication
public class SpringReactApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringReactApplication.class, args);
	}
	
	
	@Component
	public class DatabaseLoader implements CommandLineRunner {
	 
	    private final CustomerRepository repository;
	    private final BookRepository bookRepository;
	    private final IssueRepository issueRepository;
	    private final AuthorRepository authorRepository;
	 
	    @Autowired
	    public DatabaseLoader(CustomerRepository repository,BookRepository bookRepository,IssueRepository issueRepository,AuthorRepository authorRepository ) {
	        this.repository = repository;
	        this.bookRepository = bookRepository;
	        this.issueRepository = issueRepository;
	        this.authorRepository=authorRepository;
	    }
	 
	    @Override
	    public void run(String... strings) throws Exception {
	        this.repository.save(new Customer("John", "Johnson", "john@john.com"));
	        this.repository.save(new Customer("Mary", "Poppins", "pop@mary.com"));
	        this.repository.save(new Customer("Rob", "Robber", "rob@bery.com"));
	        this.repository.save(new Customer("Kate", "Robinson", "kate@robinson.com"));
	        
	        this.bookRepository.save(new Book( "Java reference", "Allan", "IN123"));
	        this.issueRepository.save(new Issue("1234", "a@a.com", "Today"));
	        this.issueRepository.save(new Issue("43534", "b@a.com", "Today"));
	        this.issueRepository.save(new Issue("1345345234", "c@a.com", "Today"));
	        this.authorRepository.save(new Author("Jim", "US", "Oreilly"));
	        this.authorRepository.save(new Author("Allan", "UK", "Prentice"));
	    }
	}	
}
