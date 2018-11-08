package com.mycomp.librmgmnt.domain;

import org.springframework.data.repository.CrudRepository;

public interface IssueRepository extends CrudRepository<Issue, Long> {
	
}
