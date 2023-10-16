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
