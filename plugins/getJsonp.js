const getJsonp = async (url, option, timeout) => {
  var headNode = document.querySelector('body')
  var paddingScript = document.createElement('script')
  paddingScript.src = url
  const json = headNode.appendChild(paddingScript)
  return json
  
}
export default getJsonp