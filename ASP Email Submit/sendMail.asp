<%

'GET VALUES FROM FORM'
	strEmail =  server.HTMLEncode(Request.Form("email"))
	strName = server.HTMLEncode(Request.Form("fullName"))
	strPhone = server.HTMLEncode(Request.Form("phone"))
	strMessage = server.HTMLEncode(Request.Form("message"))

	txtSuper = ""
	strEmail = ""
	  strTo      =  txtSuper
	  'strFrom    =  strEmail  'Request.Form("REQUESTOR_Email")
	  'strCC      =  strEmail
	  'strBCC     = 
	  strSubject = "Form: " & strName
	  strBody = "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.0 Transitional//EN'>" & vbCrLf & _
		"<html>" & vbCrLf & _
		"<head>" & vbCrLf & _
		"</head>" & vbCrLf & _ 
		"<body>" & vbCrLf & _ 
		"<p><strong> Names(s):</strong> " & strName & "</p>" & vbCrLf & _
		"<p><strong>Email:</strong> " & strEmail & "</p>" & vbCrLf & _
		"<p><strong>Phone:</strong> " & strPhone & "</p>" & vbCrLf & _
		"<p><strong>Message:</strong> " & strMessage & "</p>" & vbCrLf & _
		"</body>" & vbCrLf & _ 
		"</html>" & vbCrLf

					Set objCDOMail = Server.CreateObject("CDO.Message")
				    With objCDOMail
				    .To       = strTo
				    .From     = strEmail
				    '.CC       = strEmail
				    '.Bcc      = strBCC
				    .Subject  = strSubject
				    .HtmlBody = strBody 
				    .Send
				    End With
				    Set objCDOMail = Nothing
			
			
			Response.Write("done")
			Response.Flush()
			Response.End()
%>