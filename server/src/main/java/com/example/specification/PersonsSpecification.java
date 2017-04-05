package com.example.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.example.model.Person;

public class PersonsSpecification {
	
	public static Specification<Person> lastNameLike(String lastName) {
		return new Specification<Person>() {
			@Override
			public Predicate toPredicate(Root<Person> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.like(criteriaBuilder.upper(root.<String>get("lastName")), "%" + lastName.toUpperCase() + "%");
			}
		};
	}

	public static Specification<Person> firstNameLike(String firstName) {
		return new Specification<Person>() {
			@Override
			public Predicate toPredicate(Root<Person> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.like(criteriaBuilder.upper(root.<String>get("firstName")), "%" + firstName.toUpperCase() + "%");
			}
		};
	}
	
}
