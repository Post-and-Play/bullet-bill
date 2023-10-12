<<<<<<< HEAD
# Código de integração com o Backend e Dialogs

Utilizamos a biblioteca "axios" para realizar a comunicação com o backend. As requisições podem ser definidas com seu 
respectivo método, sendo: GET, POST, PUT ou DELETE.
Foram adicionados os arquivos e pastas:

### contém o código do mecanismo de comunicação com o Backend e o código com funções de autorização e validação do usuário
 - Pasta src/services
	- Api.js
	- Auth.js

### código para criação de forms modals, para facilitar o envio de notificações para o usuário através de dialogs.
 - src/components
	- Modals.js
	- Modals.css

### arquivos de mídia para composição dos dialogs
 - src/image
	- check.png
	- critical.png
	- question.png
	- warning.png

# Exemplo de chamada ao backend

Para realizar chamadas em alguma página do frontend, primeiro deve-se realizar a iportação:

``` javascript
import api from './services/Api';
```

Exempo de rqeuisição POST ( Quando envia dados )


```javascript
async function(){

    //Deve usar uma função assíncrona

    await api.post('./api/users', {
            name: nomeInput + ' ' + sobrenomeInput,
            user_name: nomeUserInput,
            password: senhaInput,
            mail: emailInput,
            birth_date: anoInput + '-' + mesInput + '-' + diaInput 
        }).then(function (response) {
            console.log(response);

            if (root) {
                modals.htmlDialog(
                    root,
                    'Sua conta foi criada com sucesso!',
                    modals.msgboxButtons.okOnly,
                    modals.msgboxIcons.check,
                    'Mensagem!',
                    {
                        ok: (evt) => {
                            navigate('/');
                        }
                    });
            }
                       
        }).catch(function (error) {
            console.log(error);

            if (root) {
                modals.htmlDialog(
                    root,
                    'Não foi possível criar a conta!',
                    modals.msgboxButtons.okOnly,
                    modals.msgboxIcons.critical,
                    'Mensagem!',
                    {
                        ok: (evt) => {

                        }
                    });
            }

        });

}
```
# Função de autorização do usuário

Para verificar se o usuário está logado e autorizado para acessa, deve-se chamar as funções do pacote Auth.js

``` javascript
import { getAuth } from './services/Auth';
```

A função getAuth verifica se o usuário está com uma sessão ativa através do token de validação fornecido ao realizar login.
Geralmente podemos realiazar a verificação em qualquer momento. Veja um exemplo inserido no carregamento da página:

```javascript
onLoad={() => getAuth()}
```
Se o usuário não estiver validado a função força o retorno para a tela de login.



# criar dialogs boxes com mensagens

O pacote Modals.js fornece 3 modelos de Dialogs. 
1 - Modal personalizado, que permite incluir vários botões e conteúdos dinâmicos no carregamento
2 - Dialogobox de mensagem, com opcionais de tipo de mensagens: Sucesso, Pergunta, Atenção e Erro
3 - Modal de carregamento ( spinner )

Para criar uma mensgem:

```javascript

 import { Modals } from './components/Modals';

 // Busca o elemento root da página
 const root = document.getElementById('root');

 // Cria uma instância da classe Modals.
 const modals = new Modals();

 // Verifica se o elemento roo existe
 if (root) {

        // Chama a função de msgbox
        modals.htmlDialog(
            root,
            'Sua mensagem!',
            modals.msgboxButtons.okOnly,
            modals.msgboxIcons.check,
            'Mensagem!',
            {
                ok: (evt) => {
                    navigate('/');
                }
            });
    }

```
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
