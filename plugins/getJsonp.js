const getJsonp = (url, option, timeout) => {
  const headNode = document.querySelector('body')
  const paddingScript = document.createElement('script')
  paddingScript.src = url
  const json = headNode.appendChild(paddingScript)
  return json
}
export default getJsonp
