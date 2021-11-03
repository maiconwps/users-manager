
const btnRegisterUser = document.querySelector("button[name=add-user]")
const ulUsers = document.querySelector("ul[name=users]")
const userList = {}

function getInputNameValue(){
    return inputName.value
}

function removeUser(userItem){
    const userName = userItem.getAttribute("data-name")
    delete userList[userName]
    ulUsers.removeChild(userItem)
}

function editUser(userItem){
    const userName = userItem.getAttribute("data-name")
    const userData = userList[userName]
    openModalEdit(userData, userItem)
}

function addUser(user){
    if (userList[user["name"]]){
        throw Error(JSON.stringify({name: "Este nome já existe, por favor cadastrar outro."}))
    }

    userList[user["name"]] = user
    const userItem = createUserItem(user["name"])
    ulUsers.prepend(userItem)
}

function updateUser(userItemOld, userUpdated){
    const oldUserName = userItemOld.getAttribute("data-name")

    if(oldUserName !== userUpdated["name"]){
        if(userList[userUpdated["name"]]){
            throw Error(JSON.stringify({name: "Este nome já existe, por favor cadastrar outro."}))
        }

        delete userList[oldUserName]
        userList[userUpdated["name"]] = userUpdated
        const userItemNew = createUserItem(userUpdated["name"])
        ulUsers.replaceChild(userItemNew, userItemOld)
    }else{
        userList[oldUserName] = userUpdated
    }
   
}

function _createElement(tag, classes, innerText){
    const element = document.createElement(tag)
    element.classList.add(...classes)
    element.innerText = innerText
    return element
}

function _createButton(classes, innerText, onClickHandler){
    const button = _createElement("button", classes, innerText)
    button.onclick = onClickHandler
    return button
}

function createUserItem(userName){
    const li = _createElement("li", ["userItem"], "")
    li.setAttribute("data-name", userName)

    const userInfo = document.createElement("span")

    const buttons = document.createElement("span")
    buttons.classList.add("butttons")

    const spanUserIcon = _createElement("span", ["material-icons-outlined"], "person")
    userInfo.appendChild(spanUserIcon)

    const spanUserName =  _createElement("span", [], userName)
    userInfo.appendChild(spanUserName)

    // const viewButton = _createButton(["btn", "view", "material-icons-outlined"], "visibility", () => removeUser(li))
    // buttons.appendChild(viewButton)

    const editButton = _createButton(["btn", "edit", "material-icons-outlined"], "edit", () => editUser(li))
    buttons.appendChild(editButton)

    const removeButton = _createButton(["btn", "delete", "material-icons-outlined"], "delete", () => removeUser(li))
    buttons.appendChild(removeButton)

    li.appendChild(userInfo)
    li.appendChild(buttons)

    return li
}


function openModalEdit(userData, userItem){
    MODAL.open(
        {
            "success": (newValues) => updateUser(userItem, newValues),
            "fail": () => {
                console.log("Cancelado")
            },
            "title": "Editar usuário",
            "labelButtonSubmit": "Editar",
            "initialValues": userData
        }

    )
}


btnRegisterUser.onclick = (event) =>{
    MODAL.open(
        {
            "success": addUser,
            "fail": () => {
                console.log("Cancelado")
            },
            "title": "Cadastro de usuário",
            "labelButtonSubmit": "Cadastrar",
        }

    )
}
