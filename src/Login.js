import Logo from '../src/image/PAP.png';

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
            <h1>Olá!</h1>
            <h2>Bem-Vindo ao Post and Playing</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet malesuada velit. Mauris tempus lobortis tincidunt.
                Mauris et lectus vitae tellus posuere vehicula ac id sem. Aenean ligula arcu, semper in fringilla nec, tempus a nibh. Morbi scelerisque
                venenatis ligula id ullamcorper. Donec nisi nisi, viverra id vehicula malesuada, ornare eu sem. Phasellus tristique purus in dui sagittis rutrum.
                In ac dictum odio. Mauris feugiat volutpat nisi, at tempus augue mollis eget. Nam bibendum purus sed justo venenatis tempor. Cras maximus, massa nec
                blandit varius, nulla purus facilisis enim, vel maximus tellus nibh vel est.
            </p>
            <form className='login'>
                <div className="container">
                    <label>
                        <p>Email</p>
                        <input type="email" name="" id="" />
                    </label>
                    <label htmlFor="">
                        <p>Senha</p>
                        <input type="password" name="" id="" />
                    </label>
                    <div className="row">
                        <label>
                            <input type="checkbox" name="" id="" />
                            <p>Mantenha-me conectado</p>
                        </label>
                    </div>
                    <input type="button" value="Entrar" />
                </div>
            </form>
        </div>
    )
}

export default Login