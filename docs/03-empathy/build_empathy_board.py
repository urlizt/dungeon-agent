from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A3, landscape
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib.units import mm


OUT = "output/pdf/pinchy-empathy-research-board.pdf"
W, H = landscape(A3)


def wrap(text, font, size, width):
    words = text.split()
    lines, line = [], ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if stringWidth(candidate, font, size) <= width:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_card(c, x, y, w, h, title, colour, items, subtitle=None):
    c.setFillColor(HexColor("#FFFFFF"))
    c.setStrokeColor(HexColor("#D8DEE9"))
    c.roundRect(x, y, w, h, 10, fill=1, stroke=1)
    c.setFillColor(colour)
    c.roundRect(x, y + h - 38, w, 38, 10, fill=1, stroke=0)
    c.rect(x, y + h - 38, w, 10, fill=1, stroke=0)
    c.setFillColor(HexColor("#172033"))
    c.setFont("Helvetica-Bold", 13)
    c.drawString(x + 14, y + h - 24, title)
    cursor = y + h - 54
    if subtitle:
        c.setFillColor(HexColor("#4B5563"))
        c.setFont("Helvetica-Oblique", 8.4)
        for line in wrap(subtitle, "Helvetica-Oblique", 8.4, w - 28):
            c.drawString(x + 14, cursor, line)
            cursor -= 10
        cursor -= 3
    c.setFillColor(HexColor("#1F2937"))
    c.setFont("Helvetica", 9.2)
    for item in items:
        lines = wrap(item, "Helvetica", 9.2, w - 42)
        if cursor - (len(lines) * 11) < y + 12:
            break
        c.setFillColor(HexColor("#475569"))
        c.circle(x + 19, cursor + 3, 1.8, fill=1, stroke=0)
        c.setFillColor(HexColor("#1F2937"))
        for index, line in enumerate(lines):
            c.drawString(x + 28, cursor, line)
            cursor -= 11
        cursor -= 5


c = canvas.Canvas(OUT, pagesize=landscape(A3))
c.setTitle("Pinchy on Pi - Empathy research board")
c.setFillColor(HexColor("#F7F8FC"))
c.rect(0, 0, W, H, fill=1, stroke=0)

margin = 18 * mm
c.setFillColor(HexColor("#172033"))
c.setFont("Helvetica-Bold", 22)
c.drawString(margin, H - 31 * mm, "Pinchy on Pi - Empathy research")
c.setFillColor(HexColor("#475569"))
c.setFont("Helvetica", 10)
c.drawString(margin, H - 38 * mm, "Trust, access and control | survey (n=28), six interviews and looking-sideways research")
c.setStrokeColor(HexColor("#CBD5E1"))
c.line(margin, H - 43 * mm, W - margin, H - 43 * mm)

gap = 12
card_w = (W - (2 * margin) - (2 * gap)) / 3
top_h = 318
bottom_h = 278
top_y = H - 53 * mm - top_h
bottom_y = 26 * mm

draw_card(
    c, margin, top_y, card_w, top_h, "1. Our focus", HexColor("#FDE68A"),
    [
        "How might we better understand what helps people feel informed, safe and in control when exploring personal AI tools?",
        "Stay in empathy: capture needs, behaviours and concerns before deciding on a solution.",
        "Evidence sources: survey, interviews and comparable services."
    ],
    "Working question, not a final problem definition."
)

draw_card(
    c, margin + card_w + gap, top_y, card_w, top_h, "2. Survey signals", HexColor("#FBCFE8"),
    [
        "26 of 28 respondents had used chat-based AI; 21 said they use AI regularly.",
        "18 wanted a plain-language explanation of what AI can access.",
        "12 wanted a safe way to try AI with limited permissions; 12 wanted clear privacy, data-use and cost information.",
        "17 saw value in learning and study support; 16 selected AI literacy; 8 selected accessibility support.",
        "Comment: 'The need to fact check AI responses should be more prominently stressed.'"
    ],
    "Numbers show patterns, not conclusions."
)

draw_card(
    c, margin + 2 * (card_w + gap), top_y, card_w, top_h, "3. Interview signals", HexColor("#BFDBFE"),
    [
        "Gus: technically experienced, but wants strong constraints and clear consequences before access.",
        "Layah: enterprise AI feels more comfortable than personal or financial access.",
        "Brody: AI is woven into school, gaming and hobbies; security discussion is educational.",
        "Kay and Emmy: a trusted, more technical person can be part of the safety experience.",
        "Donna: workplace training and guardrails build confidence; existing assistants feel lower effort than building an agent."
    ],
    "Six short interviews, about 10 minutes each."
)

draw_card(
    c, margin, bottom_y, card_w, bottom_h, "4. Looking sideways", HexColor("#BBF7D0"),
    [
        "Slack separates what an app can view from what it can do.",
        "Google separates app access from agent access and explains what stops working after removal.",
        "Android offers 'only this time' and 'only while using the app.'",
        "TrueLayer explains purpose, data, duration and revocation for open-banking consent.",
        "Apple shows after-the-fact access activity; Family Link supports trusted helpers."
    ],
    "Comparable patterns, not product recommendations."
)

draw_card(
    c, margin + card_w + gap, bottom_y, card_w, bottom_h, "5. Emerging themes", HexColor("#DDD6FE"),
    [
        "Trust changes with context: work AI can feel safer than personal AI.",
        "Access is the concern point: search and drafting feel different from reading, changing or sending.",
        "People want consequences explained: what can it access, do, change and break?",
        "Confidence and frequency of use do not always match.",
        "Start small, make access reversible and show what happened afterwards.",
        "Trusted help and AI literacy matter alongside technical controls."
    ],
    "Early themes - test before treating as findings."
)

draw_card(
    c, margin + 2 * (card_w + gap), bottom_y, card_w, bottom_h, "6. Questions to test", HexColor("#FED7AA"),
    [
        "What wording explains the consequence of enabling a skill without overwhelming people?",
        "Which access types feel acceptable first: files, calendar, email, messages, payments or home devices?",
        "Would read-only, temporary or 'try safely' modes reduce concern?",
        "What activity should be visible after access is granted?",
        "When do people want a trusted person involved, and what should they be able to see or approve?",
        "What makes enterprise AI feel safer than personal AI?"
    ],
    "Open questions, not proposed features."
)

c.setFillColor(HexColor("#64748B"))
c.setFont("Helvetica", 7.6)
c.drawRightString(W - margin, 11 * mm, "Source: Pinchy on Pi empathy-stage research, October 2026")
c.save()
