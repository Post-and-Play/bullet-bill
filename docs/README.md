<<<<<<< HEAD
# CÃ³digo de integraÃ§Ã£o com o Backend e Dialogs

Utilizamos a biblioteca "axios" para realizar a comunicaÃ§Ã£o com o backend. As requisiÃ§Ãµes podem ser definidas com seu 
respectivo mÃ©todo, sendo: GET, POST, PUT ou DELETE.
Foram adicionados os arquivos e pastas:

### contÃ©m o cÃ³digo do mecanismo de comunicaÃ§Ã£o com o Backend e o cÃ³digo com funÃ§Ãµes de autorizaÃ§Ã£o e validaÃ§Ã£o do usuÃ¡rio
=======
# Código de integração com o Backend e Dialogs

Utilizamos a biblioteca "axios" para realizar a comunicação com o backend. As requisições podem ser definidas com seu 
respectivo método, sendo: GET, POST, PUT ou DELETE.
Foram adicionados os arquivos e pastas:

### contém o código do mecanismo de comunicação com o Backend e o código com funções de autorização e validação do usuário
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
 - Pasta src/services
	- Api.js
	- Auth.js

<<<<<<< HEAD
### cÃ³digo para criaÃ§Ã£o de forms modals, para facilitar o envio de notificaÃ§Ãµes para o usuÃ¡rio atravÃ©s de dialogs.
=======
### código para criação de forms modals, para facilitar o envio de notificações para o usuário através de dialogs.
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
 - src/components
	- Modals.js
	- Modals.css

<<<<<<< HEAD
### arquivos de mÃ­dia para composiÃ§Ã£o dos dialogs
=======
### arquivos de mídia para composição dos dialogs
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
 - src/image
	- check.png
	- critical.png
	- question.png
	- warning.png

# Exemplo de chamada ao backend

<<<<<<< HEAD
Para realizar chamadas em alguma pÃ¡gina do frontend, primeiro deve-se realizar a iportaÃ§Ã£o:
=======
Para realizar chamadas em alguma página do frontend, primeiro deve-se realizar a iportação:
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

``` javascript
import api from './services/Api';
```

<<<<<<< HEAD
Exempo de rqeuisiÃ§Ã£o POST ( Quando envia dados )
=======
Exempo de rqeuisição POST ( Quando envia dados )
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8


```javascript
async function(){

<<<<<<< HEAD
    //Deve usar uma funÃ§Ã£o assÃ­ncrona
=======
    //Deve usar uma função assíncrona
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

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
<<<<<<< HEAD
                    'NÃ£o foi possÃ­vel criar a conta!',
=======
                    'Não foi possível criar a conta!',
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
<<<<<<< HEAD
# FunÃ§Ã£o de autorizaÃ§Ã£o do usuÃ¡rio

Para verificar se o usuÃ¡rio estÃ¡ logado e autorizado para acessa, deve-se chamar as funÃ§Ãµes do pacote Auth.js
=======
# Função de autorização do usuário

Para verificar se o usuário está logado e autorizado para acessa, deve-se chamar as funções do pacote Auth.js
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

``` javascript
import { getAuth } from './services/Auth';
```

<<<<<<< HEAD
A funÃ§Ã£o getAuth verifica se o usuÃ¡rio estÃ¡ com uma sessÃ£o ativa atravÃ©s do token de validaÃ§Ã£o fornecido ao realizar login.
Geralmente podemos realiazar a verificaÃ§Ã£o em qualquer momento. Veja um exemplo inserido no carregamento da pÃ¡gina:
=======
A função getAuth verifica se o usuário está com uma sessão ativa através do token de validação fornecido ao realizar login.
Geralmente podemos realiazar a verificação em qualquer momento. Veja um exemplo inserido no carregamento da página:
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

```javascript
onLoad={() => getAuth()}
```
<<<<<<< HEAD
Se o usuÃ¡rio nÃ£o estiver validado a funÃ§Ã£o forÃ§a o retorno para a tela de login.
=======
Se o usuário não estiver validado a função força o retorno para a tela de login.
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8



# criar dialogs boxes com mensagens

O pacote Modals.js fornece 3 modelos de Dialogs. 
<<<<<<< HEAD
1 - Modal personalizado, que permite incluir vÃ¡rios botÃµes e conteÃºdos dinÃ¢micos no carregamento
2 - Dialogobox de mensagem, com opcionais de tipo de mensagens: Sucesso, Pergunta, AtenÃ§Ã£o e Erro
=======
1 - Modal personalizado, que permite incluir vários botões e conteúdos dinâmicos no carregamento
2 - Dialogobox de mensagem, com opcionais de tipo de mensagens: Sucesso, Pergunta, Atenção e Erro
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
3 - Modal de carregamento ( spinner )

Para criar uma mensgem:

```javascript

 import { Modals } from './components/Modals';

<<<<<<< HEAD
 // Busca o elemento root da pÃ¡gina
 const root = document.getElementById('root');

 // Cria uma instÃ¢ncia da classe Modals.
=======
 // Busca o elemento root da página
 const root = document.getElementById('root');

 // Cria uma instância da classe Modals.
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
 const modals = new Modals();

 // Verifica se o elemento roo existe
 if (root) {

<<<<<<< HEAD
        // Chama a funÃ§Ã£o de msgbox
=======
        // Chama a função de msgbox
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
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
