//package com.ml.web;
//
//import java.util.Date;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import tsb.iotos.util.DateUtil;
//import tsb.iotos.util.StringUtil;
//
//public class FilterItem {
//	private String operator;
//	private String property;
//	private Object value;
//	private String likeOperationSyntax = "";
//	private String convertedProperty;
//
//	public String getOperator() {
//		return operator;
//	}
//	public void setOperator(String operator) {
//		this.operator = operator;
//
//		if(this.operator.equals("==")) {
//			this.operator = "=";
//		}
//		if(this.operator.equals("lt")) {
//			this.operator = "<";
//		}
//		else if(this.operator.equals("gt")) {
//			this.operator = ">";
//		}
//
//		if(this.operator.equals("like")) {
//			this.likeOperationSyntax = " || '%'";
//		}
//
//	}
//	public Object getValue() {
//		return value;
//	}
//	public void setValue(Object value) {
//		if(value instanceof List) {
//			this.value = this.parseArray((List<String>) value);
//		}
//		else if(value instanceof String) {
//			this.value = "'" + value + "'";
//
//			if(this.isDateString(value)) {
//				this.value = "TO_DATE("+this.value+", 'MM/DD/YYYY')";
//			}
//		}
////		// 'O', 'X' 인 경우는 어떡하나요?
////		else if(value instanceof Boolean) {
////			this.value = (boolean) value ? 'Y':'N';
////		}
//		else {
//			this.value = value;
//		}
//	}
//
//	private boolean isDateString(Object value) {
//		String str = (String)value;
//		String[] date = str.split("/");
//		if(date.length== 3
//				&& date[0].length() == 2 && StringUtil.isInteger(date[0])
//				&& date[1].length() == 2 && StringUtil.isInteger(date[1])
//				&& date[2].length() == 4 && StringUtil.isInteger(date[2])) {
//			return true;
//		}
//		return false;
//	}
//
//	public String getProperty() {
//		return property;
//	}
//	public void setProperty(String property) {
//		this.property = property;
//		this.convertedProperty = this.parseCamelToColumn(this.property);
//	}
//
//	private String parseArray(List<String> array) {
//		StringBuilder sb = new StringBuilder();
//		sb.append("(");
//		sb.append(array.stream().collect(Collectors.joining(",", "'", "'")));
//		sb.append(")");
//
//		return sb.toString();
//	}
//	public String getLikeOperationSyntax() {
//		return likeOperationSyntax;
//	}
//	public void setLikeOperationSyntax(String likeOperationSyntax) {
//		this.likeOperationSyntax = likeOperationSyntax;
//	}
//
//	public String getConvertedProperty() {
//		return convertedProperty;
//	}
//	public void setConvertedProperty(String convertedProperty) {
//		this.convertedProperty = convertedProperty;
//	}
//
//	private String parseCamelToColumn(String camel) {
//		StringBuilder sb = new StringBuilder();
//		char[] charArr = camel.toCharArray();
//		for (char c : charArr) {
//			if(Character.isUpperCase(c)) {
//				sb.append("_");
//			}
//			sb.append(c);
//		}
//
//		return sb.toString();
//	}
//}
