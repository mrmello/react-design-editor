import { useCanvasContext } from '@/components/Canvas/hooks';
import './Navbar.scss'
import { DownloadIcon, LogoIcon, GithubIcon } from './NavbarIcons'

function Navbar() {
  const { canvas } = useCanvasContext()

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  }

  const download= () => {
    downloadURI(canvas.toDataURL({ format: 'png' }), 'cavanstest.png')
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <LogoIcon />
      </div>
      <div className="navbar-action-items">
        <div onClick={download}>
          <DownloadIcon />
        </div>
        <a href="https://github.com/xorb/react-design-editor">
          <GithubIcon />
        </a>
      </div>
    </div>
  )
}

export default Navbar
