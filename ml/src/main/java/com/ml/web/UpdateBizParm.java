package com.ml.web;

import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

@JsonRootName(value = "data")
public class UpdateBizParm<T extends IDataItem> extends Parm{


	@JsonProperty(value = "data")
	private UpdateBizParm<T> data;

	public UpdateBizParm<T> getData() {
		return data;
	}

	public void setData(UpdateBizParm<T> data) {
		this.data = data;
	}

	private static final long serialVersionUID = 1L;

	private T item;
	private ArrayList<T> items;
	private int workingStatus;

	public T getItem() {
		return item;
	}
	public ArrayList<T> getItems() {
		return items;
	}
	public void setItem(T item) {
		this.item = item;
	}
	public void setItems(ArrayList<T> items) {
		this.items = items;
	}
	public int getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(int workingStatus) {
		this.workingStatus = workingStatus;
	}


}