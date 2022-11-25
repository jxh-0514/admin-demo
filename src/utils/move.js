const move = {
    install(Vue) {
        Vue.directive('move', {
            inserted(el, binding) {
                const { x = 0, y = 0, zIndex = 100 } = binding.value || Object.create(null)
                el.style.position = 'fixed'
                el.style.top = '0'
                el.style.left = '0'
                el.style.zIndex = zIndex
                el.style.transform = `translate(${Number.parseFloat(x)}px, ${Number.parseFloat(y)}px)`
                const matrixReg = /^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/
                const matrix3dReg = /^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/
                const {
                    clientWidth: windowWidth,
                    clientHeight: windowHeight,
                } = document.body
                const { clientWidth: elWidth, clientHeight: elHeight } = el
                const maxX = windowWidth - elWidth
                const maxY = windowHeight - elHeight
                console.log(windowWidth, elWidth, maxX)
                let [distX, distY, handleFlag] = [0, 0, false]
                const handleMouseDown = (e) => {
                    handleFlag = true
                    const matrix = window.getComputedStyle(e.target, null).transform
                    const matrixResult = matrix.match(matrix3dReg) || matrix.match(matrixReg)
                    const [, translateX, translateY] = matrixResult
                    distX = e.clientX - Number.parseFloat(translateX)
                    distY = e.clientY - Number.parseFloat(translateY)
                    el.style.cursor = 'move'
                    window.addEventListener('mousemove', handleMouseMove)
                }
                const handleMouseUp = () => {
                    handleFlag = false
                    el.style.cursor = 'default'
                    window.removeEventListener('mousemove', handleMouseMove)
                }
                const handleMouseMove = (e) => {
                    if (!handleFlag) return false
                    e.stopPropagation()
                    e.preventDefault()
                    const { clientX, clientY } = e
                    if (clientX > windowWidth ||
                        clientY > windowHeight ||
                        clientX < 0 ||
                        clientY < 0) {
                        handleMouseUp()
                        return false
                    }
                    let moveX = clientX - distX
                    let moveY = clientY - distY
                    if (moveX < 0) moveX = 0
                    if (moveY < 0) moveY = 0
                    if (moveX > maxX) moveX = maxX
                    if (moveY > maxY) moveY = maxY
                    el.style.transform = `translate(${moveX}px, ${moveY}px)`
                }
                el.addEventListener('mousedown', handleMouseDown)
                el.addEventListener('mouseup', handleMouseUp)
            }
        })
    }
}

export default move
