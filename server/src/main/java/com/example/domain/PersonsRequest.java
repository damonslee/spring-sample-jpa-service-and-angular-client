package com.example.domain;

public class PersonsRequest {
	
	public class PageInfo {
		private Integer page;
		private Integer size;
		private String sortBy;
		private String direction;

		public PageInfo() {
		}

		public Integer getPage() {
			return page;
		}

		public void setPage(Integer page) {
			this.page = page;
		}

		public Integer getSize() {
			return size;
		}

		public void setSize(Integer size) {
			this.size = size;
		}

		public String getSortBy() {
			return sortBy;
		}

		public void setSortBy(String sortBy) {
			this.sortBy = sortBy;
		}

		public String getDirection() {
			return direction;
		}

		public void setDirection(String direction) {
			this.direction = direction;
		}

		@Override
		public String toString() {
			return "PageInfo [page=" + page + ", size=" + size + ", sortBy=" + sortBy + ", direction=" + direction
					+ "]";
		}
		
	}
	
	private PageInfo pageInfo;
	private Person search;
	
	public PersonsRequest() {
	}
	
	public PersonsRequest(Person search, PageInfo pageInfo) {
		this.search = search;
		this.pageInfo = pageInfo;
	}

	public PageInfo getPageInfo() {
		return pageInfo;
	}

	public void setPageInfo(PageInfo pageInfo) {
		this.pageInfo = pageInfo;
	}

	public Person getSearch() {
		return search;
	}

	public void setSearch(Person search) {
		this.search = search;
	}

	@Override
	public String toString() {
		return "PersonsRequest [pageInfo=" + pageInfo + ", search=" + search + "]";
	}

}
