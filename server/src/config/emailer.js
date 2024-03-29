const nodemailer = require('nodemailer');
const path = require('path');

const createTrans = () => {
    const passGmail = process.env.GMAIL_PASS
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "adnfetalmaterno@gmail.com",
            pass: passGmail
        }
    });
    return transport;
}

const sendMail = async (email, link) => {
    const transporter = createTrans();
    await transporter.sendMail({
        from: '"ADN Fetal en Sangre Materna" <adnfetalmaterno@gmail.com>',
        to: `${email}`,
        subject: '🧐 Recuperación de contraseña ⚠',
        html: `<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <title></title>
            <style>
                table,
                td,
                div,
                h1,
                p {
                    font-family: Arial, sans-serif;
                }
        
                @media screen and (max-width: 530px) {
                    .unsub {
                        display: block;
                        padding: 8px;
                        margin-top: 14px;
                        border-radius: 6px;
                        background-color: #555555;
                        text-decoration: none !important;
                        font-weight: bold;
                    }
        
                    .col-lge {
                        max-width: 100% !important;
                    }
                }
        
                @media screen and (min-width: 531px) {
                    .col-sml {
                        max-width: 27% !important;
                    }
        
                    .col-lge {
                        max-width: 73% !important;
                    }
                }
            </style>
        </head>
        
        <body style="margin:0;padding:0;word-spacing:normal;background-color:#a7a7a7;">
            <div role="article" aria-roledescription="email" lang="en"
                style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#a7a7a7;">
                <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                    <tr>
                        <td align="center" style="padding:0;">
                            <table role="presentation"
                                style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                                <tr>
                                    <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                                        <a href="#" style="text-decoration:none;"><img src="cid:adnImage"
                                                alt="Logo"
                                                style="width: 300px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:35px 30px 0px 30px;background-color:#ffffff;">
                                        <h1
                                            style="margin-top:0;font-size:24px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;text-align:center">
                                            ¡Wow! Parece que se te ha olvidado tu contraseña </h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="padding:0px 30px 0px 30px;font-size:0;background-color:#ffffff;border-bottom:1px solid #f0f0f5;border-color:rgba(201,201,207,.35);">
                                        <div class="col-sml"
                                            style="display:inline-block;width:100%;max-width:145px;text-align:left;font-family:Arial,sans-serif;font-size:14px;color:#363636;">
                                            <img src="cid:LogoHelmet" width="115" alt=""
                                                style="width:115px;max-width:80%;margin-bottom:20px;">
                                        </div>
                                        <div class="col-lge"
                                            style="display:inline-block;width:100%;max-width:395px;vertical-align:top;padding-bottom:20px;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                                            <p style="margin-top:0;margin-bottom:12px;">No te preocupes, sabemos que a veces nos
                                                olvidamos de las cosas por el dia a dia que llevamos, por eso como equipo hemos
                                                pensado en esas personas olvidadizas.</p>
                                            <p>Para restaurar el acceso a la plataforma dirigite al botón que tienes aquí abajo.
                                                Solo podrás recuperar una sola vez tu contraseña con el link actual. </p>
                                            <p>¡Aparte por tu seguridad el link estará habilitado solo por 15 minutos, asi que
                                                date prisa!</p>
                                            <p style="margin:0;"><a href='${link}'
                                                    style="background: #ED6D1A; text-decoration: none; padding: 10px 25px; color: #ffffff; border-radius: 4px; display:inline-block; mso-padding-alt:0;text-underline-color:#E97D36">Recuperar contraseña</span></a></p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="margin-bottom:30px;padding:30px;text-align:center;font-size:12px;background-color:#00517c;color:#cccccc;">
                                        <p style="margin:0 0 8px 0;"><a href="#" style="text-decoration:none;"><img
                                                    src="cid:getiImage" width="250" alt="f"
                                                    style="display:inline-block;color:#cccccc;"></a> <a href="#"
                                                style="text-decoration:none;"><img src="cid:uscoImage" width="200" alt="t" style="display:inline-block;color:#cccccc;"></a></p>
                                        <p style="margin:0;font-size:14px;line-height:20px;">&reg; Todos los derechos
                                            reservados, 2022</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
        
        </html>`,
        attachments: [
            {
                filename: 'adnImage.png',
                path: path.join(__dirname, '../images/adnImage.png'),
                cid: 'adnImage'
            },
            {
                filename: 'LogoHelmet.png',
                path: path.join(__dirname, '../images/LogoHelmet.png'),
                cid: 'LogoHelmet'
            },
            {
                filename: 'getiImage.png',
                path: path.join(__dirname, '../images/getiImage.png'),
                cid: 'getiImage'
            },
            {
                filename: 'uscoImage.png',
                path: path.join(__dirname, '../images/uscoImage.png'),
                cid: 'uscoImage'
            }
        ]
    })
    return
}

const contactMail = async (nameUser, email, optionSelected, mensaje) => {
    const transporter = createTrans();
    await transporter.sendMail({
        from: `${email}`,
        to: 'adnfetalmaterno@gmail.com',
        subject: `🔥 ${optionSelected} de ${nameUser} ⚠`,
        text: `${mensaje} - Puedes contactarme al correro: ${email}`
    })
    return
}

exports.sendMail = (email, link) => sendMail(email, link);
exports.contactMail = (nameUser, email, optionSelected, mensaje) => contactMail(nameUser, email, optionSelected, mensaje);