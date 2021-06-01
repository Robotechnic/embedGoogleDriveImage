var urlInput = document.getElementById("urlInput")
var baseUrl = document.getElementById("baseUrl")
var dialog = document.getElementById("waitDialog")
var errorDialog = document.getElementById("errorDialog")
var errorText = errorDialog.querySelector(".dialog__content__error")

//add event listener to dialog
document.querySelectorAll(".dialog").forEach((element)=>{
	element.querySelector(".dialog__button")?.addEventListener("click",(event)=>{
		element.style.display = "none"
	})

	element.addEventListener("click", (event)=>{
		if (event.target == element){
			element.style.display = "none"
		}
	})

	window.addEventListener("keydown", (event)=>{
		if (event.key == "Escape" || event.key == "\n"){
			element.style.display = "none"
		}
	})
})



resetUi = () => {
	baseUrl.addEventListener("click", (event)=>{
		var target = event.target
		target.setSelectionRange(0, target.value.length)
	})

	document.querySelectorAll(".copyButton.copied").forEach(element=>{
		element.classList.remove("copied")
	})
}

resetUi()

var embedUrl = document.getElementById("embedUrl")
embedUrl.value = ""
var embedImage = document.getElementById("embedImage")
embedImage.value = ""
var embedImageWithLink = document.getElementById("embedImageWithLink")
embedImageWithLink.value = ""
var embedMarkdown = document.getElementById("embedMarkdown")
embedMarkdown.value = ""

var googleUrlRegex = /^https:\/\/drive\.google\.com\/file\/d\/([A-Za-z0-9_\-]+).*/

createDriveImage = (imageId) => `https://drive.google.com/uc?export=view&id=${imageId}`
createHtmlImage = (imageId) => `<img src="${createDriveImage(imageId)}" alt="Description">`
createHtmlImageWithLink = (imageId) => `<a href="${createDriveImage(imageId)}">${createHtmlImage(imageId)}</a>`
createMarkDownImage = (imageId) => `![Description](${createDriveImage(imageId)})`


//image check
urlInput.addEventListener("submit", (event)=>{
	event.preventDefault()

	resetUi()

	var url = baseUrl.value
	var data = googleUrlRegex.exec(url)
	if (!data){
		console.log("url not ok")
		errorDialog.style.display = "flex"
		errorText.textContent = "Le lien n'est pas un lien de partage google drive."
		return
	}

	dialog.style.display = "flex"

	var img = document.createElement("img")
	img.setAttribute("src", createDriveImage(data[1]))
	console.log(createDriveImage(data[1]))


	//link generation
	img.addEventListener("load", ()=>{
		console.log("Image loaded")
		embedUrl.value = createDriveImage(data[1])
		embedImage.value = createHtmlImage(data[1])
		embedImageWithLink.value = createHtmlImageWithLink(data[1])
		embedMarkdown.value = createMarkDownImage(data[1])
		dialog.style.display = "none"
	})

	//if link doesn't exist
	img.addEventListener("error", ()=>{
		console.log("Image not exist (Not public?)")
		dialog.style.display = "none"
		errorDialog.style.display = "flex"
		errorText.textContent = "Votre lien n'est pas valide ou votre image n'est pas publique."
	})
})


//create copy event

document.querySelectorAll(".result").forEach((element)=>{
	var input = element.querySelector("input")
	var copyButton = element.querySelector(".copyButton")
	element.addEventListener("click",(event)=>{
		if (input.value != ""){
			var target = event.target
			if (event.target == input)
				target.setSelectionRange(0, target.value.length)

			navigator.clipboard.writeText(input.value)
			copyButton.classList.add("copied")
		}
	})

})