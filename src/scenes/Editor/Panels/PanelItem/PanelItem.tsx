import ImagesPanel from './ImagesPanel'
import MusicPanel from './MusicPanel'
import ObjectsPanel from './ObjectsPanel'
import TemplatesPanel from './TemplatesPanel'
import TextPanel from './TextPanel'
import VideosPanel from './VideosPanel'

import classNames from 'classnames'
import './PanelItem.scss'

interface Props {
  panelOpen: boolean
  activeTab: string
}
function PanelItem({ panelOpen, activeTab }: Props) {
  const className = classNames({
    'panel-item-container': true,
    open: panelOpen,
  })
  console.log({ activeTab })
  return (
    <div className={className}>
      <div className="panel-item">
        {activeTab === 'text' && <TextPanel />}
        {activeTab === 'images' && <ImagesPanel />}
        {activeTab === 'musics' && <MusicPanel />}
        {activeTab === 'objects' && <ObjectsPanel />}
        {activeTab === 'templates' && <TemplatesPanel />}
        {activeTab === 'videos' && <VideosPanel />}
      </div>
    </div>
  )
}

export default PanelItem