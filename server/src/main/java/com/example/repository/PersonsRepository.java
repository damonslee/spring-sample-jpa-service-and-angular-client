package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.model.Person;

public interface PersonsRepository extends JpaRepository<Person, Long>, JpaSpecificationExecutor<Person> {

}
