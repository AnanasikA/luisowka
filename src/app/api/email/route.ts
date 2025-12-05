import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { type, name, email, phone, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let subject: string;
    let text: string;

    if (type === 'reservation') {
      subject = 'Nowe zapytanie o dostępność – Luisówka';
      text = `Typ wiadomości: Zapytanie o dostępność

Imię i nazwisko: ${name}
E-mail: ${email}
Telefon: ${phone || '-'}
Treść zapytania:
${(message || '').trim()}
`;
    } else {
      subject = 'Nowa wiadomość ze strony Luisówka';
      text = `Typ wiadomości: Kontakt

Imię i nazwisko: ${name}
E-mail: ${email}
Treść wiadomości:
${(message || '').trim()}
`;
    }

    const mailOptions = {
      from: `"Luisówka – strona www" <${
        process.env.SMTP_FROM || process.env.SMTP_USER
      }>`,
      to: process.env.SMTP_TO,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('EMAIL_ERROR', err);

    const message =
      err instanceof Error ? err.message : 'Unknown error';

    return NextResponse.json(
      {
        ok: false,
        error: 'EMAIL_ERROR',
        details: message,
      },
      { status: 500 }
    );
  }
}
