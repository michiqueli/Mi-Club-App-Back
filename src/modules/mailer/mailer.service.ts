import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async registerEmail (name: string, email: string) {
    await this.mailerService.sendMail({
      from: `mensaje enviado por Peuma Limay`,
      to: email,
      subject: 'Bienvenidx a A.C.S.D Peuma Limay',
      text: 'Registro Realizado con exito',
      html: `
            <body
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f4f4f4;
            "
          >
            <div
              style="
                text-align: center;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                background-color: #fff;
              "
            >
            <h1 style="color: #cfbc11">Bienvenido a Peuma Limay</h1>
              <h2 style="color: #090f09">${name}</h2>
              <h2 style="color: #00cc22">Tu registro se completó con éxito</h2>
          
              <a href="https://www.google.com/" style="text-decoration: none">
                <button
                  style="
                    background-color: #fdd700;
                    color: #000000;
                    padding: 10px 20px;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                  "
                >
                  Ya puedes volver a la pagina del Club
                </button>
              </a>
            </div>
          </body>
                  `,
    });
  }
  catch(error: any) {
    console.log(error.message);
  }

  async offLineEmail  (name: string, email: string) {
    console.log("enviando mail...");
    try {
      await this.mailerService.sendMail({
        from: `mensaje enviado por Peuma Limay`,
        to: email,
        subject: "Usuario Desactivado",
        text: "Estas Fuera de Linea Porque has inflingido las normas del Sitio",
        html: `
        <body
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f4f4f4;
        "
      >
        <div
          style="
            text-align: center;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          "
        >
        <h1 style="color: #cfbc11">Lo sentimos mucho</h1>
          <h2 style="color: #090f09">${name}</h2>
          <h2 style="color: #00cc22">Tu Cuenta a sido inHabilita debido a que has infringido alguna norma del sitio</h2>
      
          <a href="https://www.google.com/" style="text-decoration: none">
            <button
              style="
                background-color: #fdd700;
                color: #000000;
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
              "
            >
              Dirigite a nuestro sitio y contactanos
            </button>
          </a>
        </div>
      </body>
              `,
      });
      console.log("mail enviado con exito");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async onLineEmail  (name: string, email: string) {
    console.log("enviando mail...");
    try {
      await this.mailerService.sendMail({
        from: `mensaje enviado por Peuma Limay`,
        to: email,
        subject: "Usuario Reactivado",
        text: "Estas en Linea de Nuevo, gracias por contactar a Peuma Limay",
        html: `
        <body
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f4f4f4;
        "
      >
        <div
          style="
            text-align: center;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          "
        >
        <h1 style="color: #cfbc11">Gracias por Contactarnos</h1>
          <h2 style="color: #090f09">${name}</h2>
          <h2 style="color: #00cc22">Estas de nuevo en Linea, gracias por contactar a Peuma Limay</h2>
      
          <a href="https://www.google.com/" style="text-decoration: none">
            <button
              style="
                background-color: #fdd700;
                color: #000000;
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
              "
            >
              Dirigite a nuestro sitio y sigue disfrutando!!!
            </button>
          </a>
        </div>
      </body>
              `,
      });
      console.log("mail enviado con exito");
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
