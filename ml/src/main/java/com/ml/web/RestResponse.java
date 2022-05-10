package com.ml.web;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;

import com.fasterxml.jackson.annotation.JsonRootName;

@JsonRootName(value = "response")
public class RestResponse { 
	private List<IDataItem> data;
	private IDataItem dataItem;
	private int limit;	// 총 개수(페이징 시 사용)

	public RestResponse() {
		//
	}
	
	public RestResponse(List<IDataItem> list) {
		this.setData(list);
	}
	
	public RestResponse(IDataItem itm) {
		this.setDataItem(itm);
	}	
	
	public List getData() {
		return data;
	}

	public void setData(List data) {
		this.data = data;
	}

	@XmlElement(name="dataItem")
	public IDataItem getDataItem() {
		return dataItem;
	}

	public void setDataItem(IDataItem dataItem) {
		this.dataItem = dataItem;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}
}
