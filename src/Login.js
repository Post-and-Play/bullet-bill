import '../src/Login.css'

import Logo from '../src/image/PAP.png';
import EpicLogo from '../src/icons/epic-games.svg'
import SteamLogo from '../src/icons/steam.svg'
import TwitchLogo from '../src/icons/twitch.svg'
import GoogleLogo from '../src/icons/google.svg'
import FacebookLogo from '../src/icons/facebook.svg'
import GitHubLogo from '../src/icons/github.svg'

const Login = () => {
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
            <div className="destaqueContainer">
                <h1 className='destaque tituloDestaque'>Olá!</h1>
                <h2 className='destaque subDestaque'>Bem-Vindo ao Post and Playing</h2>
                <p className='destaque textoDestaque'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet malesuada velit. Mauris tempus lobortis tincidunt.
                    Mauris et lectus vitae tellus posuere vehicula ac id sem. Aenean ligula arcu, semper in fringilla nec, tempus a nibh. Morbi scelerisque
                    venenatis ligula id ullamcorper. Donec nisi nisi, viverra id vehicula malesuada, ornare eu sem. Phasellus tristique purus in dui sagittis rutrum.
                    In ac dictum odio. Mauris feugiat volutpat nisi, at tempus augue mollis eget. Nam bibendum purus sed justo venenatis tempor. Cras maximus, massa nec
                    blandit varius, nulla purus facilisis enim, vel maximus tellus nibh vel est.
                </p>
            </div>
            <form className='login'>
                <div className="container">
                    <label className='labelContainer'>
                        <p className='textoInput'>Email</p>
                        <input className='inputLogin' placeholder='Digite o seu email' type="email" name="" id="" />
                    </label>
                    <label className='labelContainer'>
                        <p className='textoInput'>Senha</p>
                        <input className='inputLogin' placeholder='Digite a sua senha' type="password" name="" id="" />
                    </label>
                    <div className="row">
                        <div>
                            <input type="checkbox" name="" id="" />
                            <p className='manterConectado'>Mantenha-me conectado</p>
                        </div>
                    </div>
                    <input className='botao btnEntrar btnPrincipal' type="button" value="Entrar" />
                    <div className="esqueciSenha_Container">
                        <a className='esqueciSenha' href="">Esqueci a minha senha</a>
                    </div>
                    <div className="iconesContainer">
                        <img className='icones' src={EpicLogo} alt="" />
                        <img className='icones' src={SteamLogo} alt="" />
                        <img className='icones' src={TwitchLogo} alt="" />
                        <img className='icones' src={GoogleLogo} alt="" />
                        <img className='icones' src={FacebookLogo} alt="" />
                        <img className='icones' src={GitHubLogo} alt="" />
                    </div>
                    <div className="row naoPossuiLogin">
                        <p>Não possui login?</p>
                    </div>
                    <input className='botao btnCadastro btnSecundario' type="button" value="Cadastre-se" />
                </div>
            </form>
        </div>
    )
}

export default Login