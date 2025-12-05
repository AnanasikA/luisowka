import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  SMTP_TO,
} = process.env;

// Prosty test GET – już widziałaś że działa
export async function GET() {
  return NextResponse.json({ ok: true, message: 'Email API działa (GET)' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('EMAIL API body:', body);

    const { type, name, email, message } = body || {};

    // Walidacja minimalna
    if (!type || !name || !email || !message) {
      console.warn('Brak wymaganych pól w body:', body);
      return NextResponse.json(
        { ok: false, error: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    // Transporter SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 465),
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Wysyłka maila
    await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      replyTo: email,
      subject:
        type === 'contact'
          ? 'Nowa wiadomość z formularza kontaktowego – Luisówka'
          : 'Nowa wiadomość ze strony Luisówka',
      text: `
Typ wiadomości: ${type}

Imię i nazwisko: ${name}
E-mail: ${email}

Treść wiadomości:
${message}
      `.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('EMAIL_ERROR', err);
    return NextResponse.json(
      {
        ok: false,
        error: 'EMAIL_ERROR',
        details: err?.message ?? 'Unknown error',
      },
      { status: 500 }
    );
  }
}
