package com.example.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "persons")
public class Person implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ps_id")
	private Long id;

	@Column(name = "ps_firstname")
	private String firstName;
	
	@Column(name = "ps_lastname")
	private String lastName;
	
	@Column(name = "ps_socnumber")
	private String socialNumber;
	
	@Column(name = "ps_telephone")
	private String telephone;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "ps_birthdate")
	private Date birthDate;
	
	@Column(name = "ps_city")
	private String city;

	public Person() {
	}

	public Person assign(Person person) {
		this.firstName = person.firstName;
		this.lastName = person.lastName;
		this.socialNumber = person.socialNumber;
		this.telephone = person.telephone;
		this.birthDate = person.birthDate;
		this.city = person.city;
	
		return this;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSocialNumber() {
		return socialNumber;
	}

	public void setSocialNumber(String socialNumber) {
		this.socialNumber = socialNumber;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	@Override
	public String toString() {
		return "Person [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", socialNumber="
				+ socialNumber + ", telephone=" + telephone + ", birthDate=" + birthDate + ", city=" + city + "]";
	}

}
