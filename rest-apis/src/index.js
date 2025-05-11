const express = require('express')
const app = express()

app.use(express.json())

let employeeStore = [];

app.post('/employees', (req, res) => {
    const employee = req.body
    employeeStore.push(employee)
    res.status(201).send(employee)
})

app.get('/employees', (req, res) => {
    res.status(200).send({
        employees: employeeStore
    })
})

app.get('/employees/:id', (req, res) => {
    let filteredEmployees = employeeStore.filter( emp => ""+emp.id === req.params.id)

    if(filteredEmployees.length !== 0) {
        res.status(200).send(filteredEmployees[0])
    } else {
        res.status(404).send()
    }
})

app.patch('/employees/:id', (req, res) => {
    let filteredEmployees = employeeStore.filter( emp => ""+emp.id === req.params.id)

    if(filteredEmployees.length !== 0) {
        let employee = filteredEmployees[0]
        let attributesToUpdate = req.body
        for(key in attributesToUpdate) {
            if(key === "id") {
                res.status(400).send({
                    "error": "id not allowed to be updated"
                })
                return
            }
            if(employee[key]) {
                employee[key] = attributesToUpdate[key]
            }
        }
        employeeStore = employeeStore.filter(emp => emp.id !== req.params.id)
        employeeStore.push(employee)
        res.status(200).send(employee);

    } else {
        res.status(404).send()
    }
})

app.delete('/employees/:id', (req, res) => {
    let filteredEmployees = employeeStore.filter( emp => emp.id === req.params.id)

    if(filteredEmployees.length !== 0) {
        employeeStore = employeeStore.filter(emp => emp.id !== req.params.id)
    } else {
        res.status(404).send()
    }
})

app.listen('3000', () => {
    console.log('Server Started at port 3000!')
})