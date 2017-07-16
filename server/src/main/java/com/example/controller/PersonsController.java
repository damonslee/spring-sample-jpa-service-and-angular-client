package com.example.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.Person;
import com.example.domain.PersonsRequest;
import com.example.service.PersonsService;

@RestController
@RequestMapping(value = "/api")
public class PersonsController {

	@Autowired
	private PersonsService service;

	@CrossOrigin
	@RequestMapping(value = "/person/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>>findById(@PathVariable("id") Long id) {
		Person person = service.findOne(id);

		if (person == null) {
			return new ResponseEntity<Map<String, Object>>(HttpStatus.NOT_FOUND);
		}

		Map<String, Object> response = new HashMap<>();
		response.put("status", 0);
		response.put("data", person);
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/person", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> findAll() {
		Collection<Person> persons = service.findAll();

		if (persons.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		Map<String, Object> response = new HashMap<>();
		response.put("status", 0);
		response.put("data", persons);
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/person", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> createPerson(@RequestBody Person person) {
		Person newPerson = service.save(person);

		Map<String, Object> response = new HashMap<>();
		response.put("status", 0);
		response.put("data", newPerson);
		
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@CrossOrigin
	@RequestMapping(value = "/person/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> updatePerson(@PathVariable("id") Long id, @RequestBody Person person) {
		Person currentPerson = service.findOne(id);

		if (currentPerson == null) {
			return new ResponseEntity<Map<String, Object>>(HttpStatus.NOT_FOUND);
		}

		currentPerson.assign(person);
		currentPerson = service.update(currentPerson);
		
		Map<String, Object> response = new HashMap<>();
		response.put("status", 0);
		response.put("data", currentPerson);
	
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/person/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> deletePerson(@PathVariable("id") Long id) {
		Person person = service.findOne(id);

		if (person == null) {
			return new ResponseEntity<Map<String, Object>>(HttpStatus.NOT_FOUND);
		}

		service.delete(id);

		Map<String, Object> response = new HashMap<>();
		response.put("status", 0);
		response.put("data", null);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@CrossOrigin
	@RequestMapping(value = "/persons", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Object>> findAllPaging(@RequestBody PersonsRequest personsRequest) {
		Sort sort = new Sort(Direction.fromString(personsRequest.getPageInfo().getDirection()), personsRequest.getPageInfo().getSortBy());
		Pageable pageable = new PageRequest(personsRequest.getPageInfo().getPage(), personsRequest.getPageInfo().getSize(), sort);
		Page<Person> page = service.findAll(personsRequest.getSearch(), pageable);

		Map<String, Object> response = new HashMap<>();
		response.put("status", 0);
		response.put("data", page.getContent());
		response.put("totalRows", page.getTotalElements());
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
