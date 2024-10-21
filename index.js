import express from 'express';
const PORT = 3000;

const app = express();

const style = `
  <style>
    body{
      text-align: center;
    }

    table, th, td {
      border: 1px solid black;
    }

    table {
      border-collapse: collapse;
      margin: auto;
    }

    th, td{
      padding: 10px;
      text-align: center;
      width: 120px;
    }

    th{
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #DCEBE6;
    }

    tr:hover:nth-child(1n + 2) {
      background-color: #085F63;
      color: #fff;
    }
  </style>
`;

app.get('/', (req, res) => {
  const url = req.query;

  let codHTML = `
      <!DOCTYPE html>
        <html lang="pt-br">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Exercicio Tabuada</title>
          ${style}
        </head>
        <body>
    `;

  if (!url.tabuada) {
    res.status(200).send(
      (codHTML += `
              <h1>Exercicio Tabuada</h1>
              <p>
                Informe na url a tabuada desejada. 
              </p>
              <p>
                Exemplo: <code>https://exercicio-tabuada.vercel.app/?tabuada=7&sequencia=10</code> 
              </p>
              <p>Dessa maneira apresentará uma tabuada do número: "7" multiplicado do 0 ao 10</p>
            <footer>
			        <p>Desenvolvido por
                <a href="https://www.github.com/vmedeir0s/" target="_blank"
                  >Vinicius de Medeiros</a>👨‍💻
              </p>
            </footer>
        </body>
      </html>

      `)
    );
  } else {
    const { tabuada, sequencia = 10 } = req.query;

    if (parseInt(tabuada) > 0) {
      codHTML += `
      <div class="container">
        <h1>Tabuada do ${tabuada}</h1>
        <table>
          <thead>
            <tr>
              <th>Multipação</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
      `;

      for (let i = 0; i <= sequencia; i++) {
        codHTML += `
        <tr>
          <td>${tabuada} x ${i}</td>
          <td>${tabuada * i}</td>
        </tr>
        `;
      }

      codHTML += `
              </tbody>
            </table>
            
      `;
    } else {
      codHTML += ` 
          <h1>Informe corretamente um número positivo maior que 0</h1>
      `;
    }

    codHTML += `
            </div>
            <footer>
			        <p>Desenvolvido por
                <a href="https://www.github.com/vmedeir0s/" target="_blank"
                  >Vinicius de Medeiros</a>👨‍💻
              </p>
            </footer>
        </body>
      </html>
    `;

    res.status(200).send(codHTML);
  }
});

app.listen(PORT, () => console.log(`Aplicação rodando na porta: ${PORT}...`));
