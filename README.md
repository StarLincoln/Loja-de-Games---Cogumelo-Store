# Loja de Games - Cogumelo Store
## Uma Loja de Jogos Online
![Diagrama de caso UML](https://i.ibb.co/k2wRznC4/Screenshot-2026-07-27-17-33-59.png)
### Equipe:
| Intregantes | Cargos |
| :---------- | -----: |
| Caio Lincoln Azevedo Noronha | Back-End |
| João Maria Silva Filho | Front-End |
| José Victor Bélem Almeida | Líder Técnico |
| Rafael Azafe Fonseca de Paiva | QA/Testes |

### Tecnologias Usadas
| Categoria | Tecnologias |
| :-------- | ----------: |
| BackEnd | TypeScritp, Express, Jest, Bcrypt, Session, Multer |
| FrontEnd | HTML, CSS, JavaScript, Multer |
| Banco de Dados | JSON |
| Controle de Versão | GitHub, Git |
| Gerenciamente de Pacotes | NPM |
| Ferramentas | VScode |

### Como Executar 
1- Primeiro devemos Clonar o Repositório:
```bash
git clone https://github.com/StarLincoln/Loja-de-Games---Cogumelo-Store
```
2- Entrando na Pasta do Projeto:
```bash
cd Loja-de-Games---Cogumelo-Store
```
3- Instalando as Dependências:
```bash
npm install
```
4- Executando o projeto:
```bash
npm run dev
```

### Tecnologias Utilizadas
| Áreas | Tecnoligas |
| :---------- | -----: |
| Front-End | HTML, CSS, JavaScript, EJS, Multer |
| Back-End | TypeScript, Express, JSON, Jest, Bcrypt |
| Banco de Dados | JSON |
| Versionamento | GitHub, Git |

### ScreenShots
<table align="center" border="0">
  <!-- Linha do Topo (2 imagens lado a lado) -->
  <tr>
    <td align="center">
      <img src="https://media.discordapp.net/attachments/1529937410744651876/1534278779365490960/Captura_de_tela_4-8-2026_161356_127.0.0.1.jpeg?ex=6a738bf6&is=6a723a76&hm=1c0de88ade4d5adc02bb3230ccaac387534575fdac3a542276e3159e4c84ef06&=&format=webp&width=1024&height=500" width="600" alt="Imagem Esquerda">
    </td>
    <td align="center">
      <img src="https://media.discordapp.net/attachments/1529937410744651876/1532797461507084471/Captura_de_tela_31-7-2026_1490_127.0.0.1.jpeg?ex=6a736e60&is=6a721ce0&hm=1d9268e51069894a1a4d8405d4ab0af01854e4eed588ae1b21f257afc045467c&=&format=webp&width=1024&height=500" width="600" alt="Imagem Direita">
    </td>
  </tr>
  <!-- Linha da Base (Apenas 1 imagem embaixo, centralizada) -->
  <tr>
    <td colspan="2" align="center">
      <img src="https://media.discordapp.net/attachments/1529937410744651876/1534278778933481593/Captura_de_tela_4-8-2026_161452_127.0.0.1.jpeg?ex=6a738bf6&is=6a723a76&hm=6be40ab04ab5e10ca864334426a04e0e698b513a7d9166e4b7141311325d8aa4&=&format=webp&width=1024&height=500" width="600" alt="Imagem de Baixo">
    </td>
  </tr>
</table>



### Tabela de Rotas
| Método | Rota | Descrição | Status |
| :-----: | :----: | :--------: | :-----: |
| GET | /api | Listar todos | 200 |
| GET | /api/:id | Buscar por ID | 200/404 |
| POST | /api/produtos | Criar Produto | 201/400 |
| PUT | /api/produtos/:id | Atualizar Produto | 200/500 |
| DELETE | /api/produtos/:id | Remover Produto | 200/400 |
| POST | /register | Registar | 201/400/409 |
| POST | /login | Login | 200/401 |
| POST | /logout | Logout | 200/500 |
