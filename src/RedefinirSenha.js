import '../src/RedefinirSenha.css'

import Logo from '../src/image/PAP.png';

const RedefinirSenha = () => {
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
            <form action="" className="redefinirSenha">
                <label className='labelContainer'>
                    <p className='textoInput'>Senha</p>
                    <input className='redefinirInput' placeholder='Digite a sua nova senha' type="password" name="" id="" />
                </label>
                <label className='labelContainer'>
                    <p className='textoInput'>Confirmação de senha</p>
                    <input className='redefinirInput' placeholder='Digite a sua nova senha novamente' type="password" name="" id="" />
                </label>

                <div className="btnContainer">
                    <input className='botao btnSecundario btnVoltar' type="button" value="Voltar" />
                    <input className='botao btnPrincipal btnRedefinir' type="button" value="Redefinir" />
                </div>
            </form>
        </div>
    )
}

export default RedefinirSenha