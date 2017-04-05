package com.example.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.model.Person;
import com.example.repository.PersonsRepository;
import com.example.specification.PersonsSpecification;

@Service
public class PersonsService {

	@Autowired
	private PersonsRepository repository;
	
	public Person findById(Long id) {
		return repository.findOne(id);
	}
	
	public List<Person> findAll() {
		List<Person> list = new ArrayList<>();
		
		for (Person person : repository.findAll()) {
			list.add(person);
		}
		
		return list;
	}
	
	public Page<Person> findAll(Integer page, Integer size, Direction direction, String properties) {
		PageRequest pageRequest = new PageRequest(page, size, direction, properties);
		
		return repository.findAll(pageRequest);
	}

	public Page<Person> findAllFilter(Integer page, Integer size, Direction direction, String properties, String lastName) {
		PageRequest pageRequest = new PageRequest(page, size, direction, properties);
		Specification<Person> specification = PersonsSpecification.lastNameLike(lastName);
		
		return repository.findAll(specification, pageRequest);
	}

}
