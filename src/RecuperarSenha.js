import '../src/RecuperarSenha.css'

import Logo from '../src/image/PAP.png';

const RecuperarSenha = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <a href="#">
                            <img src={Logo} className='logo' />
                        </a>
                    </li>
                </ul>
            </nav>
            <form action="" className="formEmail">
                <p>
                    Digite o seu endereço de email. Será enviado um link que te redirecionará para outra página, onde você irá redefinir sua senha
                </p>

                <label className='labelContainer' htmlFor="">
                    <p>Email</p>
                    <input className='emailInput' placeholder='Digite o seu email' type="email" name="" id="" />
                </label>

                <div className="btnContainer">
                    <input className='botao btnVoltar btnSecundario' type="button" value="Voltar" />
                    <input className='botao btnEnviar btnPrincipal' type="button" value="Enviar" />
                </div>
            </form>
        </div>
    )
}

export default RecuperarSenha