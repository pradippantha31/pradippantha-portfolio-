import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Palette
    NAVY = colors.HexColor("#0F172A")
    SKY = colors.HexColor("#0EA5E9")
    TEXT_DARK = colors.HexColor("#1E293B")
    TEXT_MUTED = colors.HexColor("#64748B")

    title_style = ParagraphStyle(
        'Name',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=NAVY,
        alignment=TA_CENTER
    )

    subtitle_style = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=SKY,
        alignment=TA_CENTER
    )

    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=TEXT_MUTED,
        alignment=TA_CENTER
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=NAVY,
        alignment=TA_LEFT,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=TEXT_DARK
    )

    bold_body = ParagraphStyle(
        'BoldBody',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=NAVY
    )

    story = []

    # Header
    story.append(Paragraph("PRADIP PANTHA", title_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("COMPUTER SCIENCE STUDENT & SOFTWARE DEVELOPER", subtitle_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Email: panthapradip31@gmail.com &nbsp;|&nbsp; LinkedIn: linkedin.com/in/panthapradip31 &nbsp;|&nbsp; GitHub: github.com/pradippantha31/pradippantha-portfolio-", contact_style))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1.5, color=SKY, spaceBefore=0, spaceAfter=12))

    # About Me / Summary
    story.append(Paragraph("ABOUT ME", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=2, spaceAfter=6))
    summary_text = (
        "Technology has always interested me because of its ability to turn ideas into practical solutions. "
        "That curiosity led me to pursue Computer Science at Herald College Kathmandu, where I've developed a strong "
        "foundation in software development while discovering that I enjoy collaborating with people just as much as writing code. "
        "I approach challenges with curiosity and persistence, valuing clear communication and delivering reliable work."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 12))

    # Education
    story.append(Paragraph("EDUCATION", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=2, spaceAfter=6))
    edu_data = [
        [Paragraph("<b>BSc (Hons) Computer Science</b>", bold_body), Paragraph("<b>Herald College Kathmandu</b>", ParagraphStyle('R', parent=bold_body, alignment=2))],
        [Paragraph("Full-time Undergraduate Program", body_style), Paragraph("Kathmandu, Nepal", ParagraphStyle('R2', parent=body_style, alignment=2))]
    ]
    t_edu = Table(edu_data, colWidths=[360, 172])
    t_edu.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 1)]))
    story.append(t_edu)
    story.append(Spacer(1, 12))

    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=2, spaceAfter=6))
    skills_text = (
        "<b>Frontend & UI:</b> React 19, TypeScript, TanStack Start, Vite, Tailwind CSS, Framer Motion, Lenis<br/>"
        "<b>Backend & Systems:</b> Node.js, SQL, REST APIs, Git & GitHub Version Control<br/>"
        "<b>Workflow & Management:</b> Agile Sprints, Trello Workflow Coordination, User Documentation"
    )
    story.append(Paragraph(skills_text, body_style))
    story.append(Spacer(1, 12))

    # Featured Projects
    story.append(Paragraph("FEATURED PROJECTS & SOFTWARE", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=2, spaceAfter=6))

    # Project 1
    p1 = [
        [Paragraph("<b>Expense Tracking App</b> (Full Stack / SaaS)", bold_body), Paragraph("<b>2025</b>", ParagraphStyle('R', parent=bold_body, alignment=2))],
        [Paragraph("<i>Project Manager & Developer</i> — React 19, Tailwind CSS, SQL, Trello", body_style), Paragraph("", body_style)],
        [Paragraph("• Broke down feature requirements into weekly sprints on Trello and led team check-ins to unblock hurdles.<br/>• Built interactive budget calculation components and authored complete user guides.", body_style), Paragraph("", body_style)]
    ]
    t1 = Table(p1, colWidths=[400, 132])
    t1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('SPAN', (0,2), (1,2)), ('PADDING', (0,0), (-1,-1), 1)]))
    story.append(t1)
    story.append(Spacer(1, 8))

    # Project 2
    p2 = [
        [Paragraph("<b>Task & Sprint Coordination Workspace</b> (Productivity Engine)", bold_body), Paragraph("<b>2025</b>", ParagraphStyle('R', parent=bold_body, alignment=2))],
        [Paragraph("<i>Lead Engineer</i> — TanStack Start, Vite, React 19, Framer Motion, Tailwind CSS", body_style), Paragraph("", body_style)],
        [Paragraph("• Designed a modern web workspace featuring dynamic 4-column Kanban boards and sprint velocity trackers.<br/>• Implemented one-click phase transitions and priority status card management.", body_style), Paragraph("", body_style)]
    ]
    t2 = Table(p2, colWidths=[400, 132])
    t2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('SPAN', (0,2), (1,2)), ('PADDING', (0,0), (-1,-1), 1)]))
    story.append(t2)
    story.append(Spacer(1, 8))

    # Project 3
    p3 = [
        [Paragraph("<b>AI Developer Workspace & Workflow Suite</b> (Developer Tools)", bold_body), Paragraph("<b>2025</b>", ParagraphStyle('R', parent=bold_body, alignment=2))],
        [Paragraph("<i>Creator</i> — TypeScript, Node.js, AI Tooling, Vite, Tailwind CSS", body_style), Paragraph("", body_style)],
        [Paragraph("• Created developer environment designed to assist code analysis and automate repetitive refactoring workflows.<br/>• Integrated syntax-highlighted code output terminal with clipboard integration.", body_style), Paragraph("", body_style)]
    ]
    t3 = Table(p3, colWidths=[400, 132])
    t3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('SPAN', (0,2), (1,2)), ('PADDING', (0,0), (-1,-1), 1)]))
    story.append(t3)

    doc.build(story)

if __name__ == '__main__':
    os.makedirs('public', exist_ok=True)
    build_pdf('public/cv.pdf')
    build_pdf('public/Pradip_Pantha_CV.pdf')
    print("PDF CV generated successfully!")
