import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

const post = [   {
        id: Date.now(),  // Unique ID based on current time (you can also use UUID)
        title: "The Impact of Artificial Intelligence on Web Development by Ghazali",
        desc: "Artificial Intelligence (AI) has rapidly transformed many industries, including web development. In this blog post, we’ll explore how AI is being integrated into web development tools, its impact on automating design, and how it helps developers improve website performance. AI technologies like machine learning, natural language processing, and data-driven design are revolutionizing how websites are built, optimized, and maintained.",
        date: new Date().toLocaleDateString()  // Current date
    },
{
    id: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    title: "Welcome to My Minimal Blog",
    desc: `This is a simple blog built with Node.js, Express, and EJS. 
    The goal is to keep things clean and easy to understand while you learn routing, templating, and basic CRUD. 
    You can create posts, edit them, delete them, and view details on a separate page. 
    As you grow the project, you can add a database, authentication, and search. 
    For now, enjoy a lightweight setup that helps you practice the fundamentals.`,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toString().slice(0, 24)
  },
  {
    id: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    title: "How I Built This with Express & EJS",
    desc: `The stack is tiny: Express handles routes, EJS renders views, and a simple array stores posts in memory. 
    Each post has an id, title, description, and a formatted date. 
    The index page lists posts with a short preview, and the detail page shows the full content. 
    Editing and deleting are handled with POST requests. 
    When you are ready, swap the in-memory array for MongoDB or PostgreSQL.`,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toString().slice(0, 24)
  },
  {
    id: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    title: "Styling: Minimal, Clean, and Responsive",
    desc: `The layout uses a centered container and a CSS grid to show cards in two or three columns depending on the screen. 
    Buttons use a small utility class with subtle hover states to stay readable without heavy decoration. 
    Keep typography consistent, spacing generous, and colors neutral. 
    If you add a theme later, keep the styles modular so you can switch palettes easily.`,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toString().slice(0, 24)
  }]

app.get('/', (req, res) => {
    res.render('index.ejs', {post})
})

app.get('/about', (re, res) => {
     res.render('about.ejs')
})

app.get('/form', (req, res) => {
    res.render('create.ejs')
})

app.post('/create', (req, res) => {

    const title = req.body.title
    const desc = req.body.desc
    const postObj = {id: Date.now(), title, desc, date: new Date().toString().slice(0, 24)}
    post.push(postObj)
    res.render('index.ejs', {post})
})

app.get('/postDetail/:id', (req, res) =>{
    
    const postObj = post.find((p) => {
        return p.id === Number(req.params.id)
    })

    if (postObj) {
        res.render('postDetail.ejs', {post: postObj})
    } else {
        res.send('Post not found')
    }
})

app.get('/edit/:id', (req, res) => {
    const postObj = post.find((p) => {
        return p.id === Number(req.params.id)
    })
    if (postObj) {
        res.render('edit.ejs', {post: postObj})
    }else {
        res.send('Post not found!')
    }
})

app.post('/edit/:id', (req, res) => {
    const id = post.findIndex((post) => {
        return post.id === Number(req.params.id)
    })


    if (id !== -1) {
        const {title, desc} = req.body
        post[id].title = title
        post[id].desc = desc
        post[id].updatedAt = new Date().toString().slice(0, 24)

        res.redirect(`/postDetail/${req.params.id}`)
        // res.redirect(`/postDetail/${req.params.id}`)
    }
}) 

app.post('/delete/:id', (req, res) => {
    const index = post.findIndex((post) => {
        return post.id === Number(req.params.id)
    })

    if (index !== -1) {
        post.splice(index, 1)
        res.redirect('/')
    } else {
        res.send('Post not found!');
    }
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})