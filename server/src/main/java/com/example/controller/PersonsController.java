package com.example.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Person;
import com.example.service.PersonsService;

@RestController
@RequestMapping(value = "/api")
public class PersonsController {

	@Autowired
	private PersonsService service;

	@CrossOrigin
	@RequestMapping(value = "findbyid", method = RequestMethod.GET)
	public Map<String, Object>findById(@RequestParam("id") Long id) {
		Map<String, Object> response = new HashMap<>();

		Person person = service.findById(id);

		response.put("status", 0);
		response.put("data", person);
		
		return response;
	}

	@CrossOrigin
	@RequestMapping(value = "findall", method = RequestMethod.GET)
	public Map<String, Object> findAll() {
		Map<String, Object> response = new HashMap<>();
		
		response.put("status", 0);
		response.put("data", service.findAll());
		
		return response;
	}
	
	@CrossOrigin
	@RequestMapping(value = "findall-paging", method = RequestMethod.POST)
	public Map<String, Object> findAllPaging(@RequestBody PersonsFindAllPagingRequest request) {
		Map<String, Object> response = new HashMap<>();
		
		Direction sortDirection = (request.sortDirection.equalsIgnoreCase("DESC")) ? Sort.Direction.DESC : Sort.Direction.ASC;
		Page<Person> page = service.findAll(request.pageNumber, request.pageSize, sortDirection, request.sortBy);
		//Page<Person> page = service.findAllFilter(request.pageNumber, request.pageSize, sortDirection, request.sortBy, "wando");

		response.put("status", 0);
		response.put("data", page.getContent());
		response.put("totalRows", page.getTotalElements());
		
		return response;
	}
}
