import nodemailer from "nodemailer";

function transporter() {
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  return nodemailer.createTransport({
    host, port, secure: port === 465,
    auth: { user, pass },
  });
}

type WelcomeEmailParams = {
  to: string;            // адрес получателя
  email: string;         // логин
  password: string;      // временный пароль
  expiresAt?: Date;      // опционально — дата конца доступа
};

export async function sendWelcomeStudentEmail({
  to, email, password, expiresAt,
}: WelcomeEmailParams) {
  const from = process.env.MAIL_FROM || "Prodriver247 <no-reply@prodriver247.de>";
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const loginUrl = `${base}/login`;

  const expiresStr = expiresAt
    ? new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }).format(expiresAt)
    : null;

  const subject = "Ваш доступ в личный кабинет — Prodriver247";

  // текстовая версия (fallback)
  const text = [
    "Добро пожаловать в Prodriver247!",
    "",
    "Мы создали для вас доступ к личному кабинету.",
    `Логин (email): ${email}`,
    `Пароль: ${password}`,
    "",
    "Важно: при первом входе смените пароль в профиле.",
    expiresStr ? `Доступ действует до: ${expiresStr}` : "",
    `Войти: ${loginUrl}`,
    "",
    "Если вы не запрашивали доступ — проигнорируйте письмо.",
  ].filter(Boolean).join("\n");

  // HTML версия
  const html = `
  <!doctype html>
  <html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>${subject}</title>
    <!-- preheader -->
    <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden;">
      Доступ создан. Логин и временный пароль внутри.
    </span>
  </head>
  <body style="margin:0; padding:0; background:#0f0f10; font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; color:#fff;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#0f0f10; padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:620px;">
            <!-- Header -->
            <tr>
              <td style="padding:12px 0 22px; text-align:center;">
                <div style="display:inline-flex; align-items:center; gap:10px;">
                  <img src="${base}/Logo.svg" width="46" height="44" alt="Prodriver247" style="display:block;" />
                  <div style="line-height:1;">
                    <div style="font-weight:800; font-size:18px; letter-spacing:.2px;">Prodriver247</div>
                    <div style="opacity:.7; font-size:12px;">Fahrschule Albrecht</div>
                  </div>
                </div>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td style="background:#141415; border:1px solid rgba(255,255,255,.08); border-radius:18px; padding:28px;">
                <h1 style="margin:0 0 6px; font-size:22px; line-height:1.25; font-weight:800; letter-spacing:.2px;">Доступ к личному кабинету</h1>
                <p style="margin:0 0 14px; color:rgba(255,255,255,.80);">
                  Мы создали для вас учётную запись. Используйте данные ниже, чтобы войти, и <b>сразу смените пароль</b> в профиле.
                </p>

                <!-- Credentials box -->
                <div style="margin:16px 0 18px; background:#201116; border:1px solid rgba(231,21,68,.65); box-shadow:0 10px 24px rgba(231,21,68,.25); border-radius:14px; padding:16px;">
                  <div style="font-size:12px; letter-spacing:.06em; text-transform:uppercase; opacity:.8; margin-bottom:6px;">Данные для входа</div>
                  <div style="display:flex; gap:12px; flex-wrap:wrap;">
                    <div style="flex:1 1 240px; background:#0f0f10; border-radius:10px; padding:10px 12px;">
                      <div style="opacity:.6; font-size:12px; margin-bottom:4px;">Email</div>
                      <div style="font-family:ui-monospace, Menlo, Consolas, monospace; font-size:14px;">${email}</div>
                    </div>
                    <div style="flex:1 1 160px; background:#0f0f10; border-radius:10px; padding:10px 12px;">
                      <div style="opacity:.6; font-size:12px; margin-bottom:4px;">Пароль</div>
                      <div style="font-family:ui-monospace, Menlo, Consolas, monospace; font-size:14px;">${password}</div>
                    </div>
                  </div>
                  ${expiresStr ? `
                  <div style="margin-top:10px; font-size:12.5px; color:#ffdde5;">
                    Доступ активен до: <b>${expiresStr}</b>
                  </div>
                  ` : "" }
                </div>

                <!-- CTA -->
                <div style="text-align:center; margin:18px 0 6px;">
                  <a href="${loginUrl}" target="_blank"
                     style="display:inline-block; background:#E71544; color:#fff; text-decoration:none; font-weight:700;
                            padding:12px 22px; border-radius:12px; box-shadow:0 10px 24px rgba(231,21,68,.35);">
                    Войти в кабинет
                  </a>
                </div>

                <p style="margin:12px 0 0; color:rgba(255,255,255,.75); font-size:14px;">
                  Если возникнут вопросы — отвечайте на это письмо или напишите нам в WhatsApp.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="text-align:center; color:#9aa0a6; font-size:12px; padding:18px 8px;">
                © ${new Date().getFullYear()} Prodriver247 — Fahrschule Albrecht. Все права защищены.
                <br/>
                <a href="${base}/impressum" style="color:#9aa0a6; text-decoration:underline;">Impressum</a> ·
                <a href="${base}/agb" style="color:#9aa0a6; text-decoration:underline;">AGB</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;

  await transporter().sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}
