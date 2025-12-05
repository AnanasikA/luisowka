// src/app/api/email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type EmailPayload = {
  type?: 'contact' | 'reservation';
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export async function GET() {
  return NextResponse.json({ ok: true, message: 'Email API działa (GET)' });
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as EmailPayload;

    const type = data.type ?? 'contact';
    const name = (data.name ?? '').toString().trim();
    const email = (data.email ?? '').toString().trim();
    const phone = data.phone ? data.phone.toString().trim() : '';
    const message = (data.message ?? '').toString().trim();

    // Minimalna walidacja – tylko imię + mail
    if (!name || !email) {
      return NextResponse.json(
        {
          ok: false,
          error: 'VALIDATION_ERROR',
          message: 'Podaj imię i nazwisko oraz adres e-mail.',
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true, // SSL/TLS – tak jak w Roundcube
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject =
      type === 'reservation'
        ? 'Nowe zapytanie o dostępność – Luisówka'
        : 'Nowa wiadomość z formularza kontaktowego – Luisówka';

    const lines: string[] = [
      `Typ wiadomości: ${
        type === 'reservation' ? 'Zapytanie o dostępność' : 'Kontakt'
      }`,
      '',
      `Imię i nazwisko: ${name}`,
      `E-mail: ${email}`,
    ];

    if (phone) {
      lines.push(`Telefon: ${phone}`);
    }

    lines.push('', 'Treść wiadomości:', message || '(brak treści)');

    await transporter.sendMail({
      from: `"Luisówka – formularz" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject,
      text: lines.join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('EMAIL_ERROR', err);
    return NextResponse.json(
      {
        ok: false,
        error: 'EMAIL_ERROR',
        message: 'Wystąpił błąd podczas wysyłania wiadomości.',
      },
      { status: 500 }
    );
  }
}
