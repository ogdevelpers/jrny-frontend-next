import Link from 'next/link'
import './navbar.css'

export const Logo = ({logo}: any)=>{
    return (

      
      <div className="logo">
        <Link href={'/'} >
        <img src={`${logo ? logo : '/jrny_logo.png'}`} alt="Logo" />
        </Link>
      </div>
    )
}  