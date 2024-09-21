import Cycle from "./Cycle"
import LogoTime from "./LogoTime"

const Header = () => {
  return (
    <header className="flex w-full h-36 justify-between items-center px-36">
        <LogoTime />
        <Cycle />
    </header>
  )
}

export default Header