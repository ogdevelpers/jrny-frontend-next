import Link from 'next/link'
import './navbar.css'

export const Logo = ()=>{
    return (

      
      <div className="logo">
        <Link href={'/'} >
        <img src="/jrny_logo.png" alt="Logo" />
        </Link>
      </div>
    )
}  