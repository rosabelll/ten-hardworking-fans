Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")
strPath = objFSO.GetParentFolderName(WScript.ScriptFullName)

objShell.CurrentDirectory = strPath

' 尝试 Python3
On Error Resume Next
result = objShell.Run("python3 -m http.server 8765", 0, False)
If Err.Number = 0 Then
    objShell.Run "http://localhost:8765/"
    WScript.Quit
End If
Err.Clear

' 尝试 Python
result = objShell.Run("python -m http.server 8765", 0, False)
If Err.Number = 0 Then
    objShell.Run "http://localhost:8765/"
    WScript.Quit
End If

MsgBox "请先安装 Python：" & vbCrLf & "https://www.python.org/downloads/" & vbCrLf & vbCrLf & "安装时请勾选 Add Python to PATH", 48, "十个勤天 · 百科全书"
