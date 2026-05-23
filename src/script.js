const btemp = document.getElementById("BehaviourSigns");
const ptemp = document.getElementById("PropertiesSigns")
const stemp = document.getElementById("survival-instruction")

let behaviourinputs = ["bs1","bs2","bs3"];
let propertiesinputs = ["ps1","ps2","ps3"];

let behaviouroutputs = ["bds1","bds2","bds3"]
let propertiesoutputs = ["pds1","pds2","pds3"]

for (let i=0;i<behaviourinputs.length;i++) {
    const clone = btemp.content.cloneNode(true);
    document.getElementById(behaviourinputs[i]).appendChild(clone);
}

for (let i=0;i<propertiesinputs.length;i++) {
    const clone = ptemp.content.cloneNode(true);
    document.getElementById(propertiesinputs[i]).appendChild(clone);
}

document.getElementById(behaviourinputs[0]).value = "lethal.png"
document.getElementById(behaviourinputs[1]).value = "violent.png"
document.getElementById(behaviourinputs[2]).value = "easilyprovokable.png"

document.getElementById(propertiesinputs[0]).value = "durable.png"
document.getElementById(propertiesinputs[1]).value = "hyperfast.png"

document.getElementById("objectsafety").value = "euclid.webp"

const colormap = {
    "safe.png": "#4aa800",
    "euclid.webp": "#fc6600",
    "keter.webp": "#ed0000",
    "none": "#ffffffff"
}

const generate = document.getElementById("generate")

function generatePoster() {
    const objectsafety = document.getElementById("objectsafetyimage")
    const objectimage = document.getElementById("objectsafety").value

    const scpnumber = document.getElementById("scpnumber")
    const inputnumber = document.getElementById("scpnumberinput").value
    scpnumber.textContent = inputnumber

    scpnumber.style.color = colormap[objectimage]
    scpnumber.style.textDecorationColor = colormap[objectimage]

    if (objectimage != "none") {
        objectsafety.src = "images/"+objectimage
        objectsafety.style.display = "inline"
        
    } else {
        objectsafety.style.display = "none"
    }
    
    for (let i=0;i<behaviourinputs.length;i++) {
        const image = document.getElementById(behaviourinputs[i]).value
        if (image != "none") {
            document.getElementById(behaviouroutputs[i]).src = "images/"+image
            document.getElementById(behaviouroutputs[i]).style.display = "inline"
        } else {
            document.getElementById(behaviouroutputs[i]).style.display = "none"
        }
    }
    for (let i=0;i<propertiesinputs.length;i++) {
        const image = document.getElementById(propertiesinputs[i]).value
        if (image != "none") {
            document.getElementById(propertiesoutputs[i]).src = "images/"+image
            document.getElementById(propertiesoutputs[i]).style.display = "inline"
        } else {
            document.getElementById(propertiesoutputs[i]).style.display = "none"
        }   
    }
    const survivalinstructions = document.getElementById("survival-instructions")
    const survivalcontainer = document.getElementById("survivalul")
    let survivalarray = survivalinstructions.value
    if (survivalinstructions.value == "") {
        survivalarray = []
    } else {
        survivalarray = survivalarray.split("\n")
    }
    
    
    while (survivalcontainer.firstChild) {
        survivalcontainer.removeChild(survivalcontainer.firstChild)
    }
    for (let i=0;i<survivalarray.length;i++) {
        const clone = stemp.content.cloneNode(true);
        clone.querySelector(".survivalli").textContent = survivalarray[i]
        survivalcontainer.appendChild(clone);
    }

    const customimage = document.getElementById("scpimageupload").files[0]
    const showimage = !document.getElementById("imageavailable").checked
    if (customimage && showimage) {
        document.getElementById("scpimage").src = URL.createObjectURL(customimage)
    } else if (!showimage) {
        document.getElementById("scpimage").src = "images/no-image.png"
    }
    const behaviourtext = document.getElementById("behaviour-text").value
    const propertiestext = document.getElementById("properties-text").value
    const survivaltext = document.getElementById("survival-text").value

    if (behaviourtext != "") {
        document.getElementById("behaviour-text-output").textContent = behaviourtext
    } else {
        document.getElementById("behaviour-text-output").textContent = "BEHAVIOUR"
    }

    if (propertiestext != "") {
        document.getElementById("properties-text-output").textContent = propertiestext
    } else {
        document.getElementById("properties-text-output").textContent = "PROPERTIES"
    }

    if (survivaltext != "") {
        document.getElementById("survival-text-output").textContent = survivaltext
    } else {
        document.getElementById("survival-text-output").textContent = "SURVIVAL"
    }

    htmlToImage
    .toPng(document.getElementById("rootscp"))
    .then((dataUrl) => {
        document.getElementById("download-button").href = dataUrl
    })
    .catch((err) => {
        console.error('oops, something went wrong!', err);
    });
}

async function askWritePermission() {
    try {
      const { state } = await navigator.permissions.query({ name: 'clipboard-write', allowWithoutGesture: false })
      return state === 'granted'
    } catch (error) {
      errorEl.textContent = `Compatibility error (ONLY CHROME > V66): ${error.message}`
      console.log(error)
      return false
    }
}
const setToClipboard = blob => {
    const data = [new ClipboardItem({ [blob.type]: blob })]
    return navigator.clipboard.write(data)
}

const copy = document.getElementById("copy-button")

copy.onclick = async function() {
    console.log(askWritePermission())
    if (askWritePermission) {
        const response = await fetch(document.getElementById("download-button").href)
        const blob = await response.blob()
        await setToClipboard(blob)  
    } else {
        console.log("cant copy")
    }
}
generate.onclick = generatePoster

generatePoster()