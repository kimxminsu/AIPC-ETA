package com.ml.web;

import java.util.Date;

/**
 * IDataItem.java
 * Description: 
 * @since 2019. 10. 8.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *  2019. 10. 8.  이승일(SteveLee)          최초 생성
 *  
 *  VO 객체를 위한 Interface 타입 (Response 용)
 *  
 * </pre>
 */

public interface IDataItem {
	public int getWorkingStatus();

	public String getTimestamp();
	public void setTimestamp(String timestamp);
	
	public String getVersion();
	public void setVersion(String version);
	
	public Date getNewVersion();
	public void setNewVersion(Date newVersion);
	
	public boolean getCheckVersionFlag();
	public void setCheckVersionFlag(boolean checkVersionFlag);
	
	public Date getUpdateTime();
	public void setUpdateTime(Date updateTime);
	
	public String getKey();
	public void setKey(String key);
	

	/**
	 * 사용자명 그대로 사용하는 경우
	 * @return
	 */
	public String getStaffCd();
	/**
	 * 사용자명 그대로 사용하는 경우
	 * @param userId
	 */
	public void setStaffCd(String staffCd);
	/**
	 * 사용자명, 모듈명, 화면명 등의 정보를 문자열로 포맷화 하는 경우 사용
	 * ex> "TSB       OM-ManualOperat"
	 * @return 
	 */	
	public String getUserId();
	/**
	 * 사용자명, 모듈명, 화면명 등의 정보를 문자열로 포맷화 하는 경우 사용
	 * ex> "TSB       OM-ManualOperat"
	 * @return 
	 */
	public void setUserId(String userId);
}