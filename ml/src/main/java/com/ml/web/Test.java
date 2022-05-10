package com.ml.web;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Test<T extends IDataItem> {

	@JsonProperty(value = "data")
	private UpdateBizParm<T> data;

	public UpdateBizParm<T> getData() {
		return data;
	}

	public void setData(UpdateBizParm<T> data) {
		this.data = data;
	}
}