Set StringChunk = New RegExp
StringChunk.Pattern = "([\s\S]*?)([""\\x00-\x1f])"

'Writes the response result on buffer
Const HTTPCLIENT_CFG_DEBUG = False

Class HttpClient
  
  Private Sub Class_Initialize()
    
  End Sub
  
  Private Sub Class_Terminate()
    
  End Sub
  
  Public Function Send(method, url, data)
    
    If TypeName(url) <> "String" Or TypeName(data) <> "String" Then
      Send = Empty
      Exit Function
    End If
    
    If url = "" Then
      Send = Empty
      Exit Function
    End If
    
    Dim MSXML : Set MSXML = Server.CreateObject("MSXML2.ServerXMLHTTP.6.0")
    
    With MSXML
      .Open method, url, False
      .SetRequestHeader "Content-Type", "application/x-www-form-urlencoded;charset=iso-8859-1"
      .Send data
      
      If HTTPCLIENT_CFG_DEBUG Then
        
        Response.Clear
        Response.Write "Method: " & method
        Response.Write VbCrLf
        Response.Write "Content-Type: application/x-www-form-urlencoded"
        Response.Write VbCrLf
        Response.Write "Url: " & url
        Response.Write VbCrLf
        Response.Write "Data: " & data
        Response.Write VbCrLf
        Response.Write "Response: " & .ResponseText
        Response.Write VbCrLf
      End If
      
      Send = .ResponseText
    End With
    
    
    Set MSXML = Nothing
  End Function
  
  Public Function DoGet(url, data)
    
    DoGet = Send("GET", url, data)
  End Function
  
  Public Function DoPost(url, data)
    
    DoPost = Send("POST", url, data)
  End Function
  
  Public Function DoPut(url, data)
    
    DoPut = Send("PUT", url, data)
  End Function
  
  Public Function DoPatch(url, data)
    
    DoPatch = Send("PATCH", url, data)
  End Function
  
  Public Function DoDelete(url, data)
    
    DoDelete = Send("DELETE", url, data)
  End Function
  
End Class

Dim test : test = "Testing scaped "" quotes"
If (0 <> 1) Then
  Dim test2
  test2 = "Testing scaped "" quotes"
End If