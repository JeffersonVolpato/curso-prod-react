import { Card, CardContent, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import axios from 'axios'
import React from 'react'

function ProductRegister(props) {

    const [nome, setNome] = React.useState("")
    const [valor, setValor] = React.useState("")
    const [categoriaid, setCategoria] = React.useState("")
    const [categoriesOptions, setCategoriesOptions] = React.useState([])

    React.useEffect(() => {
        axios.get("https://cg6wb5rgr2.execute-api.us-east-1.amazonaws.com/listar-categorias").then(
            r => {
                setCategoriesOptions(r.data.response)
            }
        )
    }, [])

    function registerProduct() {
        axios.post("https://cg6wb5rgr2.execute-api.us-east-1.amazonaws.com/cad-produto", {
            "nome": nome,
            "valor": valor,
            "categoriaid": categoriaid
        }).then(r => {
            alert("Produto foi cadastrado!")
        })
    }

    return (
        <Card>
            <CardContent>
                <div style={{ fontSize: '16px' }}>{props.texto}</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '60%', marginTop: '14px' }}>
                        <TextField value={nome} onChange={(e) => { setNome(e.target.value) }} fullWidth id="outlined-basic" label="Nome"
                            variant="outlined" />
                    </div>
                    <div style={{ width: '60%', marginTop: '14px' }}>
                        <TextField input type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]' }}
                            value={valor} onChange={(e) => { setValor(e.target.value) }} fullWidth id="outlined-basic" label="Preço"
                            variant="outlined" />
                    </div>
                    <div style={{ width: '60%', marginTop: '14px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoriaid}
                                label="Categoria"
                                onChange={(e) => { setCategoria(e.target.value) }}
                            >
                                {
                                    categoriesOptions.map(c => (
                                        <MenuItem value={c.id}>{c.nome}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ width: '60%', marginTop: '14px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Unidade</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoriaid}
                                label="Categoria"
                                onChange={(e) => { setCategoria(e.target.value) }}
                            >
                                {
                                    categoriesOptions.map(c => (
                                        <MenuItem value={c.id}>{c.nome}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ width: '60%', display: 'flex', marginTop: '14px', justifyContent: 'right' }}>
                        <Button variant="contained" onClick={() => { registerProduct() }}>Salvar</Button>
                    </div>

                </div>

            </CardContent>
        </Card>

    )
}

export default ProductRegister