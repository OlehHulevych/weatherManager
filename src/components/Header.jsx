import Clock from "./Clock.js"
import BurgerBar from "./BurgerMenu"
import "bootstrap/dist/css/bootstrap.min.css";


function Header (){
	return(
			<header>
				<div className="logo">
					<img className="logo_img img-responsive" src="https://OlegProgrammerua.github.io/weatherManager/assets/images/header/header_logo.png"/>
					<img className = "logo_text img-responsive"  src="https://OlegProgrammerua.github.io/weatherManager/assets/images/header/logo_text.png"/>
				</div>
				<div className="header_inner">
					<BurgerBar/>
					
					<Clock/>
				</div>
				
				
			</header>
		)
}

export default Header;