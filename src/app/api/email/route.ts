import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      type = 'contact',
      name,
      email,
      message,
      checkIn,
      checkOut,
      guests,
    } = body;

    // Sprawdzenie podstawowych danych
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: 'MISSING_FIELDS' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Konfiguracja SMTP – CyberFolks
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // port 465 = SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject =
      type === 'reservation'
        ? 'Nowe zapytanie o rezerwację – Luisówka'
        : 'Nowa wiadomość z formularza kontaktowego – Luisówka';

    // Składamy treść maila
    const lines: string[] = [];

    lines.push(`Typ wiadomości: ${type === 'reservation' ? 'Rezerwacja' : 'Kontakt'}`);
    lines.push(`Imię i nazwisko: ${name}`);
    lines.push(`E-mail: ${email}`);

    if (checkIn || checkOut || guests) {
      lines.push('');
      lines.push('Szczegóły pobytu:');
      if (checkIn) lines.push(`Przyjazd: ${checkIn}`);
      if (checkOut) lines.push(`Wyjazd: ${checkOut}`);
      if (guests) lines.push(`Liczba gości: ${guests}`);
    }

    lines.push('');
    lines.push('Wiadomość:');
    lines.push(message as string);

    await transporter.sendMail({
      from: process.env.SMTP_FROM, // np. "Luisówka <kontakt@luisowka.com>"
      to: process.env.SMTP_TO,     // na jaki adres wysyłamy
      replyTo: email as string,    // gdy klikniesz "Odpowiedz", pójdzie do klienta
      subject,
      text: lines.join('\n'),
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('SMTP error:', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'EMAIL_ERROR' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
