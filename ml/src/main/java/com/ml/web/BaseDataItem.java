package com.ml.web;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonRootName;

@JsonRootName(value = "data")
public class BaseDataItem implements IDataItem, Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 *     CRUD TYPE.
	 *     INITIAL = 0; QUERY = 1; INSERT = 2; UPDATE = 3; DELETE = 4;
	 *     com.tsb.iotos.c3it.dataitem.WorkingStatus 사용
	 */
	private int workingStatus;


    protected String userId;
    protected String staffCd;
    protected String pgmCode;
    
    // Version Check
	protected Date updateTime;
	protected String timestamp;
	protected String version;
    protected Date newVersion;
	protected boolean checkVersionFlag = false;
	
	// Key - Value 검색용. Map을 사용하면 되지 않나 싶지만 일단 C#과 동일하게 생성
	private String key;

	/**
	 * 사용자명, 모듈명, 화면명 등의 정보를 문자열로 포맷화 하는 경우 사용
	 * ex> "TSB       OM-ManualOperat"
	 * @return 
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * 사용자명, 모듈명, 화면명 등의 정보를 문자열로 포맷화 하는 경우 사용
	 * ex> "TSB       OM-ManualOperat"
	 * @return 
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getStaffCd() {
		return staffCd;
	}

	public void setStaffCd(String staffCd) {
		this.staffCd = staffCd;
	}

	public String getPgmCode() {
		return pgmCode;
	}

	public void setPgmCode(String pgmCode) {
		this.pgmCode = pgmCode;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
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

	public int getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(int workingStatus) {
		this.workingStatus = workingStatus;
	}

	@Override
	public String getKey() {
		return key;
	}

	@Override
	public void setKey(String key) {
		this.key = key;
	}
}
