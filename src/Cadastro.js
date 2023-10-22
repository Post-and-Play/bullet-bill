import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../src/Cadastro.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar';
// i
import CloseIcon from '../src/icons/close.svg';

import api from './services/Api';
import { Modals } from './components/Modals';

const Cadastro = () => {
    const [nomeInput, setNomeInput] = useState('');
    const [sobrenomeInput, setSobrenomeInput] = useState('');
    const [nomeUserInput, setNomeUserInput] = useState('');
    const [diaInput, setDiaInput] = useState('');
    const [mesInput, setMesInput] = useState('');
    const [anoInput, setAnoInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [confirmEmailInput, setConfirmEmailInput] = useState('');
    const [senhaInput, setSenhaInput] = useState('');
    const [confirmSenhaInput, setConfirmSenhaInput] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [camposObrigatoriosPopup, setCamposObrigatoriosPopup] = useState(false);
    const [emailIgualPopup, setEmailIgualPopup] = useState(false);
    const [senhaIgualPopup, setSenhaIgualPopup] = useState(false);
    const [termosPopup, setTermosPopup] = useState(false);
    const [idadePopup, setIdadePopup] = useState(false);
    const [redirecionar, setRedirecionar] = useState(false);

    const [anoAtual] = useState(new Date().getFullYear());

    const navigate = useNavigate();

    const root = document.getElementById('root');
    const modals = new Modals();
    /* const loading = new modals.htmlLoading(root);*/

    const handleInputChange = (event, setInput) => {
        setInput(event.target.value);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleButtonClick = (e) => {
        const anoDigitado = parseInt(anoInput.trim());
        const maiorIdade = anoAtual - anoDigitado;

        if (nomeInput.trim() === '' || sobrenomeInput.trim() === '' ||
            nomeUserInput.trim() === '' || diaInput.trim() === '' ||
            anoInput.trim() === '' || emailInput.trim() === '' ||
            confirmEmailInput.trim() === '' || senhaInput.trim() === '' ||
            confirmSenhaInput.trim() === '') {
            e.preventDefault();
            setCamposObrigatoriosPopup(true);
            setTimeout(() => {
                setCamposObrigatoriosPopup(false);
            }, 3000);
        } else if (emailInput.trim() !== confirmEmailInput) {
            e.preventDefault();
            setEmailIgualPopup(true);
            setTimeout(() => {
                setEmailIgualPopup(false);
            }, 3000);
        } else if (senhaInput.trim() !== confirmSenhaInput) {
            e.preventDefault();
            setSenhaIgualPopup(true);
            setTimeout(() => {
                setSenhaIgualPopup(false);
            }, 3000);
        } else if (!isChecked) {
            e.preventDefault();
            setTermosPopup(true);
            setTimeout(() => {
                setTermosPopup(false);
            }, 3000);
        } else if (maiorIdade < 18) {
            e.preventDefault();
            setIdadePopup(true);
            setTimeout(() => {
                setIdadePopup(false);
            }, 3000);
        } else {
            e.preventDefault();
            creatUser();

        }
    };

    const handleBackClick = (e) => {
        navigate('/');
    };

    const [termsBox, setTermsBox] = useState(false);

    const handleClick = () => {
        setTermsBox(!termsBox);
    }

    const handleClose = () => {
        setTermsBox(false);
    }

    const creatUser = async () => {

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

    return (
        <div>
            <Navbar hideSearchbar={true} />
            <div className="cadastro__page-container">
                <form className='cadastro'>
                    <div className="cadastro__container">
                        <div className="cadastro__row-container">
                            <label className='cadastro__input-container'>
                                <p className='labelCadastro'>Nome</p>
                                <input className='inputCadastro' placeholder='Digite o seu primeiro nome' type="text" name="name" value={nomeInput} onChange={(e) => handleInputChange(e, setNomeInput)} />
                            </label>
                            <label className='cadastro__input-container'>
                                <p className='labelCadastro'>Sobrenome</p>
                                <input className='inputCadastro lastInput' placeholder='Digite o seu sobrenome' type="text" name="name" value={sobrenomeInput} onChange={(e) => handleInputChange(e, setSobrenomeInput)} />
                            </label>
                        </div>
                        <div className="cadastro__row-container">
                            <label className='cadastro__input-container'>
                                <p className='labelCadastro'>Nome de usuário</p>
                                <input className='inputCadastro' placeholder='Digite o seu nome de usuário' type="text" name="username" value={nomeUserInput} onChange={(e) => handleInputChange(e, setNomeUserInput)} />
                            </label>
                            <label className='cadastro__data-container'>
                                <p className='labelCadastro'>Data de nascimento</p>
                                <div className="cadastro__select-data-container">
                                    <input className='inputCadastro inputData inputDia' placeholder='1' type="number" name='dia' value={diaInput} min={"1"} max={"31"} onChange={(e) => handleInputChange(e, setDiaInput)} ></input>
                                    <select className='inputCadastro inputData inputMes' placeholder='Jan' name="mes" id="mes" value={mesInput} onChange={(e) => handleInputChange(e, setMesInput)}>
                                        <option value="1">Jan</option>
                                        <option value="2">Fev</option>
                                        <option value="3">Mar</option>
                                        <option value="4">Abr</option>
                                        <option value="5">Mai</option>
                                        <option value="6">Jun</option>
                                        <option value="7">Jul</option>
                                        <option value="8">Ago</option>
                                        <option value="9">Set</option>
                                        <option value="10">Out</option>
                                        <option value="11">Nov</option>
                                        <option value="12">Dez</option>
                                    </select>
                                    <input className='inputCadastro inputData inputAno lastInput' placeholder='2023' type="number" name='ano' value={anoInput} onChange={(e) => handleInputChange(e, setAnoInput)} min={1800}></input>
                                </div>
                            </label>
                        </div>
                        <div className="cadastro__row-container">
                            <label className='cadastro__input-container'>
                                <p className='labelCadastro'>Email</p>
                                <input className='inputCadastro' placeholder='Digite o  seu endereço de email' type="email" name="email" value={emailInput} onChange={(e) => handleInputChange(e, setEmailInput)} />
                            </label>
                            <label className='cadastro__input-container'>
                                <p className='labelCadastro'>Confirme seu email</p>
                                <input className='inputCadastro lastInput' placeholder='Confirme o seu endereço de email' type="email" name="emailC" value={confirmEmailInput} onChange={(e) => handleInputChange(e, setConfirmEmailInput)} />
                            </label>
                        </div>
                        <div className="cadastro__row-container">
                            <label className='cadastro__input-container'>
                                <p className='labelCadastro'>Senha</p>
                                <input className='inputCadastro' placeholder='Digite a sua senha' type="password" name="senha" value={senhaInput} onChange={(e) => handleInputChange(e, setSenhaInput)} />
                            </label>
                            <label className='cadastro__input-container'>
                                <p className='labelCadastro'>Confirme sua senha</p>
                                <input className='inputCadastro lastInput' placeholder='Confirme a sua senha' type="password" name="senhaC" value={confirmSenhaInput} onChange={(e) => handleInputChange(e, setConfirmSenhaInput)} />
                            </label>
                        </div>
                        <div className="row">
                            <label>
                                <input className='termos termosCB' type="checkbox" name="name" checked={isChecked} onChange={handleCheckboxChange} />
                                <p className='termos termosTexto' onClick={handleClick}>Li e aceito os <em className='termos termosDestaque'>termos de uso</em></p>
                            </label>
                        </div>
                        <div className="cadastro__botao-container">
                            <button className='botao cadastro__botao cadastro__btnVoltar' type="button" onClick={handleBackClick}>Voltar</button>
                            <button className='botao cadastro__botao cadastro__btnCadastrar' type="submit" value="Cadastrar" onClick={handleButtonClick} >Cadastrar</button>
                        </div>
                    </div>
                </form >
            </div>
            {termsBox &&
                <div className="container termosUso__container">
                    <div className="termosUso">
                        <h3>Termos de uso</h3>
                        <img className='closeBtn' src={CloseIcon} alt="Fechar" onClick={handleClose} />
                        {/* <input className='termosBox' type="text" name="termos" id="termos" readOnly /> */}
                        <p className='termosUso_texto'>
                            Esta política de Termos de Uso é válida a partir de Mar 2023.
                            TERMOS DE USO — Post and Playing
                            Post and Playing, pessoa jurídica de direito privado descreve, através deste documento, as regras de uso do site https://www.postandplaying.com.br e qualquer outro site, loja ou aplicativo operado pelo proprietário.
                            Ao navegar neste website, consideramos que você está de acordo com os Termos de Uso abaixo.
                            Caso você não esteja de acordo com as condições deste contrato, pedimos que não faça mais uso deste website, muito menos cadastre-se ou envie os seus dados pessoais.
                            Se modificarmos nossos Termos de Uso, publicaremos o novo texto neste website, com a data de revisão atualizada. Podemos alterar este documento a qualquer momento. Caso haja alteração significativa nos termos deste contrato, podemos informá-lo por meio das informações de contato que tivermos em nosso banco de dados ou por meio de notificações.
                            A utilização deste website após as alterações significa que você aceitou os Termos de Uso revisados. Caso, após a leitura da versão revisada, você não esteja de acordo com seus termos, favor encerrar o seu acesso.
                            Seção 1 - Usuário
                            A utilização deste website atribui de forma automática a condição de Usuário e implica a plena aceitação de todas as diretrizes e condições incluídas nestes Termos.
                            Seção 2 - Adesão em conjunto com a Política de Privacidade
                            A utilização deste website acarreta a adesão aos presentes Termos de Uso e a versão mais atualizada da Política de Privacidade de Post and Playing.
                            Seção 3 - Condições de acesso
                            Em geral, o acesso ao website da Post and Playing possui caráter gratuito e não exige prévia inscrição ou registro.
                            Contudo, para usufruir de algumas funcionalidades, o usuário poderá precisar efetuar um cadastro, criando uma conta de usuário com login e senha próprios para acesso.
                            É de total responsabilidade do usuário fornecer apenas informações corretas, autênticas, válidas, completas e atualizadas, bem como não divulgar o seu login e senha para terceiros.
                            Partes deste website oferecem ao usuário a opção de publicar comentários em determinadas áreas. Post and Playing não consente com a publicação de conteúdos que tenham natureza discriminatória, ofensiva ou ilícita, ou ainda infrinjam direitos de autor ou quaisquer outros direitos de terceiros.
                            A publicação de quaisquer conteúdos pelo usuário deste website, incluindo mensagens e comentários, implica em licença não-exclusiva, irrevogável e irretratável, para sua utilização, reprodução e publicação pela Post and Playing no seu website, plataformas e aplicações de internet, ou ainda em outras plataformas, sem qualquer restrição ou limitação.
                            Seção 4 - Cookies
                            Informações sobre o seu uso neste website podem ser coletadas a partir de cookies. Cookies são informações armazenadas diretamente no computador que você está utilizando. Os cookies permitem a coleta de informações tais como o tipo de navegador, o tempo despendido no website, as páginas visitadas, as preferências de idioma, e outros dados de tráfego anônimos. Nós e nossos prestadores de serviços utilizamos informações para proteção de segurança, para facilitar a navegação, exibir informações de modo mais eficiente, e personalizar sua experiência ao utilizar este website, assim como para rastreamento online. Também coletamos informações estatísticas sobre o uso do website para aprimoramento contínuo do nosso design e funcionalidade, para entender como o website é utilizado e para auxiliá-lo a solucionar questões relevantes.
                            Caso não deseje que suas informações sejam coletadas por meio de cookies, há um procedimento simples na maior parte dos navegadores que permite que os cookies sejam automaticamente rejeitados, ou oferece a opção de aceitar ou rejeitar a transferência de um cookie (ou cookies) específico(s) de um site determinado para o seu computador. Entretanto, isso pode gerar inconvenientes no uso do website.
                            As definições que escolher podem afetar a sua experiência de navegação e o funcionamento que exige a utilização de cookies. Neste sentido, rejeitamos qualquer responsabilidade pelas consequências resultantes do funcionamento limitado deste website provocado pela desativação de cookies no seu dispositivo (incapacidade de definir ou ler um cookie).
                            Seção 5 - Propriedade Intelectual
                            Todos os elementos de Post and Playing são de propriedade intelectual da mesma ou de seus licenciados. Estes Termos ou a utilização do website não concede a você qualquer licença ou direito de uso dos direitos de propriedade intelectual da Post and Playing ou de terceiros.
                            Seção 6 - Links para sites de terceiros
                            Este website poderá, de tempos a tempos, conter links de hipertexto que redirecionará você para sites das redes dos nossos parceiros, anunciantes, fornecedores etc. Se você clicar em um desses links para qualquer um desses sites, lembre-se que cada site possui as suas próprias práticas de privacidade e que não somos responsáveis por essas políticas. Consulte as referidas políticas antes de enviar quaisquer Dados Pessoais para esses sites.
                            Não nos responsabilizamos pelas políticas e práticas de coleta, uso e divulgação (incluindo práticas de proteção de dados) de outras organizações, tais como Facebook, Apple, Google, Microsoft, ou de qualquer outro desenvolvedor de software ou provedor de aplicativo, loja de mídia social, sistema operacional, prestador de serviços de internet sem fio ou fabricante de dispositivos, incluindo todos os Dados Pessoais que divulgar para outras organizações por meio dos aplicativos, relacionadas a tais aplicativos, ou publicadas em nossas páginas em mídias sociais. Nós recomendamos que você se informe sobre a política de privacidade e termos de uso de cada site visitado ou de cada prestador de serviço utilizado.
                            Seção 7 - Prazos e alterações
                            O funcionamento deste website se dá por prazo indeterminado.
                            O website no todo ou em cada uma das suas seções, pode ser encerrado, suspenso ou interrompido unilateralmente por Post and Playing, a qualquer momento e sem necessidade de prévio aviso.
                            Seção 8 - Dados pessoais
                            Durante a utilização deste website, certos dados pessoais serão coletados e tratados por Post and Playing e/ou pelos Parceiros. As regras relacionadas ao tratamento de dados pessoais de Post and Playing estão estipuladas na Política de Privacidade.
                            Seção 9 - Contato
                            Caso você tenha qualquer dúvida sobre os Termos de Uso, por favor, entre em contato pelo e-mail postandplaying@gmail.com.
                        </p>
                    </div>
                </div>
            }
            {camposObrigatoriosPopup && <div className='cadastro__camposPopup'>Por favor, preencha todos os campos.</div>}
            {idadePopup && <div className='cadastro__camposPopup'>Você deve possuir 18 anos ou mais!</div>}
            {emailIgualPopup && <div className='cadastro__camposPopup'>Os emails devem ser iguais!</div>}
            {senhaIgualPopup && <div className='cadastro__camposPopup'>As senhas devem ser iguais!</div>}
            {termosPopup && <div className='cadastro__camposPopup'>Os termos de uso devem ser aceitos!</div>}
        </div >
    )
}

export default Cadastro