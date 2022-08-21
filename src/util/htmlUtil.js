import DOMPurify from "dompurify"

/**
 * 生成预览
 * 提取HTML中的所有Text并拼接
 */
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

        if(node.nodeType == 1 && node.nodeName == 'IMG'){
            //图片元素
            contentText += "[图片] "
        }

        node.childNodes.forEach(childNode => {
            travel(childNode)
        })
    }

    travel(content)
    return contentText
}


//过滤富文本内容
const purifyConfig = {
    //允许的标签
    ALLOWED_TAGS: ['p', 's', 'u', 'em', 'strong', 'code', 'ul', 'li', 'br',
                   'hr', 'p', 'a', 'pre', 'blockquote', 'img',
                   'h1', 'h2', 'h3', 'h4', 'h5'],
    //允许的属性
    ALLOWED_ATTR: ['style', 'data-href', 'alt', 'src', 'href', 'class', 'target']
}
const purifyHtml = (html)=>{
    return DOMPurify.sanitize(html, purifyConfig)
}
// DOMPurify.addHook('uponSanitizeAttribute', function(node, attr) {
//     //检查style, class属性
//     console.log(node, attr)

//     if(attr.attrName == "style"){
//         if(node.tagName == "p" && ){
            
//         }
//     }
// })

export default {
    getTextFromHtml,
    purifyHtml
}