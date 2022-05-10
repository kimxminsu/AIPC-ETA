package com.ml.web;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

//import com.ml.web.FilterItem;
import com.ml.web.SortItem;
import com.ml.web.StringUtil;
import org.hibernate.service.spi.ServiceException;

@JsonRootName(value = "data")
public class Parm  implements IParm {
	private static final long serialVersionUID = 1L;
	
	@JsonIgnore
	private String serviceName = "";	// Request Direct (Service Name)
	@JsonIgnore
	private String methodName = "";		// Request Direct (Method Name)

	// 페이징
	@JsonIgnore
	private int sizePerPage = 20; // 한 페이지당 개수
	@JsonIgnore
	private int pageNo = 0; // 페이지 번호
	
	//페이징 테스트
	private int page = 1; // pageNo와 같다.
	private int start = 0; // 시작 인덱스. 안쓴다.
	private int limit = 100; // sizePerPage와 같다.
	
	// 필터
	@JsonIgnore
	private String sort;
	@JsonIgnore
	private String filter;
	private List<SortItem> sortList;
//	private List<FilterItem> filterList;
	
	private String timestamp;
	private String version;
	private Date newVersion;
	private boolean checkVersionFlag = false;
	private Date updateTime;

	/** 검색조건 */
	@JsonIgnore
	private String searchCondition = "";
    
    /** 검색Keyword */
	@JsonIgnore
    private String searchKeyword = "";

	private boolean useCache = true;

	public void setUseCache(boolean useCache) {
		this.useCache = useCache;
	}

	public Parm() {
		// TODO:
	}
	
	protected boolean isNull(String value)
	{
		return (value == null) || (value.equals("null")) || (value.equals(""));
	}
	
	public String getServiceName() {
		return serviceName;
	}
	
	public Parm setServiceName(String serviceName) {
		this.serviceName = serviceName;
		return this;
	}
	
	public String getMethodName() {
		return methodName;
	}
	
	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public int getSizePerPage() {
		return sizePerPage;
	}

	public void setSizePerPage(int sizePerPage) {
		this.sizePerPage = sizePerPage;
	}

	public String getSearchCondition() {
		return searchCondition;
	}

	public void setSearchCondition(String searchCondition) {
		this.searchCondition = searchCondition;
	}

	public String getSearchKeyword() {
		return searchKeyword;
	}

	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Date getNewVersion() {
		return newVersion;
	}

	public void setNewVersion(Date newVersion) {
		this.newVersion = newVersion;
	}

	public boolean getCheckVersionFlag() {
		return checkVersionFlag;
	}

	public void setCheckVersionFlag(boolean checkVersionFlag) {
		this.checkVersionFlag = checkVersionFlag;
	}
	
	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@Override
	public String getCacheKey() {
		return this.getServiceName() + "." +  this.getMethodName();
	}

	@Override
	public boolean useCache() {
		return this.useCache;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort)throws Exception {
		this.sort = sort;
		if(StringUtil.nullChk(this.sort) == false) {
			this.setSortList(this.parseJson(this.sort, new TypeReference<List<SortItem>>() {}));			
		}
	}

	public String getFilter() {
		return filter;
	}

	public void setFilter(String filter) throws Exception {
		this.filter = filter;
		if(StringUtil.nullChk(this.filter) == false){
//			this.setFilterList(this.parseJson(this.filter, new TypeReference<List<FilterItem>>() {}));
		}
	}

//	public List<FilterItem> getFilterList() {
//		return filterList;
//	}

//	public void setFilterList(List<FilterItem> filterList) {
//		this.filterList = filterList;
//	}

	public List<SortItem> getSortList() {
		return sortList;
	}

	public void setSortList(List<SortItem> sortList) {
		this.sortList = sortList;
	}
	
	private <T> List<T> parseJson(String jsonString, TypeReference<List<T>> type) throws Exception{
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			List<T> list = objectMapper.readValue(jsonString, type);
			return list;
		} catch (IOException e) {
			throw new ServiceException("");
			// TODO 검색 조건 조회중 파싱하다가 예외 발생 관리자에 문의
		}
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

//	@Override
//	public List<FilterItem> getSearchFilters() {
//		return this.filterList;
//	}
}
