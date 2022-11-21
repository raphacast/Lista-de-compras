
const modal = document.querySelector('.edit-body')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sQtd = document.querySelector('#m-qtd')
const sMarca = document.querySelector('#m-marca')
const sPreco = document.querySelector('#m-preco')
const adicionar = document.querySelector('.add')



let itens //Vai armazenar os itens no banco
let id // vai armazenar  a index exemplo


function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('edit-body') !== -1) {
            modal.classList.remove('active')
        }
    }
    if (edit) {
        sNome.value = itens[index].nome
        sQtd.value = itens[index].qtd
        sMarca.value = itens[index].marca
        sPreco.value = itens[index].preco
        id = index
    } else {
        sNome.value = ''
        sQtd.value = ''
        sMarca.value = ''
        sPreco.value = ''
    }
}


function editItem(index) {
    openModal(true, index)
}


function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
    

}

function insertItem(item, index) {
    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.qtd}</td>
    <td>${item.marca}</td>
    <td class="info-valor">${item.preco}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    `

    let tdsValores = document.querySelectorAll('.info-valor')
    let total = parseFloat(`${item.preco}`)
    for (let i = 0; i < tdsValores.length; i++) {
    let valor = parseFloat(tdsValores[i].textContent)
    total += valor    
    document.getElementById("res").innerHTML = resultado= `R$: ${total.toFixed(2)}`   // ou total += valor
}
    tbody.appendChild(tr)
}


adicionar.onclick = e => {
    if (sNome.value == '' || sQtd.value == '' || sMarca.value == '' || sPreco.value == '') {
        return
    }
    e.preventDefault();
    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].qtd = sQtd.value
        itens[id].marca = sMarca.value
        itens[id].preco = sPreco.value
    } else {
        itens.push({ 'nome': sNome.value, 'qtd': sQtd.value, 'marca': sMarca.value, 'preco': sPreco.value })
    }
    setItensBD()

    loadItens()
    modal.classList.remove('active')
    id = undefined
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    });
}













const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
//armazena os itens no banco de dados 
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
