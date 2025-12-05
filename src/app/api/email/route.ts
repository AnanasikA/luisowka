import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // ważne dla nodemailer na Vercelu
export const dynamic = 'force-dynamic';

// Prosty GET – żeby pod /api/email nie było 404 przy wejściu z przeglądarki
export async function GET() {
  return NextResponse.json({ ok: true, message: 'Email API działa (GET)' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name: string = body.name || body['Imię i nazwisko'] || '';
    const email: string = body.email || body['E-mail'] || '';
    const message: string = body.message || body['Wiadomość'] || '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || '465');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to = process.env.SMTP_TO || user;

    if (!host || !port || !user || !pass || !to) {
      console.error('Brak wymaganych zmiennych SMTP w env');
      return NextResponse.json(
        { ok: false, error: 'SMTP_CONFIG_MISSING' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = SSL
      auth: { user, pass },
    });

    const text = `
Nowa wiadomość z formularza Luisówka:

Imię i nazwisko: ${name}
E-mail: ${email}

Treść wiadomości:
${message}
    `.trim();

    await transporter.sendMail({
      from,
      to,
      replyTo: email || from,
      subject: 'Nowa wiadomość z formularza kontaktowego – Luisówka',
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Błąd wysyłania maila:', err);
    return NextResponse.json(
      { ok: false, error: 'EMAIL_ERROR' },
      { status: 500 }
    );
  }
}
