const getTextFromHtml = (html)=>{
    let domparser = new DOMParser()
    let content = domparser.parseFromString(html, "text/html")
    let contentText = ""

    let travel = (node)=>{
    if(node.nodeType == 3){
        //若为TEXT_NODE节点
        contentText += node.nodeValue + " "
        return
    }

    node.childNodes.forEach(childNode => {
        travel(childNode)
    })
    }

    travel(content)
    return contentText
}

export default {
    getTextFromHtml
}