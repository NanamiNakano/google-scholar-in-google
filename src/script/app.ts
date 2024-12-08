import styles from "./style.module.scss"

function getSearchText() {
  const searchTextarea = document.querySelector(
    "[aria-label=\"Search\"]",
  ) as HTMLTextAreaElement
  if (!searchTextarea) {
    const searchTextarea = document.querySelector(
      "[role=\"textbox\"]",
    ) as HTMLTextAreaElement
    const searchText = searchTextarea.value
    return encodeURI(`https://scholar.google.com/scholar?q=${searchText}`)
  }
  const searchText = searchTextarea.textContent
  return encodeURI(`https://scholar.google.com/scholar?q=${searchText}`)
}

function getTab() {
  const listItems = document.querySelectorAll("[role=\"listitem\"]")
  if (listItems.length < 2) {
    throw new Error("Could not find the second listitem to copy styles from.")
  }
  return listItems[1]
}

try {
  const url = getSearchText()
  const tab = getTab()
  const newTab = document.createElement("div")
  Array.from(tab.attributes).forEach((attribute) => {
    newTab.setAttribute(attribute.name, attribute.value)
  })

  const anchor = tab.querySelector("a")
  const newAnchor = document.createElement("a")
  Array.from(anchor.attributes).forEach((attribute) => {
    newAnchor.setAttribute(attribute.name, attribute.value)
  })
  newAnchor.setAttribute("href", url)

  const newTitle = document.createElement("div")
  newTitle.textContent = "Scholar"
  newTitle.setAttribute("class", styles.tabTitle)

  newAnchor.appendChild(newTitle)
  newTab.appendChild(newAnchor)

  const navigationContainer = document.querySelector("[role=\"list\"]")
  if (navigationContainer) {
    navigationContainer.insertBefore(newTab, tab)
  }
}
catch (e) {
  console.warn(e)
}
