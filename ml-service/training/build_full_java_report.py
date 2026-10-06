"""
Complete Generator for CareerCompass AI Java PBL Report
Constructs CareerCompass_AI_Java_PBL_Report.docx with full academic rigor,
exact template structure, real Java codebase references, and verified test results.
"""

import os
import shutil
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

BASE_DOCX = r'C:\Users\Sabarish\Downloads\CareerCompass_AI_PBL_Report.docx'
TARGET_DOCX = r'C:\Users\Sabarish\Downloads\CareerCompass_AI_Java_PBL_Report.docx'
DOCS_DOCX = r'c:\sabarish\Projects\Career Compass\docs\CareerCompass_AI_Java_PBL_Report.docx'
IMAGES_DIR = r'c:\sabarish\Projects\Career Compass\scratch\java_report_images'

def set_cell_properties(cell, fill_hex=None, bold=False, font_size_pt=9.0, align=WD_ALIGN_PARAGRAPH.LEFT, text=""):
    cell.text = text
    p = cell.paragraphs[0]
    p.alignment = align
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.0
    if p.runs:
        r = p.runs[0]
        r.font.name = "Calibri"
        r.font.size = Pt(font_size_pt)
        r.bold = bold
        if fill_hex:
            tcPr = cell._tc.get_or_add_tcPr()
            shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
            tcPr.append(shd)

def set_cell_margins(cell, top=60, bottom=60, left=80, right=80):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def add_styled_code_block(doc, code_text):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    c = tbl.rows[0].cells[0]
    c.width = Inches(6.25)
    tcPr = c._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="F8F9FA"/>')
    tcPr.append(shd)
    set_cell_margins(c, top=80, bottom=80, left=100, right=100)
    c.text = code_text
    p = c.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.0
    for r in p.runs:
        r.font.name = "Consolas"
        r.font.size = Pt(8.0)
        r.font.color.rgb = RGBColor(0x21, 0x21, 0x21)
    return tbl

print("Full Java Report Generator module initialized.")
