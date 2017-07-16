package com.example.specification;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.example.domain.Person;

public class PersonsSpecification implements Specification<Person> {

	private Person criteria;
	
	public PersonsSpecification(Person criteria) {
		this.criteria = criteria;
	}
	
	@Override
	public Predicate toPredicate(Root<Person> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		List<Predicate> predicates = new ArrayList<>();
		
		if (this.criteria.getId() != null) {
			predicates.add(criteriaBuilder.equal(root.get("id"), this.criteria.getId()));
		}
		if ((this.criteria.getFirstName() != null) && (!this.criteria.getFirstName().equals(""))) {
			predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), "%" + this.criteria.getFirstName().toLowerCase() + "%"));
		}
		if ((this.criteria.getLastName() != null) && (!this.criteria.getLastName().equals(""))) {
			predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), "%" + this.criteria.getLastName().toLowerCase() + "%"));
		}
		if ((this.criteria.getSocialNumber() != null) && (!this.criteria.getSocialNumber().equals(""))) {
			predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("socialNumber")), "%" + this.criteria.getSocialNumber().toLowerCase() + "%"));
		}
		if ((this.criteria.getTelephone() != null) && (!this.criteria.getTelephone().equals(""))) {
			predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("telephone")), "%" + this.criteria.getTelephone().toLowerCase() + "%"));
		}
		if (this.criteria.getBirthDate() != null) {
			predicates.add(criteriaBuilder.equal(root.<Date>get("birthDate"), this.criteria.getBirthDate()));
/*
				Calendar cal = Calendar.getInstance();
				cal.set(Calendar.YEAR, 2005);
				cal.set(Calendar.MONTH, Calendar.APRIL);
				cal.set(Calendar.DATE, 8);
				cal.set(Calendar.HOUR_OF_DAY, 0);
		        cal.set(Calendar.MINUTE, 0);
		        cal.set(Calendar.SECOND, 0);
		        cal.set(Calendar.MILLISECOND, 0);
		        java.util.Date myDate = cal.getTime();
		        System.out.println("myDate: " + myDate);
		        
				predicates.add(criteriaBuilder.equal(root.<Date>get("birthDate"), criteriaBuilder.literal(myDate)));
*/
		}
		if ((this.criteria.getCity() != null) && (!this.criteria.getCity().equals(""))) {
			predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("city")), "%" + this.criteria.getCity().toLowerCase() + "%"));
		}

		if (predicates.size() > 0) {
			return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
		}

		return null;
	}
	
}
