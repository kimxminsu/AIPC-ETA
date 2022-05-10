package com.ml.web;

import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.print.attribute.standard.DateTimeAtCompleted;



public class StringUtil {

	// =================================================================================================
	// ==> String null 여부를 리턴한다.
	// =================================================================================================
	public static boolean nullChk(String str) {
		if (str == null || str.equals(""))
			return true;
		else
			return false;
	}

	// =================================================================================================
	// ==> String 의 null값을 빈값으로 리턴한다.
	// =================================================================================================
	public String checkNullPoint(String nullString) {
		if (nullString == null || nullString.trim().equals("null"))
			return "";
		else
			return nullString.trim();
	}

	public static String checkNull(String nullString) {
		if (nullString == null || nullString.trim().equals("null"))
			return "";
		else
			return nullString.trim();
	}

	// =================================================================================================
	// ==> 문자열의 변환(전체문자열에는 영향없음)
	// =================================================================================================
	public synchronized String replaceStringAll2(String Source, String FindText, String replace) {

		String rtnSource = "";
		String rtnCheck = "";

		int FindLength = Source.length();
		int FindTextLength = FindText.length(); // 찾을 문자 길이

		char SourceArrayChar[] = new char[FindLength];
		SourceArrayChar = Source.toCharArray();

		for (int i = 0; i < FindLength; i++) {

			rtnCheck = Source.substring(i, i + 1);
			int j = i;

			if (FindLength - j >= FindTextLength)
				rtnCheck = Source.substring(j, j + FindTextLength);
			else
				rtnCheck = Source.substring(j, j + 1);

			if (rtnCheck.equals(FindText)) {
				rtnSource += replace;
				i += (FindTextLength - 1);
			} else {
				rtnSource += SourceArrayChar[i];
			}
		}
		return rtnSource;
	}

	// =================================================================================================
	// ==> 개행문자대신 <br> 붙이기
	// =================================================================================================
	public String appendHtmlBr(String comment) {
		int length = comment.length();
		StringBuffer buffer = new StringBuffer();

		for (int i = 0; i < length; ++i) {
			String comp = comment.substring(i, i + 1);

			if ("\r".compareTo(comp) == 0) {
				comp = comment.substring(++i, i + 1);

				if ("\n".compareTo(comp) == 0)
					buffer.append("<BR>\r");
				else
					buffer.append("\r");
			}
			buffer.append(comp);
		}
		return buffer.toString();
	}

	// =================================================================================================
	// ==> reqtColumn은 한글기준 (30이면 영문은 60개
	// ==> \r \n: 길이 1 ,<br>길이 4
	// ==> 원하는 길이에서 <br>을 추가해 라인 바꾸기
	// =================================================================================================
	public String changeLine(String Data, int reqtColumn) {

		String newStr = "";
		int len = Data.length();

		try {
			if (Data == null)
				return setSpace(reqtColumn);

			if (len > reqtColumn) {// data길이가 요구 길이보다 클때
				if (Data.toLowerCase().indexOf("<br>\r") == -1) {// <br>\r이
																	// 없을때
					int cursor = 0;
					int engCount = 0;
					for (int i = 0; i < len; i++) {
						String addStr = Data.substring(i, i + 1);
						// 원하는 길이가 됐을때
						if (cursor == reqtColumn) {
							addStr += "<br>\r";
							cursor = 0;
						}
						cursor++; // 위에 쓰면 첫라인은 1개가 들찍힘
						// 30개로 끊을때 한글은 30개,영문은 60개로 끊기위해
						char c = addStr.charAt(0);
						if ((int) Character.toUpperCase(c) >= 65 && (int) Character.toUpperCase(c) <= 90) {
							engCount++;// 영문2개를 한개로 잡기위해
							if (engCount == 2) {
								cursor--;
								engCount = 0;
							}
						}
						newStr += addStr;
					}
				} else {// <br>\r이 있을때
					int cursor = 0;
					int engCount = 0;
					String currStr = "";

					for (int i = 0; i < len; i++) {
						if (len - i > 5)
							currStr = Data.substring(i, i + 5);
						else
							currStr = Data.substring(i, len);
						String addStr = "";
						if (currStr.toLowerCase().equals("<br>\r")) {// <br>이
							// 있을때
							addStr = currStr;
							i += 4;
							cursor = 0;// cursor도중에 <br>\r있으면 0으로 초기화
						} else {// <br>이 없을때
							addStr = Data.substring(i, i + 1);
							// 원하는 길이가 됐을때
							if (cursor == reqtColumn) {
								addStr += "<br>\r";
								cursor = 0;
							}

							cursor++; // 위에 쓰면 첫라인은 1개가 들찍힘
							// 30개로 끊을때 한글은 30개,영문은 60개로 끊기위해
							char c = addStr.charAt(0);
							if ((int) Character.toUpperCase(c) >= 65 && (int) Character.toUpperCase(c) <= 90) {
								engCount++;// 영문2개를 한개로 잡기위해
								if (engCount == 2) {
									cursor--;
									engCount = 0;
								}
							}
						} // - br이 있고 없을때
						newStr += addStr;
					} // for
				} // br이 있고 없을때
			} else {// data길이가 요구 길이보다 작을때
				newStr = Data;
			}
		} catch (java.lang.Exception ex) {
			return "changeline error :" + ex.getMessage();
		}

		return newStr;
	}

	// =================================================================================================
	// ==> blank Check하여 &nbsp; 반환
	// =================================================================================================
	public String checkBlank2Nbsp(String string) {
		if (string.length() == 0 || string.equals("")) {
			return "&nbsp;";
		} else {
			return string;
		}
	}

	// =================================================================================================
	// ==> NullCheck하여 공백 반환
	// =================================================================================================
	public String checkNull2Blank(String nullString) {
		if (nullString == null || nullString.equals("null")) {
			return "";
		} else {
			return nullString;
		}
	}

	// =================================================================================================
	// ==> NullCheck하여 '-' 반환
	// =================================================================================================
	public String checkNull2Dash(String nullString) {
		if (nullString == null || nullString.trim().equals("null")) {
			return "-";
		} else {
			return nullString.trim();
		}
	}

	// =================================================================================================
	// ==> NullCheck하여 &nbsp; 반환
	// =================================================================================================
	public String checkNull2Space(String nullString) {
		if (nullString == null || nullString.equals("null")) {
			return "&nbsp;";
		} else {
			return nullString;
		}
	}

	// =================================================================================================
	// ==> NullCheck하여 원하는 값 반환
	// =================================================================================================
	public String checkNull2Value(String nullString, String value) {
		if (nullString == null || nullString.equals("null")) {
			return value;
		} else {
			return nullString;
		}
	}

	// =================================================================================================
	// ==> NullCheck하여 "0" 반환
	// =================================================================================================
	public String checkNull2Zero(String nullString) {
		if (nullString == null || nullString.equals("null")) {
			return "0";
		} else {
			return nullString;
		}
	}

	// =================================================================================================
	// ==> null이나 빈공백시 0로 setting
	// =================================================================================================
	public String checkReturnZero(String str) {
		if (str == null)
			str = "0";
		else if (str.trim().equals("") || str.trim().length() < 1)
			str = "0";
		return str;
	}

	// =================================================================================================
	// ==> String 배열을 입력받아 NullCheck하여 원하는 값 반환
	// =================================================================================================
	public String checkNull2Value(String[] nullArray, int i, String value) {
		if (nullArray == null) {
			return value;
		} else if (nullArray[i] == null) {
			return value;
		} else {
			return nullArray[i];
		}
	}

	// =================================================================================================
	// ==> 확장자에 따른 이미지 뿌리기
	// =================================================================================================
	public String fileImage(String attc_file, String imgPath) {
		// 확장자
		String file_type = fileType(attc_file).toLowerCase();
		String file_name = "";
		String file_image = "";
		if (attc_file == null)
			return "";
		if (attc_file.length() > 15)
			file_name = attc_file.substring(15);
		else
			file_name = attc_file;
		if (file_type.equals("exe"))
			file_image = "<img src=\"" + imgPath + "exe.gif\" border=0>" + file_name;
		else if (file_type.equals("doc"))
			file_image = "<img src=\"" + imgPath + "doc.gif\" border=0>" + file_name;
		else if (file_type.equals("htm") || file_type.equals("html"))
			file_image = "<img src=\"" + imgPath + "html.gif\" border=0>" + file_name;
		else if (file_type.equals("ppt"))
			file_image = "<img src=\"" + imgPath + "ppt.gif\" border=0>" + file_name;
		else if (file_type.equals("zip") || file_type.equals("arj") || file_type.equals("rar"))
			file_image = "<img src=\"" + imgPath + "press.gif\" border=0>" + file_name;
		else if (file_type.equals("hwp"))
			file_image = "<img src=\"" + imgPath + "hwp.gif\" border=0>" + file_name;
		else if (file_type.equals("txt"))
			file_image = "<img src=\"" + imgPath + "txt.gif\" border=0>" + file_name;
		else if (file_type.equals("null") || file_type.equals(""))
			file_image = "";
		else
			file_image = "<img src=\"" + imgPath + "unkn.gif\" border=0>" + file_name;

		return file_image;
	}

	// =================================================================================================
	// ==> 확장자 반환
	// =================================================================================================
	public String fileType(String file) {
		String fileType = "";

		if (file == null || file.trim().equals("") || file.length() < 1)
			return "";

		int point = file.lastIndexOf('.');
		fileType = file.substring(point + 1);

		return fileType;
	}

	// =================================================================================================
	// ==> 원하는 문자로 원하는 갯수(totalLength-data크기)만큼 채워준다
	// ==> 반환 크기 data length
	// =================================================================================================
	public String fillChar2String(String str, int totalLength, String fillChar, String align) {

		if (str == null)
			str = "";

		String strData = "";
		int CheckNum = totalLength - str.length();
		for (int i = 0; i < CheckNum; i++)
			strData += fillChar;

		if (align.toUpperCase().equals("RIGHT"))
			strData = str + strData;
		else
			strData = strData + str;

		return strData;
	}

	// =================================================================================================
	// ==> 원하는 문자로 원하는 갯수(totalLength)만큼 채워준다
	// ==> 반환 크기 data length +totalLength
	// =================================================================================================
	public String fillChar2StringSumSize(String str, int totalLength, String data, String align) {

		if (str == null)
			str = "";

		String strData = "";
		for (int i = 0; i < totalLength; i++)
			strData += data;

		if (align.toUpperCase().equals("RIGHT"))
			strData = str + strData;
		else
			strData = strData + str;

		return strData;
	}

	
	
	// =================================================================================================
	// ==> 좌측정렬 : 문자열+원하는 스페이스크기
	// ==> 오른쪽 정렬 : 원하는 스페이스크기 + 문자열
	// ==> 중간 정렬 : 원하는 스페이스크기/2 + 문자열 + 원하는 스페이스크기/2
	// ==> 반환 크기 SpaceNum
	// =================================================================================================
	public String fillSpace2String(String Data, int SpaceNum, String Align) {

		String LeftSpace = "";
		String RightSpace = "";
		String ReturnValue = "";
		int CheckNum = 0;

		try {
			if (Data == null) {
				return setSpace(SpaceNum);
			}
			// 가져온 데이터가 보여주고자하는 길이보다 클 경우 보여주고자하는 길이만큼 잘라준다.
			if (toCode(Data).length() > SpaceNum) {
				// 잘리는 부분에 한글이 들어가면 그 컬럼 전체가 빠짐
				// 그래서 한글일 경우 그 전에서 자름
				if (Data.length() == toCode(Data).length()) {
					Data = Data.substring(0, SpaceNum);
				} else {
					if (toHangul(toCode(Data).substring(SpaceNum - 1, SpaceNum + 1))
							.equals(toCode(Data).substring(SpaceNum - 1, SpaceNum + 1))) {
						Data = toCode(Data).substring(0, SpaceNum - 1) + " ";
					} else {
						Data = toCode(Data).substring(0, SpaceNum);
					}

					Data = toHangul(Data);
				}
			} else {
				CheckNum = SpaceNum - toCode(Data).length();
			}

			int LeftCheckNum = CheckNum / 2;
			int RightCheckNum = CheckNum - LeftCheckNum;

			for (int i = 0; i < LeftCheckNum; i++) {
				LeftSpace += " ";
			}

			for (int i = 0; i < RightCheckNum; i++) {
				RightSpace += " ";
			}

			// 왼쪽으로 정렬
			if (Align.toUpperCase().equals("LEFT")) {
				ReturnValue = Data + LeftSpace + RightSpace;
			}
			// 오른쪽으로 정렬
			else if (Align.toUpperCase().equals("RIGHT")) {
				ReturnValue = LeftSpace + RightSpace + Data;
			}
			// 가운데로 정렬
			else if (Align.toUpperCase().equals("CENTER")) {
				ReturnValue = LeftSpace + Data + RightSpace;
			}
		} catch (java.lang.Exception ex) {
			ReturnValue = Data + ":" + ex.getMessage();
		}

		return ReturnValue;
	}

	// 원하는 사이즈만큼의 space넣기
	public String setSpace(int loopNum) {
		String rtn = "";
		for (int i = 0; i < loopNum; i++)
			rtn = rtn + " ";
		return rtn;
	}

	// length크기에 맞추어 0을 붙여 반환
	public static String toLen(int nums, int length) {
		String num = String.valueOf(nums).toString();
		int space = length - num.length();
		int i = 0;
		String buf = "";

		for (i = 0; i < space; i++)
			buf += "0";

		num = buf + num;

		return num;
	}

	// 02로
	public static String toLen2(int nums) {
		String num = String.valueOf(nums).toString();
		if (num.length() == 1)
			num = "0" + num;

		return num;
	}

	public static String toLen3(int nums) {
		String num = String.valueOf(nums).toString();

		if (num.length() == 1) {
			num = "00" + num;
		} else if (num.length() == 2) {
			num = "0" + num;
		}
		return num;
	}

	// 한글을 일반코드로 바꾸기 위해서
	public static String toCode(String kscode)// throws UnsupportedEncodingException
	{
		if (kscode == null)
			return null;

		String data = "";

		try {
			data = new String(kscode.getBytes("KSC5601"), "8859_1");
		} catch (UnsupportedEncodingException e) {
			data = kscode + " : " + e.getMessage();
		} catch (Exception e) {
			data = kscode + " : " + e.getMessage();
		}

		return data;
	}

	// 유니코드를 한글로
	public static String toHangul(String str) // throws
	// java.io.UnsupportedEncodingException
	{
		if (str == null)
			return null;

		String data = "";
		try {
			data = new String(str.getBytes("8859_1"), "KSC5601");
		} catch (UnsupportedEncodingException e) {
			data = str + " : " + e.getMessage();
		} catch (Exception e) {
			data = str + " : " + e.getMessage();
		}

		return data;

		// 한글인데 한번 더 쓰면 ??? 표시
	}

	// String Replace 시킴 - 문자열의 변환(전체문자열에는 영향없음)
	public static String replaceStringAll(String in, String find, String replace) {
		String data = in;
		int pos = 0;
		int npos = in.indexOf(find, pos);

		while (npos >= 0) {
			data = data.substring(0, npos) + replace + data.substring(npos + find.length(), data.length());
			pos = npos + find.length();
			npos = data.indexOf(find, pos);
		}

		return data;
	}

	// --> src문자를 포함하여 size 길이 만큼 문자열 앞에 pad문자를 채운다.
	public static String lPad(String src, int size, String pad) {

		src += "";

		int iloop = size - src.length();
		String padding = "";

		for (int i = 0; i < iloop; i++) {
			padding += pad;
		}

		return padding + src + "";
	}

	/**
	 * check string value is Integer
	 * 
	 * @param value
	 * @return
	 */
	public static boolean isInteger(String value) {
		try {
			Integer.parseInt(value);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}

	/**
	 * check string value is Real Number
	 * 
	 * @param value
	 * @return
	 */
	public static boolean isDouble(String value) {
		try {
			Double.parseDouble(value);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}

	/**
	 * try parse string to int
	 * 
	 * @param value
	 * @param defaultValue
	 * @return
	 */
	public static int tryParse(String value, int defaultValue) {
		try {
			return Integer.parseInt(value);
		} catch (NumberFormatException e) {
			return defaultValue;
		}
	}

	/**
	 * try parse string to double
	 * 
	 * @param value
	 * @param defaultValue
	 * @return
	 */
	public static double tryParse(String value, double defaultValue) {
		try {
			return Double.parseDouble(value);
		} catch (NumberFormatException e) {
			return defaultValue;
		}
	}

	/**
	 * try parse string to float
	 * 
	 * @param value
	 * @param defaultValue
	 * @return
	 */
	public static float tryParse(String value, float defaultValue) {
		try {
			return Float.parseFloat(value);
		} catch (NumberFormatException e) {
			return defaultValue;
		}
	}
	// 21.1.20 JS.SIM Boolean 형 추가
	public static Boolean tryParse(String value, Boolean defaultValue) {
		try {
			return Boolean.parseBoolean(value);
		} catch (NumberFormatException e) {
			return defaultValue;
		}
	}

	/**
	 * try parse string to date by format
	 * 
	 * @param value
	 * @param format
	 * @param defaultValue
	 * @return
	 */
	public static Date tryParse(String value, String format, Date defaultValue) {
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat(format);
			return dateFormat.parse(value);
		} catch (Exception e) {
			return defaultValue;
		}
	}

	//Numeric Check (2021-02-23 DO.Lee)
	public static boolean IsNumeric(String input) {
		try {
			Double.parseDouble(input);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}
	
    public static String getIndexToken(String data, long index, String separator) {
        String idxToken = null;
        int i = 0;
        int lLen = 0;
        int lPos1 = 0;
        int lCnt = 0;

        i = 1;
        lCnt = 1;
        lLen = data.length();
        if (separator.length() == 0) {
            separator = "";
        }

        do {
            lPos1 = (data.indexOf(separator, i - 1) + 1);
            if (lPos1 > 0)
            {
                if (lCnt == index)
                {
                    idxToken = data.substring(i - 1, lPos1 - i);
                    break;
                }
                i = lPos1 + 1;
                lCnt = lCnt + 1;
            } else {
                if (lCnt == index && index >= 1) {
                    idxToken = data.substring(i - 1, lLen - (i - 1));
                }
                break;
            }
        } while (i <= lLen);
        return idxToken;
    }
    
    public static int getInt(String str) {
        try {
            return (str == null || str.trim().length() == 0 ? 0 : Integer.parseInt(str));

        } catch(Exception e) {
            // Logger.err.println(e);
        }

        return 0;
    } 
    
    public static String mid(String str, int iStart, int iLen) {
        try {
            if (str == null || iStart < 0 || iLen < 0 || iStart > str.length()) return "";

            if ((iStart + iLen) > str.length())
                return str.substring(iStart);
            else
                return str.substring(iStart, iStart + iLen);

        } catch(Exception e) {
            // Logger.err.println(e);
        }

        return "";
    }    
    
    /**
     * get a string from the right side of a string.
     * @param str a string containing the data
     * @param iLen lenght of string
     * @return string value
     */
    public static String right(String str, int iLen) {
        try {
            if (str == null || iLen < 0) return "";

            return (iLen > str.length() ? str : str.substring(str.length() - iLen));

        } catch(Exception e) {
            // Logger.err.println(e);
        }

        return "";
    }

    /**
     * get a string from the left side of a string.
     * @param str a string containing the data
     * @param iLen lenght of string
     * @return string value
     */
    public static String left(String str, int iLen) {
        try {
            if (str == null || iLen < 0) return "";

            return (iLen > str.length() ? str : str.substring(0, iLen));

        } catch(Exception e) {
            // Logger.err.println(e);
        }

        return "";
    }
    /**
     * C3IT 데이터 전송 규격 String(bool) 타입 변환
     * DataType : String -> String
     * 			true     ->  Y
     * 			false    ->  N
     * @param s
     * @return
     */
    public static String boolStringparseYNString(String s) {
    	if(s.equals("true") || s.equals("false")) {
    		s = s.equals("true") ? "Y" : "N"; 
    	}
    	return s;
	}
    /**
     * C3IT에서 Tier 부분 cvt 처리
     * @param s
     * @return
     */
    public static int CvTier2Idx(String s) {
    	int tierIdx =0;
    	try {
    		switch(s) {
    		case "+":
                tierIdx = -1;
                break;
            case "-":
                tierIdx = -2;
                break;
            case "*":
                tierIdx = -3;
                break;
            case "/":
                tierIdx = -4;
                break;
            default:
//            	if(StringUtils.isBlank(s)== false) {
//            		tierIdx = Integer.parseInt(s);
//            	}else {
//            		//"ERROR GlobalUtility.CvtTier2Idx() : Invalid Data = " + cData
//            	}
    			
    		}
    	}catch (Exception e) {
			// TODO: handle exception
    		// Logger.err.println(e);
		}
    	return tierIdx;
    	
    }
    
    public static int Null2Number(String vResult) {
    	int tempNull2Number = 0;
//    	if(StringUtils.isEmpty(vResult)) {
//    		tempNull2Number = 0;
//    	}else {
//    		tempNull2Number = Integer.parseInt(vResult);
//
//    	}
    	return tempNull2Number;
    }
    
    
}
