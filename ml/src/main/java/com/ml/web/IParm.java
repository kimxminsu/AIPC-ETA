package com.ml.web;

import java.io.Serializable;
import java.util.List;

//import tsb.iotos.service.param.FilterItem;

public interface IParm extends Serializable {
  public String getServiceName();
  public String getMethodName();

  public int getSizePerPage();
  public void setSizePerPage(int pageSize);

  public String getCacheKey();
  public boolean useCache();

//  public List<FilterItem> getSearchFilters();
}
