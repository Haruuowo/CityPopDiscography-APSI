import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages 2+)
        if self._pageNumber > 1:
            self.drawString(54, 750, "CITY POP VAULT — PROJECT INCREMENT REPORT")
            self.drawRightString(612 - 54, 750, "COURSE CODE: 6APSI")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(54, 742, 612 - 54, 742)
            
        # Footer (all pages)
        self.setFont("Helvetica", 8)
        self.drawString(54, 36, "Confidential & Academic Record · Pre-Public Security & Increment Audit")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 54, 36, page_text)
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 48, 612 - 54, 48)
        
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Palette
    PRIMARY = colors.HexColor("#0F172A")    # Dark slate Navy
    ACCENT = colors.HexColor("#D97706")     # Warm Amber / Gold
    SECONDARY = colors.HexColor("#1E293B")  # Deep slate
    TEXT_MAIN = colors.HexColor("#334155")  # Charcoal body
    BG_LIGHT = colors.HexColor("#F8FAFC")   # Soft grey card
    BG_BOX = colors.HexColor("#FEF3C7")     # Warm highlight box
    BORDER_COLOR = colors.HexColor("#E2E8F0")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=PRIMARY,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=ACCENT,
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )
    
    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=SECONDARY,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=TEXT_MAIN,
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=body_style,
        leftIndent=15,
        bulletIndent=5,
        spaceAfter=4
    )

    highlight_box_style = ParagraphStyle(
        'BoxText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#78350F")
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=TEXT_MAIN
    )

    story = []

    # Title Banner Block
    story.append(Paragraph("PROJECT INCREMENT & PROGRESS REPORT", title_style))
    story.append(Paragraph("City Pop Discography & Community Vault · Course Code: 6APSI", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceBefore=0, spaceAfter=12))

    # Meta Table (Date, Author, Status, Project Phase)
    meta_data = [
        [
            Paragraph("<b>Project Phase:</b> Midterm / Pre-Public Audit", table_cell_style),
            Paragraph("<b>Date:</b> September 23, 2026", table_cell_style),
        ],
        [
            Paragraph("<b>Repository Status:</b> Public Lockdown Prepared", table_cell_style),
            Paragraph("<b>Early Start Status:</b> Initiated Ahead of Schedule", table_cell_style),
        ]
    ]
    meta_table = Table(meta_data, colWidths=[250, 254])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 14))

    # Early Initiation Highlight Box
    early_box_content = [
        [Paragraph("<b>★ EARLY INITIATION ADVANTAGE & STRATEGIC HIGHLIGHT</b>", ParagraphStyle('BoxH', parent=highlight_box_style, fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor("#92400E")))],
        [Paragraph(
            "<b>Proactive Timeline:</b> Work on this project was <b>started early in the preliminary cycle</b>, well ahead of standard submission schedules. Initiating early provided significant strategic technical advantages: it allowed ample time for thorough architectural planning, hand-crafting a modular design system (<code>DESIGN_SYSTEM.md</code>), integrating a dual dynamic/fallback Supabase data layer, and completing all pre-public security lockdown requirements (<code>SECURITY-CHECKLIST.md</code>) before public repository release.",
            highlight_box_style
        )]
    ]
    early_table = Table(early_box_content, colWidths=[504])
    early_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_BOX),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#F59E0B")),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(early_table)
    story.append(Spacer(1, 14))

    # Section 1: Executive Summary
    story.append(Paragraph("1. Executive Summary", h1_style))
    story.append(Paragraph(
        "The <b>City Pop Vault</b> platform is a full-stack web application designed to preserve, showcase, and recommend Japanese 1970s and 1980s City Pop vinyl albums. By combining a modern React frontend with a PostgreSQL/Supabase cloud database, the application enables users to filter albums by mood/vibe, play 30-second audio previews continuously across viewports, and submit new community album recommendations in real time.",
        body_style
    ))
    story.append(Paragraph(
        "Due to early commencement of development, all core functional requirements and security milestones have been completed cleanly ahead of deadline. The codebase has undergone comprehensive static and dynamic security audits to guarantee zero credential exposure before flipping the GitHub repository to public status.",
        body_style
    ))

    # Section 2: Incremental Milestones Breakdown
    story.append(Paragraph("2. Incremental Development Milestones", h1_style))
    
    # Milestone 1
    story.append(Paragraph("Increment 1: Core Frontend & UI Design System (Completed Early)", h2_style))
    story.append(Paragraph("• <b>Modular Design System:</b> Hand-crafted <code>DESIGN_SYSTEM.md</code> using Vanilla CSS variables for high-fidelity dark glassmorphism, gold accents, and multi-theme switching (Night, Day, Sunset).", bullet_style))
    story.append(Paragraph("• <b>React Component Architecture:</b> Developed modular components including <code>Header</code>, <code>HeroBanner</code>, <code>FilterBar</code>, <code>AlbumGrid</code>, <code>AlbumDetailModal</code>, and <code>AudioPlayerBar</code>.", bullet_style))
    story.append(Paragraph("• <b>Persistent Audio Context:</b> Integrated HTML5 audio player supporting uninterrupted playback while navigating filters and opening detail dialogs, with fallback iTunes preview URL resolution.", bullet_style))

    # Milestone 2
    story.append(Paragraph("Increment 2: Full-Stack Integration & Database Schema (Completed)", h2_style))
    story.append(Paragraph("• <b>Relational Database Architecture:</b> Modeled and deployed <code>albums</code>, <code>tracks</code>, and <code>recommendations</code> schemas on Supabase PostgreSQL with cascade deletion constraints.", bullet_style))
    story.append(Paragraph("• <b>Hybrid Data Resilience Layer:</b> Built dynamic REST fetch logic in <code>supabaseClient.js</code> featuring automatic fallback to local seed data (<code>citypopData.js</code>) during network disruptions.", bullet_style))
    story.append(Paragraph("• <b>Community Recommendations Pipeline:</b> Implemented reactive submission modal sending new recommendations directly to the Supabase database with optimistic UI updates.", bullet_style))

    # Milestone 3
    story.append(Paragraph("Increment 3: Features & Pre-Public Security Lockdown (Completed Ahead of Schedule)", h2_style))
    story.append(Paragraph("• <b>Featured YouTube Video Header Banner:</b> Replaced static image placeholder in <code>HeroBanner.jsx</code> with a 500px responsive 16:9 video frame embedding official City Pop video streams (<code>https://youtu.be/VtRIRJ0tBRc</code>).", bullet_style))
    story.append(Paragraph("• <b>Newsletter Subscription Engine:</b> Built an intuitive newsletter subscription form with real-time email validation, local state persistence, and automatic Supabase PostgreSQL synchronization.", bullet_style))
    story.append(Paragraph("• <b>Dedicated Album Curation Request Modal:</b> Developed <code>SuggestAlbumModal.jsx</code> separating the <i>'Ask What Album To Add Next'</i> flow from community recommendations with automated <code>mailto:</code> dispatch.", bullet_style))
    story.append(Paragraph("• <b>Authentic Vinyl Cover Resolver & Bug Fixes:</b> Fixed fuzzy title matching in <code>audioResolver.js</code> and added high-res 600x600 vinyl artwork mappings for <i>Variety</i>, <i>Ride on Time</i>, <i>Sea Breeze</i>, <i>Timely!!</i>, and <i>Pocket Park</i>.", bullet_style))
    story.append(Paragraph("• <b>Pre-Public Security Lockdown:</b> Listed <code>.env</code> in <code>.gitignore</code>, shipped clean <code>.env.example</code>, enforced Row Level Security (RLS) policies on Supabase tables, and completed <code>SECURITY-CHECKLIST.md</code>.", bullet_style))

    story.append(Spacer(1, 10))

    # Section 3: Security & Lockdown Compliance Table
    story.append(KeepTogether([
        Paragraph("3. Pre-Public Security Lockdown Audit Table", h1_style),
        Paragraph("The table below details the security verification items completed prior to making the project repository public:", body_style)
    ]))

    sec_headers = [Paragraph("<b>Security Check Item</b>", table_header_style), Paragraph("<b>Status</b>", table_header_style), Paragraph("<b>Verification & Evidence</b>", table_header_style)]
    sec_rows = [
        sec_headers,
        [
            Paragraph("`.env` Ignored in Git", table_cell_style),
            Paragraph("<font color='#166534'><b>Yes</b></font>", table_cell_style),
            Paragraph("Exposed in `.gitignore` (lines 14–15); `git status` clean.", table_cell_style)
        ],
        [
            Paragraph("`.env.example` Shipped", table_cell_style),
            Paragraph("<font color='#166534'><b>Yes</b></font>", table_cell_style),
            Paragraph("Shipped with placeholder URLs and anon keys only.", table_cell_style)
        ],
        [
            Paragraph("No Hardcoded Secrets in Code", table_cell_style),
            Paragraph("<font color='#166534'><b>Yes</b></font>", table_cell_style),
            Paragraph("All keys read dynamically via `import.meta.env`; zero hardcoded keys.", table_cell_style)
        ],
        [
            Paragraph("Clean Git Commit History", table_cell_style),
            Paragraph("<font color='#166534'><b>Yes</b></font>", table_cell_style),
            Paragraph("Verified via `git log -p` regex search; zero exposed strings.", table_cell_style)
        ],
        [
            Paragraph("Supabase Row Level Security (RLS)", table_cell_style),
            Paragraph("<font color='#166534'><b>Yes</b></font>", table_cell_style),
            Paragraph("RLS policies enabled on all tables (`albums`, `tracks`, `recs`).", table_cell_style)
        ],
        [
            Paragraph("Parameterized Database Queries", table_cell_style),
            Paragraph("<font color='#166534'><b>Yes</b></font>", table_cell_style),
            Paragraph("Queries strictly use Supabase JS builder methods (`.select()`, `.insert()`).", table_cell_style)
        ],
        [
            Paragraph("GitHub Actions Workflows", table_cell_style),
            Paragraph("<b>N/A</b>", table_cell_style),
            Paragraph("No `.github/workflows` present in repository.", table_cell_style)
        ],
        [
            Paragraph("SECURITY-CHECKLIST.md Completed", table_cell_style),
            Paragraph("<font color='#166534'><b>Yes</b></font>", table_cell_style),
            Paragraph("Authored in `project/` directory with full row evidence.", table_cell_style)
        ]
    ]

    sec_table = Table(sec_rows, colWidths=[140, 60, 304])
    sec_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, BG_LIGHT])
    ]))
    
    story.append(sec_table)
    story.append(Spacer(1, 14))

    # Section 4: Resource & Effort Distribution
    story.append(KeepTogether([
        Paragraph("4. Engineering & Resource Distribution", h1_style),
        Paragraph(
            "Due to starting the project early, development was structured around high manual code craftsmanship paired with strategic AI assistance: "
            "<b>70% Manual Engineering</b> (hand-crafted CSS design system, state lifting, audio player context, Supabase SQL schema design, RLS security rules) and "
            "<b>30% AI Assistance</b> (accelerated boilerplate generation, seed script drafting, and initial styling templates).",
            body_style
        ),
        Spacer(1, 6),
        Paragraph("5. Conclusion & Next Steps", h1_style),
        Paragraph(
            "With early commencement and rigorous security lockdown completed, the project repository is fully prepared for public publication and final grading evaluation. Future remaining tasks involve final UI visual checks and hosting deployment.",
            body_style
        )
    ]))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF: {filename}")

if __name__ == '__main__':
    target_path = r"c:\Flutter act\citypop-discography\6APSI\student-6apsi-classcode-midterm\project\Project_Increment_Report.pdf"
    root_path = r"c:\Flutter act\citypop-discography\Project_Increment_Report.pdf"
    
    build_pdf(target_path)
    build_pdf(root_path)
