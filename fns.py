from browser import document as doc, window as win, html
def gID(elem):
    return doc[elem]
def gHTML(elem):
    return gID(elem)
def gSTYLE(elem, sty):
    return gID(elem).style[sty]
def eEDIT(elem, val):
    gID(elem).text = val
def eST_EDIT(elem, sty, val):
    gID(elem).style[sty] = val
def eCLASS(elem, nam):
    if nam in gID(elem).classList:
        gID(elem).classList.remove(nam)
    else:
        gID(elem).classList.add(nam)
