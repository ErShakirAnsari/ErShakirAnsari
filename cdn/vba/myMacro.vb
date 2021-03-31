Sub MyMacro()
'
    'createNewSheet
    '''''''''''''''

    'copyHeadersFromSheet1
    '''''''''''''''
    
    itemIterator
    '''''''''''''''

End Sub


' ---- Create 3rd sheet for total
Sub createNewSheet()
    Sheets(2).Select
    Sheets.Add After:=ActiveSheet

End Sub
' ---- Copy headers from sheet1 to sheet3
Sub copyHeadersFromSheet1()
    Sheets(1).Select
    Rows("1:2").Select
    Selection.copy
    Sheets(3).Select
    Range("A1").Select
    ActiveSheet.Paste
End Sub
' ---- itemIterator
Sub itemIterator()
    sheet1_rows = Worksheets(1).Cells(Rows.Count, 1).End(xlUp).Row
    sheet2_rows = Worksheets(2).Cells(Rows.Count, 1).End(xlUp).Row
    
    For i = 3 To sheet1_rows
        asin_1 = Worksheets(1).Cells(i, 1).Value
        
        For j = 3 To sheet2_rows
            asin_2 = Worksheets(2).Cells(j, 1).Value
            
            If asin_1 = asin_2 Then
                Call copyAsin(asin_1)
            End If
            
        Next j
    
    Next i
End Sub
Sub copyAsin(asin)
    sheet3_rows = Worksheets(3).Cells(Rows.Count, 1).End(xlUp).Row
    Sheets(3).Select
    Cells(sheet3_rows + 1, 1).Value = asin
End Sub


Sub looping()
    sheet1_rows = Worksheets(1).Cells(Rows.Count, 1).End(xlUp).Row
    sheet2_rows = Worksheets(2).Cells(Rows.Count, 1).End(xlUp).Row
    
    
    For i = 3 To sheet1_rows
        asin_1 = Worksheets(1).Cells(i, 1).Value
        
        For j = 3 To sheet2_rows
            asin_2 = Worksheets(2).Cells(j, 1).Value
            
            If asin_1 = asin_2 Then
                'MsgBox ("Asin found " & asin_1)
            End If
            
        Next j
    
    Next i
End Sub

Sub sub2()

' - Select 1st sheet and create filter
    Sheets(1).Select
    Range("A2").Select
    Range(Selection, Selection.End(xlDown)).Select
    Range(Selection, Selection.End(xlToRight)).Select
    Selection.AutoFilter
    
    ActiveWorkbook.Worksheets(1).AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets(1).AutoFilter.Sort.SortFields.Add2 Key _
        :=Range("A2:A2035"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    With ActiveWorkbook.Worksheets(1).AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    
    'Remove Autofilter
    Selection.AutoFilter
    Range("A2").Select

' - Select 2nd sheet and create filter
    Sheets(2).Select
    Range("A2").Select
    Range(Selection, Selection.End(xlDown)).Select
    Range(Selection, Selection.End(xlToRight)).Select
    Selection.AutoFilter
    
    ActiveWorkbook.Worksheets(2).AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets(2).AutoFilter.Sort.SortFields.Add2 Key _
        :=Range("A2:A2035"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    With ActiveWorkbook.Worksheets(2).AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With

    'Remove Autofilter
    Selection.AutoFilter
    Range("A2").Select

    
' - Create 3rd sheet for total
    Sheets(2).Select
    Sheets.Add After:=ActiveSheet
    
' --Copy Asin from A2-down
    Sheets(1).Select
    Range("A2").Select
    Range(Selection, Selection.End(xlDown)).Select
    Selection.copy
    Sheets(3).Select
    Range("A2").Select
    ActiveSheet.Paste

' --Copy month headers from sheet1-sheet3
    Sheets(1).Select
    Range("B2").Select
    Range(Selection, Selection.End(xlToRight)).Select
    Selection.copy
    Sheets(3).Select
    Range("B2").Select
    ActiveSheet.Paste
    
    
    
    '''''''
    Sheets(3).Select
    Range("B3").Select
    'Worksheets(1).Range("B3").Columns(1).Value = 0
    'Selection.FormulaR1C1 = "='Worksheets(1)'!R[1]C+'Worksheets(2)'!R[1]C"



End Sub








