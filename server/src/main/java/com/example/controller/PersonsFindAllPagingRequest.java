package com.example.controller;

public class PersonsFindAllPagingRequest {
	public Integer pageNumber;
	public Integer pageSize;
	public String sortBy;
	public String sortDirection;

	@Override
	public String toString() {
		return "PersonsFindAllPagingRequest [pageNumber=" + pageNumber + ", pageSize=" + pageSize + ", sortBy=" + sortBy
				+ ", sortDirection=" + sortDirection + "]";
	}
}
