import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo-kpop-2.png";

const NavBar = ({account}) => {
    return(
        <div className="navbar">
            <div className="logo">
                <Link href="/"><Image src={logo} alt="logo" width={100} height={60}/></Link>
            </div>
            <div className="account-info">
                <p>Wellcome {account.username}</p>
                <img className="avatar" src={account.avatar.url} />
            </div>
        
        </div>
    )
}

export default NavBar;