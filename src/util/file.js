/**
 * blob二进制 to base64 {@link https://www.cnblogs.com/dcb3688/p/4608062.html}
 */
export function blobToDataURI(blob) {
  return new Promise((resolve, reject) => {
    try {
      // const blobUrl = URL.createObjectURL(blob)
      var reader = new FileReader()
      reader.onload = e => resolve(e.target.result)
      reader.readAsDataURL(blob)
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * base64  to blob二进制 {@link https://www.cnblogs.com/dcb3688/p/4608062.html}
 */
export function dataURItoBlob(dataURI) {
  var mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0] // mime类型
  var byteString = atob(dataURI.split(',')[1]) //base64 解码
  var arrayBuffer = new ArrayBuffer(byteString.length) //创建缓冲数组
  var intArray = new Uint8Array(arrayBuffer) //创建视图

  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], { type: mimeString })
}
