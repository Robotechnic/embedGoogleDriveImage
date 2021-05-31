var urlInput = document.getElementById("urlInput")

var googleUrlRegex = /^https:\/\/drive\.google\.com\/file\/d\/([A-Za-z0-9_\-]+).*/



urlInput.addEventListener("submit", (event)=>{
	event.preventDefault()
	var url = baseUrl.value
	var data = googleUrlRegex.exec(url)
	if (!data){
		console.log("url not ok")
		return
	}

	fetch(`https://drive.google.com/file/d/${data[1]}`,{mode:'cors'}).then(response=>{
		console.log(response)
	})
})
