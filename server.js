const express = require('express')
const app = express()
app.use(express.json())

app.listen(8000,() => {
    console.log('server is up')
})

var contacts = [
    {
        id:"1",
        name:"surbhi"
    }
]

app.get('/contact',(req, res) => {
    res.send({
        success: true,
        message: 'data fetches successfully',
        data: contacts
    })
})

app.post('/contact',(req,res) => {
    var name = req.body.name
    if(name){
        contacts.push({
            id:(contacts.length + 1).toString(),
            name:name
        })
        res.status(201).send({
            success:true,
            message:"data added successfully"
        })
    }else{
        res.send({
            success:false,
            message:"validation error",
            errors:[
                {
                    field:"name",
                    message:"cannot be null"
                }
            ]
        })
    }
})

app.delete('/contact/:id',(req,res) => {
    var id = req.params.id
    var newContacts = contacts.filter(el => el.id != id)
    contacts = newContacts

    res.send({
        success:true,
        message:"data deleted successfully"
    })
})

app.put('/contact/:id',(req,res) => {
    var id = req.params.id
    var name = req.body.name

    if(name){
        var index = contacts.findIndex(el => el.id == id)

        contacts[index] = {
            ...contacts[index],
            name:name
        }
    
        res.send({
            success:true,
            message:"data updated successfully"
        })
    }else{
        res.send({
            success:false,
            message:"validation error",
            errors:[
                {
                    field:"name",
                    message:"cannot be null"
                }
            ]
        })
    }
})