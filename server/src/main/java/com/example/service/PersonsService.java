package com.example.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.domain.Person;
import com.example.repository.PersonsRepository;
import com.example.specification.PersonsSpecification;

@Service
public class PersonsService {

	@Autowired
	private PersonsRepository repository;
	
	public PersonsService() {
	}

	public Person findOne(Long id) {
		return repository.findOne(id);
	}
	
	public Collection<Person> findAll() {
		List<Person> list = new ArrayList<>();
		
		for (Person person : repository.findAll()) {
			list.add(person);
		}
		
		return list;
	}
	
	public Page<Person> findAll(Pageable pageable) {
		return repository.findAll(pageable);
	}

	public Page<Person> findAll(Person search, Pageable pageable) {
		Specification<Person> specification = new PersonsSpecification(search);
		
		return repository.findAll(specification, pageable);
	}

	public Person save(Person person) {
		return repository.save(person);
	}

	public Person update(Person person) {
		return repository.save(person);
	}

	public void delete(Long id) {
		repository.delete(id);
	}
}
