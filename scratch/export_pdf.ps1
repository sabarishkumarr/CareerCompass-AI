$docxPath = "C:\Users\Sabarish\Downloads\CareerCompass_AI_Java_PBL_Report.docx"
$pdfPath = "C:\Users\Sabarish\Downloads\CareerCompass_AI_Java_PBL_Report.pdf"
$docsPdfPath = "c:\sabarish\Projects\Career Compass\docs\CareerCompass_AI_Java_PBL_Report.pdf"

Write-Host "Opening Word COM..."
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
    $doc = $word.Documents.Open($docxPath)
    Write-Host "Updating Table of Contents..."
    if ($doc.TablesOfContents.Count -gt 0) {
        $doc.TablesOfContents.Item(1).Update()
    }
    Write-Host "Updating fields..."
    $doc.Fields.Update()
    $doc.Save()
    
    Write-Host "Exporting to PDF at: $pdfPath"
    $doc.ExportAsFixedFormat($pdfPath, 17) # 17 = wdExportFormatPDF
    $doc.Close([ref]$false)
    
    Copy-Item -Path $pdfPath -Destination $docsPdfPath -Force
    Write-Host "PDF successfully exported and copied to docs."
} catch {
    Write-Error $_.Exception.Message
} finally {
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
