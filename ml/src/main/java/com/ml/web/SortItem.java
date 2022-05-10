package com.ml.web;

public class SortItem {
	private String property;
	private String direction;
	private String convertedProperty;
	
	public String getDirection() {
		return direction;
	}
	public void setDirection(String direction) {
		this.direction = direction;
	}
	public String getProperty() {
		return property;
	}
	public void setProperty(String property) {
		this.property = property;
		this.convertedProperty = this.parseCamelToColumn(this.property);
	}
	
	public String getConvertedProperty() {
		return convertedProperty;
	}
	public void setConvertedProperty(String convertedProperty) {
		this.convertedProperty = convertedProperty;
	}
	
	private String parseCamelToColumn(String camel) {
		StringBuilder sb = new StringBuilder();
		char[] charArr = camel.toCharArray();
		for (char c : charArr) {
			if(Character.isUpperCase(c)) {
				sb.append("_");
			}
			sb.append(c);
		}
		
		return sb.toString();
	}
}
