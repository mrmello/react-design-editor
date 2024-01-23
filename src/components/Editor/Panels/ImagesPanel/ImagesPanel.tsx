import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useCoreHandler } from '@/components/Canvas/handlers'
import { useCanvasContext } from '@/components/Canvas/hooks'

function ImagesPanel() {
  const { addImage } = useCoreHandler()

  const handleAddImage = () => {
    addImage('https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU', 0.1, 0.25)
  }

  return (
    <>
      <div style={{ padding: '1rem 2rem' }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input style={{ background: '#fff' }} type="tel" placeholder="Search images" />
        </InputGroup>
        <button onClick={handleAddImage}>add image</button>
      </div>
    </>
  )
}
export default ImagesPanel
