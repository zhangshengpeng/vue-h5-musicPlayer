self.importScripts('./spark-md5.min.js')

self.addEventListener('message', ({ data }) => {
  const spark = new self.SparkMD5.ArrayBuffer()
  const getMd5 = files => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(files.shift().file)
    reader.onload = e => {
      spark.append(e.target.result)
      if (files.length) {
        getMd5(files)
      } else {
        self.postMessage({ hash: spark.end() })
      }
    }
  }
  getMd5(data)
})
